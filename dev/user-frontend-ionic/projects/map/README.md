# Module map

Module permettant l'affichage d'une carte avec points d'intérêts et géolocalisation de l'utilisateur.

## Configuration du module map
- `defaultMapLocation.longitude` : Longitude de la position par défaut sur la carte.
- `defaultMapLocation.latitude` : Latitude de la position par défaut sur la carte.

## Personnalisation du clustering des marqueurs

### Paramétrage du cluster
Il est possible de paramétrer le fonctionnement du cluster lors de son initialisation avec les options suivantes :
- `disableClusteringAtZoom` : Désactive le cluster à partir du niveau de zoom défini. Par défaut, il est fixé à 18 ce qui correspond à l'avant dernier niveau de zoom.
- `showCoverageOnHover` : Active la visualisation du polygone montrant la zone du cluster. Par défaut, il est fixé à `false`.
- `zoomToBoundsOnClick` : Permet de centrer et zoomer la vue sur le cluster lorsque l'utilisateur clique dessus. Par défaut, il est fixé à `true`.
- `maxClusterRadius` : Rayon maximal de regroupement des points dans le cluster, en pixel. Par défaut, il est fixé à 80 pixels.
- `removeOutsideVisibleBounds` : Supprime les clusters et marqueurs de la carte lorsqu'ils ne sont pas visibles. Par défaut, il est fixé à `true`.

Beaucoup d'autres options sont disponibles, vous pouvez les retrouver sur cette page : https://github.com/Leaflet/Leaflet.markercluster

### Alternative : Cluster par catégorie
Dans la version fournie, un seul cluster est appliqué pour l'ensemble des points indépendamment de leur catégorie.
Il est possible de modifier la logique pour permettre aux clusters de ne contenir que des points d'une même catégorie.
Pour cela, modifiez les éléments suivants dans `map.page.ts` :
1. Remplacez `private clusterGroup: Leaflet.MarkerClusterGroup;` par `private clusterGroupByCategory: Map<string, Leaflet.MarkerClusterGroup> = new Map();`
2. Dans `refreshMapWithSelectedCategories()` ajoutez au début de la fonction les lignes suivantes :
```PHP
this.clusterGroupByCategory.forEach((clusterGroup, category) => {
   this.map.removeLayer(clusterGroup);
   if (categories.length === 0 || categories.includes(category)) {
     this.map.addLayer(clusterGroup);
   }
});
```
3. Dans `initMarkers()` ajoutez à la fin les lignes suivantes :
```PHP
this.clusterGroupByCategory.forEach((clusterGroup, category) => {
   this.map.addLayer(clusterGroup);
 }); 
```
4. Dans `initMarker()` ajoutez dans le `if` après `this.markersByCategory.set(m.category, []);` les lignes suivantes :
```PHP
this.clusterGroupByCategory.set(m.category, Leaflet.markerClusterGroup({
   disableClusteringAtZoom: 18, // Désactive le cluster à partir du zoom 18
   showCoverageOnHover: false,  // Désactive la visualisation du polygone montrant la zone du cluster
   zoomToBoundsOnClick: true,    // Lors du clic, zoom sur le cluster
   maxClusterRadius: 80,         // Rayon maximum du cluster en pixel
   removeOutsideVisibleBounds: true, // Retirer les clusters en dehors de la zone visible sur la carte
}));
```
5. Dans `initMarker()` ajoutez après `const markersInCategory = this.markersByCategory.get(m.category);` les lignes suivantes :
```PHP
const clusterGroup = this.clusterGroupByCategory.get(m.category)!;
```
6. Dans `initMarker()` remplacez `this.clusterGroup.addLayer(marker);` par `clusterGroup.addLayer(marker);`
