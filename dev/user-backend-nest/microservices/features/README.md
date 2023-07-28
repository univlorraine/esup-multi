# Backend utilisateur - Module info
Ce module est en charge de remonter les services internes et externes de l'application en provenance du CMS.

## Configuration
- `FEATURES_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `FEATURES_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `FEATURES_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `FEATURES_SERVICE_DIRECTUS_API_URL`: L'URL de l'API du CMS Directus
- `FEATURES_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus
