# Module rss

Module permettant l'affichage de flux RSS.

## Configuration
Exemple dans `environment.ts` :

```typescript
RssPageModule.forRoot({
  latestNewsWidget: {
    display: 'horizontally'
  },
  display: 'vertically'
})
```

## Configuration du module rss
Il est possible de gérer le mode d'affichage indépendamment pour le widget et la liste des news.

- `display` : ("horizontally" | "vertically") : choix de la division, horizontale ou verticale, pour la liste des news

## Widgets
- `latest-news` : Widget qui affiche l'actualité la plus récente du flux RSS. 

### Configuration du widget
- `latestNewsWidget.display` : ("horizontally" | "vertically") : choix de la division, horizontale ou verticale, pour le widget
