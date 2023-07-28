# Backend utilisateur - Module static-pages

Ce module est en charge de remonter les pages statiques en provenance du CMS.

## Configuration
- `STATIC_PAGES_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `STATIC_PAGES_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `STATIC_PAGES_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `STATIC_PAGES_SERVICE_DIRECTUS_API_URL`: L'URL de l'API Directus des pages statiques
- `STATIC_PAGES_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus