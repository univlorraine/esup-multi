# Module map

Module permettant l'affichage d'une carte avec points d'intérêts et géolocalisation de l'utilisateur.

## Configuration du module map

### Dans `environment.ts`

- `mapType` : ("mapbox" | "osm") : Le fond de carte qui sera utilisé, par défaut il s'agit d'Open Street Map.
- `accessToken` : En cas d'utilisation de Mapbox il faut un token d'accès, lié à un compte Mapbox.
- `minZoom` : Zoom minimum autorisé.
- `maxZoom` : Zoom maximum autorisé.
- `maxBounds` : Lorsque cette option est définie sur _true_, la carte restreint la vue aux limites géographiques données, faisant rebondir l'utilisateur lorsqu'il essaie de se déplacer en dehors de la vue.
- `highAccuracy` : Indique que l'application souhaite recevoir les meilleurs résultats possibles. Définie sur _true_ et si l'appareil est capable de fournir une position plus précise, il le fera. Notez que cela peut entraîner des temps de réponse plus lents ou une consommation électrique accrue.
- `maxDisplayedFloatingButton` : Nombre maximum de campus affichés à l'écran sous forme de bouton flottant avant de passer sur l'affichage d'une liste

### Dans la configuration multi-tenant (`modulesConfigurations.map`)

- `defaultLocation.latitude` : Latitude de la position par défaut sur la carte.
- `defaultLocation.longitude` : Longitude de la position par défaut sur la carte.

## Personnalisation du clustering des marqueurs

### Paramétrage du cluster
Il est possible de paramétrer le fonctionnement du cluster lors de son initialisation avec les options suivantes :
- `disableClusteringAtZoom` : Désactive le cluster à partir du niveau de zoom défini. Par défaut, il est fixé à 18 ce qui correspond à l'avant dernier niveau de zoom.
- `showCoverageOnHover` : Active la visualisation du polygone montrant la zone du cluster. Par défaut, il est fixé à `false`.
- `zoomToBoundsOnClick` : Permet de centrer et zoomer la vue sur le cluster lorsque l'utilisateur clique dessus. Par défaut, il est fixé à `true`.
- `maxClusterRadius` : Rayon maximal de regroupement des points dans le cluster, en pixel. Par défaut, il est fixé à 80 pixels.
- `removeOutsideVisibleBounds` : Supprime les clusters et marqueurs de la carte lorsqu'ils ne sont pas visibles. Par défaut, il est fixé à `true`.

Beaucoup d'autres options sont disponibles, vous pouvez les retrouver sur cette page : https://github.com/Leaflet/Leaflet.markercluster
