# Module Preferences

Module permettant la gestion des préférences utilisateurs au travers d'un écran dédié.

## Ajout de préférences utilisateur

Chaque module peut pousser ses préférences en définissant un composant qui sera un morceau de la page "préférences" en utilisant `PreferencesService` (du module shared). 
`PreferenceComponent` est ici un composant défini localement dans `MyModule`.

```typescript
export class MyModule {
  constructor(private preferencesService: PreferencesService) {
    this.preferencesService.addPreferencesComponent({
      component: PreferencesComponent
    });
  }
}
