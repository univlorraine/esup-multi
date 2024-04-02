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
                nextWeeksInCache: 2,
                managerRoles: ['role_1', 'role_2']
            })
        ]
    })
```

### Configuration du widget "mes prochains cours"
- `nextEventsWidget.numberOfEventsLimit` : nombre maximum des prochains évènements à afficher.
- `nextEventsWidget.numberOfDaysLimit` : limite maximale du nombre de jours suivants le jour courant dans lesquels chercher les prochains évènements.

### Configuration du cache
- `previousWeeksInCache` : Le nombre de semaines précédentes à sauvegarder en cache.
- `nextEventsWidget.numberOfDaysLimit` : Le nombre de semaines suivant à sauvegarder en cache.

### Configuration des gestionnaires d'emploi du temps
- `managerRoles` : Liste des rôles permettant d'identifier l'utilisateur comme étant gestionnaire d'emploi du temps et lui permettant ainsi d'accéder à l'affichage d'un EDT pour une autre personne
