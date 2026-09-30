#!/usr/bin/env node
/*
 * Script permettant de préparer une release native (Android + iOS).
 *
 * Usage : node scripts/release-mobile.mjs <environment> [versionName] [options]
 *
 * Options :
 *   --dry-run : affiche simplement les numéros de version calculés sans exécuter les scripts
 *
 * Numérotation :
 *   - Android : `versionCode` est une séquence unique et strictement croissante.
 *   - iOS :  `CFBundleVersion` ne doit être croissant qu'à l'intérieur d'un même
 *            `CFBundleShortVersionString`. La séquence repart donc à 1 à chaque
 *             nouvelle version marketing.
 *
 * Nom de version :
 *   Le suffixe de canal (« -test », « -preprod ») rend le build identifiable
 *   dans le menu burger, qui affiche App.getInfo().version. Il n'est appliqué
 *   que sur Android : iOS impose un CFBundleShortVersionString composé d'au plus
 *   trois entiers séparés par des points.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const trapezeConfigPath = join(projectRoot, 'trapeze-config.yml');
const buildGradlePath = join(projectRoot, 'android', 'app', 'build.gradle');
const pbxprojPath = join(projectRoot, 'ios', 'App', 'App.xcodeproj', 'project.pbxproj');

// Fonction d'échec : affiche un message et quitte le script avec code d'erreur.
const fail = (message) => {
  console.error(`\n${message}\n`);
  process.exit(1);
};

// Fonction utilitaire pour afficher une flèche entre deux valeurs, ou juste la valeur si elles sont identiques.
const arrow = (from, to) => (String(from ?? '—') === String(to) ? `${to}` : `${from ?? '—'} → ${to}`);

// Fonction permettant d'exécuter une commande shell et afficher la commande exécutée.
// Si `dryRun` est activé, la commande n'est pas réellement exécutée.
const run = (command, commandArgs) => {
  console.log(`\n> ${command} ${commandArgs.join(' ')}`);
  if (!dryRun) {
    execFileSync(command, commandArgs, { cwd: projectRoot, stdio: 'inherit' });
  }
};


// --- préparation du script -------------------------------------------

// Environnements autorisés
const allowEnvironments = {
  test: { configuration: 'development', suffix: '-test', label: 'TEST INTERNE' },
  preprod: { configuration: 'staging', suffix: '-preprod', label: 'PRÉPRODUCTION' },
  prod: { configuration: 'production', suffix: '', label: 'PRODUCTION' },
};

const usage = `Usage : node scripts/release-mobile.mjs <${Object.keys(allowEnvironments).join('|')}> [versionName] [--dry-run]`;

// Récupération des arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const [environment, requestedVersionName] = args.filter((arg) => !arg.startsWith('--'));

// Vérification de l'environnement
if (!Object.hasOwn(allowEnvironments, environment)) {
  console.error(usage);
  process.exit(1);
}

// Récupération de la configuration associée à l'environnement
const { configuration, suffix, label } = allowEnvironments[environment];

// Vérification du nom de version demandé
if (requestedVersionName && !/^\d+(\.\d+){0,2}$/.test(requestedVersionName)) {
  const errMsg = `versionName invalide : "${requestedVersionName}". iOS impose au plus trois entiers séparés par des points (ex. 2.1.2).`;
  fail(errMsg);
}

// --- fonctions utilitaires -------------------------------------------------

// Fonction permettant de construire un regex de recherche d'une variable dans trapeze-config.yml
const varPattern = (name) =>
  new RegExp(`(^[ \\t]*${name}:[ \\t]*\\n[ \\t]*default:[ \\t]*)"?([^"\\n]*)"?`, 'm');

// Fonction permettant de lire la valeur d'une variable dans trapeze-config.yml
const readVar = (contents, name) => contents.match(varPattern(name))?.[2]?.trim();

// Fonction permettant de mettre à jour la valeur d'une variable dans trapeze-config.yml
const setVar = (contents, name, value) => {
  const pattern = varPattern(name);
  if (!pattern.test(contents)) {
    fail(`La variable ${name} est absente de trapeze-config.yml`);
  }
  return contents.replace(pattern, `$1"${value}"`);
};

// Fonction permettant de calculer le maximum d'une liste de valeurs, en filtrant les valeurs non numériques
const maxNumber = (...values) =>
  Math.max(0, ...values.map((value) => Number(value)).filter((value) => Number.isFinite(value)));

// Fonction permettant de découper un nom de version en parties numériques (ex. 2.1.10 → [2, 1, 10])
const versionParts = (value) => String(value).split('.').map((part) => parseInt(part, 10) || 0);

// Fonction permettant de comparer deux noms de version (ex. 2.1.2 < 2.1.10)
const compareVersionNames = (a, b) => {
  const [pa, pb] = [versionParts(a), versionParts(b)];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

// Fonction permettant de trouver la version maximale dans une liste de noms de version
const maxVersionName = (...values) =>
  values.filter(Boolean).sort(compareVersionNames).pop();

// Fonction permettant de trouver toutes les correspondances d'un Regex
const allMatches = (contents, pattern) => [...contents.matchAll(pattern)].map((match) => match[1]);

// Fonction permettant de retirer le suffixe de canal d'un nom de version
const removeSuffix = (value) => value?.replace(suffixPattern, '');

// --- lecture des versions actuelles -------------------------------------------

// Lecture des fichiers natifs et de la configuration trapeze
const originalTrapezeConfig = readFileSync(trapezeConfigPath, 'utf-8');
const buildGradle = readFileSync(buildGradlePath, 'utf-8');
const pbxproj = readFileSync(pbxprojPath, 'utf-8');

// trapeze-config.yml est versionné, mais il peut être en retard (branche
// ancienne, fichier reparti du modèle) : on se cale aussi sur build.gradle et
// sur project.pbxproj, et on retient toujours le maximum.
const currentProject = {
  trapezeVersionName: readVar(originalTrapezeConfig, 'VERSION_NAME'),
  trapezeVersionCode: readVar(originalTrapezeConfig, 'ANDROID_VERSION_CODE'),
  trapezeIosBuild: readVar(originalTrapezeConfig, 'IOS_BUILD_NUMBER'),
  gradleVersionName: buildGradle.match(/versionName\s+"([^"]+)"/)?.[1],
  gradleVersionCode: buildGradle.match(/versionCode\s+(\d+)/)?.[1],
  iosVersionName: maxVersionName(...allMatches(pbxproj, /MARKETING_VERSION\s*=\s*([^;\s]+)\s*;/g)),
  iosBuildNumber: maxNumber(...allMatches(pbxproj, /CURRENT_PROJECT_VERSION\s*=\s*(\d+)\s*;/g)),
};


// --- calcul des nouvelles versions -----------------------------------------

// Les suffixes d'env n'existent que côté Android : on les retire avant toute comparaison
const channelSuffixes = Object.values(allowEnvironments)
  .map(({ suffix: channelSuffix }) => channelSuffix)
  .filter(Boolean);
const suffixPattern = new RegExp(`(${channelSuffixes.join('|')})$`);

// On récupère le nom de version courante
const versionName =
  requestedVersionName ??
  maxVersionName(
    removeSuffix(currentProject.trapezeVersionName),
    removeSuffix(currentProject.gradleVersionName),
    currentProject.iosVersionName
  );

if (!versionName) {
  fail('Impossible de déterminer la version courante');
}

// Android
const androidVersionName = `${versionName}${suffix}`;
const androidVersionCode = maxNumber(currentProject.trapezeVersionCode, currentProject.gradleVersionCode) + 1;
// iOS
const iosVersionUnchanged =
  currentProject.iosVersionName && compareVersionNames(currentProject.iosVersionName, versionName) === 0;
const iosBuildNumber = iosVersionUnchanged
  ? maxNumber(currentProject.trapezeIosBuild, currentProject.iosBuildNumber) + 1
  : 1;

if (!Number.isFinite(androidVersionCode) || androidVersionCode <= 1) {
  fail('Impossible de déterminer le versionCode Android courant.');
}



// --- exécution des scripts ----------------------------------------------------------

if (dryRun) {
  console.log('\n--dry-run : aucune écriture, aucune commande exécutée.');
}

// exécution de `npx cap sync` pour synchroniser les plugins et les fichiers natifs
run('npx', ['cap', 'sync']);

// mise à jour de trapeze-config.yml avec les nouvelles versions
let updated = originalTrapezeConfig;
updated = setVar(updated, 'VERSION_NAME', versionName);
updated = setVar(updated, 'ANDROID_VERSION_NAME', androidVersionName);
updated = setVar(updated, 'ANDROID_VERSION_CODE', androidVersionCode);
updated = setVar(updated, 'IOS_BUILD_NUMBER', iosBuildNumber);

if (!dryRun) {
  writeFileSync(trapezeConfigPath, updated);
}

// exécution de `npx trapeze run` pour mettre à jour les fichiers natifs (build.gradle, project.pbxproj, Info.plist…)
try {
  run('npx', ['trapeze', 'run', 'trapeze-config.yml', '-y']);
} catch (error) {
  // Sans propagation réussie, on restaure le fichier trapèze-config.yml pour ne pas consommer de numéro de version.
  if (!dryRun) {
    writeFileSync(trapezeConfigPath, originalTrapezeConfig);
  }
  fail(`trapeze a échoué (${error.message}). trapeze-config.yml a été restauré, aucun numéro n'a été consommé.`);
}




// --- récapitulatif --------------------------------------------------------

// Fontion qui récupère l'URL du backend visé par la configuration de build Angular
const resolveBackend = () => {
  try {
    const angularJson = JSON.parse(readFileSync(join(projectRoot, 'angular.json'), 'utf-8'));
    const [project] = Object.values(angularJson.projects);
    const replacement = project.architect.build.configurations[configuration]?.fileReplacements?.[0]?.with;
    if (!replacement) return null;
    const environment = readFileSync(join(projectRoot, replacement), 'utf-8');
    return environment.match(/apiEndpoint:\s*'([^']+)'/)?.[1] ?? null;
  } catch {
    return null;
  }
};

const backend = resolveBackend();

console.log(`
Release ${label}
  version             ${arrow(currentProject.trapezeVersionName, versionName)}
  Android versionName ${arrow(currentProject.gradleVersionName, androidVersionName)}
  Android versionCode ${arrow(currentProject.gradleVersionCode, androidVersionCode)}
  iOS version         ${arrow(currentProject.iosVersionName, versionName)}
  iOS build number    ${arrow(currentProject.iosBuildNumber, iosBuildNumber)}${
  iosVersionUnchanged ? '' : ' (remis à 1 : nouvelle version marketing)'
}
  configuration       ${configuration}
  backend             ${backend ?? '(non déterminé)'}`);



if (!dryRun) {
  // Message de commit suggéré pour le bump de version
  const commitMessage = `chore(release): montée de version du client ${androidVersionName} (android ${androidVersionCode}, ios ${iosBuildNumber})`;

  // Affichage du bilan
    console.log(`
  Étapes suivantes :
    1. Android : Android Studio > Build > Generate Signed App Bundle (le keystore doit être configuré sur la machine)
       iOS : Xcode > Product > Archive
    2. Upload sur : Test interne pour le Play Console / TestFlight pour l'App Store Connect
    3. Commiter le bump. Message suggéré :
         ${commitMessage}
  `);
}
