# Module schedule

Module permettant l'affichage des emplois du temps de l'utilisateur.

## Widgets
- `next-events` : Widget qui affiche les prochains évènements de l'emploi du temps. 

## Configuration

Exemple dans `app.module.ts` :
```typescript
    @NgModule({
        declarations: [AppComponent],
        imports: [
            ScheduleModule.forRoot({
                nextEventsWidget: {
                    numberOfEventsLimit: 2,
                    numberOfDaysLimit: 7
                },
                previousWeeksInCache: 1,
                nextWeeksInCache: 2
            })
        ]
    })
```

### Configuration du widget "mes prochains cours"
- `nextEventsWidget.numberOfEventsLimit` : nombre maximum des prochains évènements à afficher.
- `nextEventsWidget.numberOfDaysLimit` : limite maximale du nombre de jours suivants le jour courant dans lesquels chercher les prochains évènements.

### Configuration du cache
- `previousWeeksInCache` : Le nombre de semaines précédente à sauvegarder en cache.
- `nextEventsWidget.numberOfDaysLimit` : Le nombre de semaines suivant à sauvegarder en cache.
