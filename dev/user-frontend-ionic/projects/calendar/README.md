# Calendar
Module permettant d'afficher un calendrier avec les prochains événements sur la page d'accueil.

## Widget
- `calendar` : Widget qui affiche les prochains évènements de l'agenda de l'utilisateur.

## Configuration
Exemple dans `app.module.ts` :

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    CalendarModule.forRoot({
      numberOfEventsLimit: 3,
      display: 'slider'
    })
  ]
})
```

### Configuration du widget
- `numberOfEventsLimit` : nombre maximum des prochains évènements à afficher.
- `display` : ("list" | "slider") : choix de la vue, en liste ou en ligne
