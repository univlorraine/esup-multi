# Module map

Module permettant l'affichage d'une carte avec points d'intérêts et géolocalisation de l'utilisateur.

## Configuration du module map
- `defaultMapLocation.longitude` : Longitude de la position par défaut sur la carte.
- `defaultMapLocation.latitude` : Latitude de la position par défaut sur la carte.
- `mapType` : ("mapbox" | "osm") : Le fond de carte qui sera utilisé, par défaut il s'agit d'Open Street Map.
- `accessToken` : En cas d'utilisation de Mapbox il faut un token d'accès, lié à un compte Mapbox.
- `minZoom` : Zoom minimum autorisé.
- `maxZoom` : Zoom maximum autorisé.
- `maxBounds` : Lorsque cette option est définie sur _true_, la carte restreint la vue aux limites géographiques données, faisant rebondir l'utilisateur lorsqu'il essaie de se déplacer en dehors de la vue.
- `highAccuracy` : Indique que l'application souhaite recevoir les meilleurs résultats possibles. Définie sur _true_ et si l'appareil est capable de fournir une position plus précise, il le fera. Notez que cela peut entraîner des temps de réponse plus lents ou une consommation électrique accrue.
- `maxDisplayedFloatingButton` : Nombre maximum de campus affichés à l'écran sous forme de bouton flottant avant de passer sur l'affichage d'une liste
