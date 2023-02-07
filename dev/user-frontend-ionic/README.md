# User frontend Ionic

## Modularité

L'application est organisée sous la forme d'un monorepo "léger" :

- L'application Ionic hôte est située à la racine et son code source dans `src`.
- Les modules sont situés dans `projects`.
- Les dépendances sont généralement déclarées dans le `package.json` de l'application Ionic à la racine.

### Ajout d'un nouveau module

```bash
npm run module:create [nom du module]
```

Puis mettre à jour le "path" du module dans le fichier `tsconfig.json` pour préfixer par `@ul/`.
```json
    "paths": {
      "@ul/hello": [
        "dist/hello"
      ],
      "@ul/shared": [
        "dist/shared"
      ]
    },
```

A partir de là le module peut être importé dans l'application hôte :
```ts
import { HelloPageModule } from '@ul/hello';
```

Il faut également ajouter le module au script npm `module:build-all` :
```json
  "module:build-all": "npm run module:build hello && npm run module:build [nom du module]",
```

#### Lint

Rajouter une section lint au project dans `user-frontend-ionic/angular.json`. A rajouter sous la section "test" du module :
```json
"lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "projects/[nom du module]/**/*.ts",
              "projects/[nom du module]/**/*.html"
            ]
          }
        }
```

Puis rajouter le fichier `.eslintrc.json` suivant à la racine du module :
```json
{
  "extends": "../../.eslintrc.json",
  "ignorePatterns": [
    "!**/*"
  ]
}

```

#### Traductions
Pour les traductions nous utilisons [ngx translate](https://github.com/ngx-translate/core).

Si le module contient des éléments qui doivent être traduits il faudra créer un fichier de traduction au sein du module : `projects/[mon module]/assets/i18n/fr.json`.

Il faut ensuite modifier la section "build" du fichier `angular.json` afin de rajouter le fichier de traduction du module aux assets :
```json
{
  "glob": "**/*",
  "input": "projects/[mon module]/assets/i18n",
  "output": "/assets/i18n/[mon module]"
}
```

Et enfin à l'initialisation dans le constructeur du module Angular (`projects/[mon-module]/src/lib/[mon-module].module.ts`), il faut faire appel au `ProjectModuleService` de shared afin d'indiquer que mon module contient des traductions :
```typescript
projectModuleService.initProjectModule({
  name: '[mon module]',
  translation: true
});
```
Notez que toutes les clés de traduction du module seront préfixées par ce que vous aurez passé à `addTranslation()` mais converties en majuscules (`addTranslation('info')` --> `'INFO.XXX'`).

**ATTENTION** un module qui contient des traductions doit être initialisé avant que le module de traduction ne démarre, il faudra donc obligatoirement importer le module dans `app.module.ts` (avant l'import du `TranslateModule`).

#### Firebase (à compléter avec la partie iOS)

Ajouter un dossier `firebase` dans `src/environnements` :

```bash
├── firebase
│   ├── android
│   └── ios
```

Ajouter au dossier android tous les fichiers de configuration Firebase : `google-service-[environement].json`.

Ajouter au dossier ios tous les fichiers de configuration Firebase : `GoogleServices-info-[environement].plist`.

Veillez à ne pas commiter ce dossier et ses fichiers.

En exécutant la commande npx `cap sync`, les fichiers de configuration Firebase seront injectés lors du build dans la platforme visée, grâce à la librairie "trapeze".

**Procédure pour ajouter un nouvel environnement de développement avec une configuration Firebase spécifique :**

Firebase permet de créer plusieurs applications par environnement de développement pour un même projet. Il génère des fichier configuration `google-service.json` (Android) et `GoogleServices-info.plis` (iOS) pour chacune d’entre elles.

* Créer une nouvelle application dans le projet Firebase et génèrer son fichier de configuration pour chaque plateforme.

* Suffixer ces fichiers pour l’environnement de développement visé : `google-service-[environnement].json`, `GoogleServices-info-[environnement].plist` .

* Ajouter ces fichiers au dossier Firebase correspondant.

* Ajouter un fichier `config.[environnement].yml` à la racine de l’application :

```yaml
platforms:
  android:
    copy:
      - src: ../src/environments/firebase/android/google-services-[environment].json
        dest: app/google-services.json
  ios: (à compléter)
```
Exécuter la commande npx `cap sync`.

### Dépendances inter-modules

Un module ne doit en aucun cas dépendre d'un autre module.
L'exception est le module `shared` qui héberge le code partagé entre l'application hôte et les différents modules.

Pour qu'un module dépende du module `shared` il faut le déclarer dans les `peerDependencies` du `package.json` au niveau du module.
```json
  "peerDependencies": {
    "@ul/shared": "^0.0.1"
  },
```

### Compilation des modules

Compilation d'un seul module :
```bash
npm run module:build [nom du module]
```

Compilation de tous les modules:
```bash
npm run module:build-all
```

### Liste des modules

- [Module shared](dev/user-frontend-ionic/projects/shared/README.md)
- [Module auth](dev/user-frontend-ionic/projects/auth/README.md)
- [Module info](dev/user-frontend-ionic/projects/info/README.md)
- [Module preferences](dev/user-frontend-ionic/projects/preferences/README.md)
- [Module map](dev/user-frontend-ionic/projects/map/README.md)
