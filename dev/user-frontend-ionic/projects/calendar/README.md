# Calendar
Module permettant d'afficher un calendrier avec les prochains événements sur la page d'accueil.

## Configuration
Exemple dans `environment.ts` :

```typescript
CalendarModule.forRoot({
  numberOfEventsLimit: 3,
  display: 'slider'
})
```

## Widget
- `calendar` : Widget qui affiche les prochains évènements de l'agenda de l'utilisateur.

### Configuration du widget
- `numberOfEventsLimit` : nombre maximum des prochains évènements à afficher.
- `display` : ("list" | "slider") : choix de la vue, en liste ou en ligne
