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

Puis mettre à jour le "path" du module dans le fichier `tsconfig.json` pour préfixer par `@multi/`.
```json
    "paths": {
      "@multi/hello": [
        "dist/hello"
      ],
      "@multi/shared": [
        "dist/shared"
      ]
    },
```

A partir de là le module peut être importé dans l'application hôte :
```ts
import { HelloPageModule } from '@multi/hello';
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
│   └── pwa
```

Ajouter au dossier android tous les fichiers de configuration Firebase : `google-service-[environement].json`.

Ajouter au dossier ios tous les fichiers de configuration Firebase : `GoogleServices-info-[environement].plist`.

Ajouter au dossier web tous les fichiers de configuration Firebase : `firebase-environment.[environement].json`.

Ajouter au dossier src/assets/stubs/ un fichier qui reprend la configuration à utiliser : `firebase-environment.json`

Pour que le projet puisse quand même build sans avoir les fichiers réels de la pwa sous la main, une config d'exemple peut être déplacée
depuis les chemins suivants : 

`/env/production/frontend/firebase/firebase-environment.pwa-prod.json.example` et `/env/development/frontend/firebase/firebase-environment.pwa-development.json.example` 

vers `src/environnements/firebase/pwa/` (ne pas oublier d'enlever les .example des fichiers)

Veillez à ne pas commiter le dossier firebase et ses fichiers.

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
    "@multi/shared": "^0.0.1"
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
- [Module calendar](dev/user-frontend-ionic/projects/calendar/README.md)
- [Module cards](dev/user-frontend-ionic/projects/cards/README.md)
- [Module chatbot](dev/user-frontend-ionic/projects/chatbot/README.md)
- [Module clocking](dev/user-frontend-ionic/projects/clocking/README.md)
- [Module contact-us](dev/user-frontend-ionic/projects/contact-us/README.md)
- [Module contacts](dev/user-frontend-ionic/projects/contacts/README.md)
- [Module features](dev/user-frontend-ionic/projects/features/README.md)
- [Module important-news](dev/user-frontend-ionic/projects/important-news/README.md)
- [Module map](dev/user-frontend-ionic/projects/map/README.md)
- [Module menu](dev/user-frontend-ionic/projects/menu/README.md)
- [Module notifications](dev/user-frontend-ionic/projects/notifications/README.md)
- [Module preferences](dev/user-frontend-ionic/projects/preferences/README.md)
- [Module reservation](dev/user-frontend-ionic/projects/reservation/README.md)
- [Module restaurants](dev/user-frontend-ionic/projects/restaurants/README.md)
- [Module rss](dev/user-frontend-ionic/projects/rss/README.md)
- [Module schedule](dev/user-frontend-ionic/projects/schedule/README.md)
- [Module social-network](dev/user-frontend-ionic/projects/social-network/README.md)
- [Module static-pages](dev/user-frontend-ionic/projects/static-pages/README.md)
- [Module unread-mail](dev/user-frontend-ionic/projects/unread-mail/README.md)

## Personnalisation du style de l'application

### Thème de l'application

Le thème de l'application est défini dans les fichiers suivants :

- **src/theme/variable.scss** : Fichier de configuration Ionic des couleurs du thème. On retrouve les variables css gérées par Ionic et toutes les autres variables de couleur présentes dans l'application. Il contient les variables CSS du thème "Light" et "Dark".

- **src/theme/app-theme-variables.scss** : Contient les variables CSS custom pour personnaliser l'application. Modifiez les valeurs des variables dans ce fichier et les changements seront pris en compte automatiquement dans toute l'application.

Ces variables ne sont à utiliser que dans les fichiers suivant pour paramètrer les classes CSS correspondantes : 

- **src/theme/icons** : Contient les classes CSS utilisées dans toutes les balises ```<ion-icon>```.

- **src/theme/logos** : Contient les classes CSS utilisées dans toutes les balises balises ```<img>```.

- **src/theme/fonts** : Contient les classes CSS utilisées dans toutes les balises de texte (h1, p, ion-text, etc.).

Exception : les variables de type "Boxes" définies dans app-theme-variables.scss peuvent être utilisées directement dans les SCSS des modules en raison de la complexité d'un design de boîte (exemple : ```border-width : var(--app-ma-variable-de-bordure);```). Il n'y a donc pas de classe CSS globale pour ce type de variable, mais toute modification de leurs valeurs aura un impact sur l'ensemble de l'application là où elles sont utilisées.

Se référer aux commentaires de chaque fichier pour leurs utilisations.

### Modifier ou ajouter des icônes personnalisés.

Un mécanisme a été mis en place pour permettre l'ajout d'icônes et les utiliser comme des icônes natives Ionic. Par exemple : ```<ion-icon name="[nom-icône]">```, où ```[nom-icône]``` représente simplement le nom du fichier SVG.

Pour modifier les icônes de l'application présentes dans le dossier ```src/assets/icon```, veuillez renommer la nouvelle icône avec le même nom que celle que vous souhaitez remplacer. Supprimez les attributs ```fill``` de votre SVG (dans les balises ```<svg>``` et ```<path>```) afin que les couleurs définies dans l'application puissent s'appliquer à l'icône.

Vous pouvez également ajouter de nouvelles icônes aux dossiers déjà présents dans src/assets/icon.

Pour ajouter un nouveau dossier d'icônes, modifiez angular.json en ajoutant à la propriété ```projects.app.architect.build.assets``` l'objet suivant :

```
  { "glob": "**/*.svg",
    "input": "src/assets/icon/[Nom du dossier]",
    "output": "./svg"
  }
```
