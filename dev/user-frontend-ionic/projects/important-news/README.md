# Module important-news

Module permettant l'affichage d'un widget d'informations importantes.

## Widgets
- `important-news` : Widget qui affiche les informations importantes.

## Configuration
Exemple dans `environment.ts` :

```typescript
ImportantNewsModule.forRoot({ 
  display: 'vertically'
})
```

### Configuration du widget
- `display` : ("horizontally" | "vertically") : choix de la division, horizontale ou verticale
