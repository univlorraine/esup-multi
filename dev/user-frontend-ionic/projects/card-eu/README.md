# Module card-eu

Module permettant l'affichage de la carte européenne dématérialisée

## Configuration
Exemple dans `environment.ts` :

```typescript 
CardEuPageModule.forRoot({
  knownErrors: ['NO_PHOTO', 'NO_ACTIVE_CARD', 'UNPAID_FEES', 'ESCN_MISSING'],
  display: 'light' | 'extended',
})
```

### Configuration du module
- `display` : 
  - `extended` : carte européenne complète avec photo + ine (nécessite un connecteur pour fournir les informations nécessaires)
  - `light` : affichage avec des données réduites récupérées directement auprès de l'ESC Router.
