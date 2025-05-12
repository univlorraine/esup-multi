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

À partir de là, le module peut être importé dans l'application hôte :
```ts
import { HelloPageModule } from '@multi/hello';
```

Il faut également ajouter le module au script npm `module:build-all` :
```json
  "module:build-all": "npm run module:build hello && npm run module:build [nom du module]",
```

#### Lint

Rajouter une section lint au project dans `user-frontend-ionic/angular.json`. À rajouter sous la section "test" du module :
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

Puis rajouter le fichier `.eslintrc.js` suivant à la racine du module :
```javascript
module.exports = {
  extends: "../../.eslintrc.js",
  ignorePatterns: [
    "!**/*"
  ]
}
```

#### Traductions
Pour les traductions, nous utilisons [ngx translate](https://github.com/ngx-translate/core).

Si le module contient des éléments qui doivent être traduits, il faudra créer un fichier de traduction pour ce module dans `src/theme/app-theme/i18n/[mon module]/fr.json`. Pensez à le copier dans le dossier `app-theme-dist` pour partager ces traductions.

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

### Firebase (à compléter avec la partie iOS)

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

Firebase permet de créer plusieurs applications par environnement de développement pour un même projet. Il génère des fichiers configuration `google-service.json` (Android) et `GoogleServices-info.plis` (iOS) pour chacune d’entre elles.

* Créer une nouvelle application dans le projet Firebase et générer son fichier de configuration pour chaque plateforme.

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

- [Module guided-tour](dev/user-frontend-ionic/src/theme/app-theme/guided-tour/README.md)
- [Module shared](dev/user-frontend-ionic/projects/shared/README.md)
- [Module app-update](dev/user-frontend-ionic/projects/app-update/README.md)
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

Ces variables ne sont à utiliser que dans les fichiers suivant pour paramétrer les classes CSS correspondantes :

- **src/theme/icons** : Contient les classes CSS utilisées dans toutes les balises ```<ion-icon>```.

- **src/theme/logos** : Contient les classes CSS utilisées dans toutes les balises ```<img>```.

- **src/theme/fonts** : Contient les classes CSS utilisées dans toutes les balises de texte (h1, p, ion-text, etc.).

Exception : les variables de type "Boxes" définies dans app-theme-variables.scss peuvent être utilisées directement dans les SCSS des modules en raison de la complexité d'un design de boîte (exemple : ```border-width : var(--app-ma-variable-de-bordure);```). Il n'y a donc pas de classe CSS globale pour ce type de variable, mais toute modification de leurs valeurs aura un impact sur l'ensemble de l'application là où elles sont utilisées.

Se référer aux commentaires de chaque fichier pour leurs utilisations.

### Modifier ou ajouter des icônes personnalisées.

Un mécanisme a été mis en place pour permettre l'ajout d'icônes et les utiliser comme des icônes natives Ionic. Par exemple : ```<ion-icon name="[nom-icône]">```, où ```[nom-icône]``` représente simplement le nom du fichier SVG.

Pour modifier les icônes déjà en place dans l'application, il suffit de localiser l'icône en question dans le dossier ```src/theme/app-theme/assets/icons/[dossier_d_icones]```, et de remplacer le SVG par celui de votre choix.
Attention, pensez à supprimer les attributs ```fill``` de votre SVG (dans les balises ```<svg>``` et ```<path>```) afin que les couleurs définies dans l'application puissent s'appliquer à l'icône.

Vous pouvez également ajouter de nouvelles icônes dans l'application.
Pour cela, ajoutez un nouveau dossier d'icônes dans ```src/theme/app-theme/assets/icons/```, et modifiez le fichier angular.json en ajoutant à la propriété ```projects.app.architect.build.assets``` l'objet suivant :

```
  { "glob": "**/*.svg",
    "input": "src/theme/app-theme/assets/[Nom du dossier]",
    "output": "./svg"
  }
```

### Forcer l'affichage FULL

Par défaut, les fonctionnalités affectées au MENU TABS sont affichées avec le layout TABS.

Cependant, il est possible de  forcer si on le souhaite l'affichage d'une ou plusieurs fonctionnalités affectées au MENU TABS avec le layout FULL.

Pour cela, il suffit d'ajouter la ou les routes concernées dans la variable `forceFullLayoutFeatures` présente dans le fichier d'environnement.
L'affichage des routes enfants sera aussi forcé en layout FULL.

Exemple 1 :

* La variable d'environnement contient schedule
```typescript
  forceFullLayoutFeatures: ['schedule']
```
* La fonctionnalité Schedule est affectée au MENU TABS

Alors le layout FULL est utilisé pour les routes /schedule/list, /schedule/calendar#month, /schedule/calendar#week, /schedule/calendar#day

Exemple 2 :

* La variable d'environnement contient schedule/calendar#month
```typescript
  forceFullLayoutFeatures: ['schedule/calendar#month']
```
* La fonctionnalité Schedule est affectée au MENU TABS

Alors le layout FULL est utilisé pour la route /schedule/calendar#month

Et le layout TABS est utilisé pour les routes /schedule/list, /schedule/calendar#week, /schedule/calendar#day

### Personnalisation du thème d'un tenant.

Dans les fichiers src/environments/environment.*.ts, on peut ajouter un thème par défaut dans l'attribut ```defaultTheme```
```
  production: false,
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  firebase: firebasePwaEnvironment,
  guidedTourEnabled: true,
  defaultTheme: 'default',
  tenants: [
  ...
  ]
```
Ce thème est utilisé par défaut si aucun thème n'est défini dans les prefs utilisateurs.

A la sélection d'un tenant, on sauvegarde l'identifiant du tenant comme étant le thème de l'application et on charge ce thème.
Au démarrage de l'application, on charge le thème sauvegardé dans les préférences utilisateurs.
S'il n'y en a pas, on charge le thème defaultTheme. Si ce dernier n'est pas défini, on ne fait rien.

Quand on désélectionne un tenant, on utilise defaultTheme ou rien - si ce dernier n'est pas défini.

Pour appliquer un thème, on ajoute un classe au body du document - à l'instar du thème sombre.

#### Modification du logo par défaut

Le fichier d'environnement, qui contient la description des tenants, a été modifié.

Un paramètre global ```defaultLogo``` a été ajouté. Il s'agit du chemin relatif (par rapport à la racine du projet) du logo à utiliser si on n'a pas de tenant sélectionné ou si le tenant n'a pas son propre logo.

Un tenant peut avoir son propre logo grace à la propriété ```logo```. Il s'agit du chemin relatif (par rapport à la racine du projet) du logo du tenant. Si la propriété n'est pas présente ou si elle est vide (ex: ''), alors le logo par défaut est utilisé.

Exemple:
```
export const environment = {
  production: false,
  ...
  defaultLogo: 'assets/logos/white-logo.svg',
  tenants: [
    {
      id: 'other',
      logo: 'assets/logos/other.svg'
      ...
```

## Fonctionnalité multi établissement (multi tenant)

Dans les fichiers src/environments/environment.*.ts, on peut définir plusieurs établissement à travers l'attribut `tenants` :
```
  tenants: [
    {
      id: 'etablissement1',
      name: 'Etablissement 1',
      logo: 'assets/logos/logo1.svg',
      apiEndpoint: 'http://localhost:3000',
      cmsPublicAssetsEndpoint: 'http://localhost:8055/assets/',
      topic: 'etablissement1',
      modulesConfigurations: {
        chatbot: {
          logoRegex: /_chacha5/i
        },
        map: {
          defaultLocation: {
            longitude: 2.3488596,
            latitude: 48.8533249
          }
        },
        reservation: {
          ssoServiceName: 'https://mon-espace-de-resa.fr',
          ssoUrlTemplate: 'https://mon-espace-de-resa.fr/auth?ticket={st}',
        }
      },
    },
    {
      id: 'etablissement2',
      name: 'Etablissement 2',
      logo: 'assets/logos/logo2.svg',
      apiEndpoint: 'http://localhost:3000',
      cmsPublicAssetsEndpoint: 'http://localhost:8055/assets/',
      topic: 'etablissement2',
      modulesConfigurations: {
        chatbot: {
          logoRegex: /_chacha5/i
        },
        map: {
          defaultLocation: {
            longitude: 2.3488596,
            latitude: 48.8533249
          }
        },
        reservation: {
          ssoServiceName: 'https://mon-espace-de-resa.fr',
          ssoUrlTemplate: 'https://mon-espace-de-resa.fr/auth?ticket={st}',
        }
      },
    }
  ],
```

Ainsi, on peut facilement configurer un `apiEndpoint` ainsi qu'un `cmsPublicAssetsEndpoint` différent pour chacun d'entre eux afin d'utiliser un backend et/ou un cms différent selon l'établissement sélectionné.

D'autres configurations peuvent également varier en fonction de l'établissement :
- `topic` firebase utilisé
- `logo`
- `modulesConfigurations` configurations des différents modules pour lesquelles cela a du sens d'avoir une configuration propre par établissement

### Group de tenants

Il est également possible de regrouper les tenants dans un groupe de tenant, en définissant l'attribut forceSelect à false, l'application chargera la configuration du groupe sans forcer l'utilisateur à sélectionner un tenant.
Il n'est possible de créer qu'un seul groupe de tenant, celui ci devant alors se situer en première et unique position du tableau de tenant situé à la racine de la configuration:
```
  tenants: [
    {
      id: 'etablissement',
      name: 'Groupe',
      isGroup: true,
      forceSelect: false,
      logo: 'assets/logos/logo.svg',
      apiEndpoint: 'http://localhost:3000',
      cmsPublicAssetsEndpoint: 'http://localhost:8055/assets/',
      modulesConfigurations: {
        chatbot: {
          logoRegex: /_chacha5/i
        },
        map: {
          defaultLocation: {
            longitude: 2.3488596,
            latitude: 48.8533249
          }
        },
        reservation: {
          ssoServiceName: 'https://mon-espace-de-resa.fr',
          ssoUrlTemplate: 'https://mon-espace-de-resa.fr/auth?ticket={st}',
        }
      },
      tenants: [
        {
          id: 'etablissement1',
          name: 'Etablissement 1',
          logo: 'assets/logos/logo1.svg',
          apiEndpoint: 'http://localhost:3000',
          cmsPublicAssetsEndpoint: 'http://localhost:8055/assets/',
          topic: 'etablissement1',
          modulesConfigurations: {
            chatbot: {
              logoRegex: /_chacha5/i
            },
            map: {
              defaultLocation: {
                longitude: 2.3488596,
                latitude: 48.8533249
              }
            },
            reservation: {
              ssoServiceName: 'https://mon-espace-de-resa.fr',
              ssoUrlTemplate: 'https://mon-espace-de-resa.fr/auth?ticket={st}',
            }
          },
        },
        {
          id: 'etablissement2',
          name: 'Etablissement 2',
          logo: 'assets/logos/logo2.svg',
          apiEndpoint: 'http://localhost:3000',
          cmsPublicAssetsEndpoint: 'http://localhost:8055/assets/',
          topic: 'etablissement2',
          modulesConfigurations: {
            chatbot: {
              logoRegex: /_chacha5/i
            },
            map: {
              defaultLocation: {
                longitude: 2.3488596,
                latitude: 48.8533249
              }
            },
            reservation: {
              ssoServiceName: 'https://mon-espace-de-resa.fr',
              ssoUrlTemplate: 'https://mon-espace-de-resa.fr/auth?ticket={st}',
            }
          },
        }
      ]
    }
  ],
```

### Translations par tenant

Il est possible de définir des translations par tenant. Pour cela, il suffit de créer un dossier nommé suivant l'id du tenant 
à l'endroit où se trouvent les translations que l'on souhaite changer, et y placer les fichiers de translations contenant ces 
dernières (en.json, fr.json).

Par exemple, pour avoir des translations propres à `etablissement1` pour le module `auth`, on aura les fichiers suivants :
- `src/theme/app-theme/i18n/module/auth/en.json` : translations en par défaut
- `src/theme/app-theme/i18n/module/auth/fr.json` : translations fr par défaut
- `src/theme/app-theme/i18n/module/auth/etablissement1/en.json` : translations en propres à `etablissement1`
- `src/theme/app-theme/i18n/module/auth/etablissement1/fr.json` : translations fr propres à `etablissement1`

Les translations ajoutées de cette manière seront fusionnées avec les translations par défaut, les clés définies dans les nouveaux
fichiers écrasant les mêmes clefs des translations par défaut. 

Ainsi, si on a la translation par défaut fr suivante :

```json
{
  "MENU": "Menu",
  "VERSION" : {
    "VERSION": "Version",
    "VERSION_NOT_FOUND": "Indisponible"
  }
}
```
.. et que l'on veut changer la clé `VERSION_NOT_FOUND` uniquement, on va créer un fichier `etablissement1/fr.json` :

```json
{
  "VERSION" : {
    "VERSION_NOT_FOUND": "Version indisponible"
  }
}
```

La translation finale qui sera chargée ressemblera alors à ça :
```json
{
  "MENU": "Menu",
  "VERSION" : {
    "VERSION": "Version",
    "VERSION_NOT_FOUND": "Version indisponible"
  }
}
```
