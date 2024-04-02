# Backend utilisateur - Module map

Ce module est en charge de remonter des points d'intérêts géolocalisés en provenance d'un fichier geoJSON (`map-data.json`).
## Configuration
- `MAP_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `MAP_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `MAP_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)