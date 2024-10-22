# Module schedule

Module permettant l'affichage des emplois du temps de l'utilisateur.

## Configuration

Exemple dans `environment.ts` :
```typescript
ScheduleModule.forRoot({
    nextEventsWidget: {
        numberOfEventsLimit: 2,
        numberOfDaysLimit: 7,
        display: 'slider'
    },
    previousWeeksInCache: 1,
    nextWeeksInCache: 2,
    managerRoles: ['role_1', 'role_2']
})
```

### Configuration du cache
- `previousWeeksInCache` : Le nombre de semaines précédentes à sauvegarder en cache.
- `nextEventsWidget.numberOfDaysLimit` : Le nombre de semaines suivant à sauvegarder en cache.

### Configuration des gestionnaires d'emploi du temps
- `managerRoles` : Liste des rôles permettant d'identifier l'utilisateur comme étant gestionnaire d'emploi du temps et lui permettant ainsi d'accéder à l'affichage d'un EDT pour une autre personne

## Widgets
- `next-events` : Widget qui affiche les prochains évènements de l'emploi du temps. 

### Configuration du widget "mes prochains cours"
- `nextEventsWidget.numberOfEventsLimit` : nombre maximum des prochains évènements à afficher.
- `nextEventsWidget.numberOfDaysLimit` : limite maximale du nombre de jours suivants le jour courant dans lesquels chercher les prochains évènements.
- `nextEventsWidget.display` : ("list" | "slider") : choix de la vue, en liste ou en ligne
