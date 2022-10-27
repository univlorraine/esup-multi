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

### Dépendances inter-modules

Un module ne doit en aucun cas dépendre d'un autre module. 
L'exception est le module `shared` qui héberge le code partagé entre l'application hôte et les différents modules.

Pour qu'un module dépende du module `shared` il faut le déclarer dans les `peerDependencies` du `package.json` au niveau du module.
```json
  "peerDependencies": {
    "shared": "^0.0.1"
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
