# Backend utilisateur - Module important-news

Ce module est en charge de remonter les nouvelles importantes par rôle d'utilisateur en provenance du CMS.

## Configuration
- `IMPORTANT_NEWS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `IMPORTANT_NEWS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `IMPORTANT_NEWS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `IMPORTANT_NEWS_SERVICE_DIRECTUS_API_URL`: L'URL de l'API du CMS Directus
- `IMPORTANT_NEWS_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus
