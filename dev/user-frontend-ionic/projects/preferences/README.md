# Module Preferences

Module permettant la gestion des préférences utilisateurs au travers d'un écran dédié.

## Ajout de préférences utilisateur

Chaque module peut pousser ses préférences en définissant un composant qui sera un morceau de la page "préférences", via `ProjectModuleService.initProjectModule` (du module shared). 
`PreferencesComponent` est ici un composant défini localement dans le module.

```typescript
export function provideMyModule(): (Provider | EnvironmentProviders)[] {
  return [
    provideAppInitializer(() => {
      const projectModuleService = inject(ProjectModuleService);
      return projectModuleService.initProjectModule({
        name: 'my-module',
        preferencesComponent: PreferencesComponent,
      });
    }),
  ];
}
```
