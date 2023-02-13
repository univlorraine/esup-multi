# Backend utilisateur - Module notifications

Ce module est en charge de remonter les notifications de l'utilisateur en provenance de l'API de l'université. Il remonte également les channels de notifications et leurs caractéristiques en provenance du CMS.

## Configuration
- `NOTIFICATIONS_SERVICE_HOST`: L'hôte d'écoute du service
- `NOTIFICATIONS_SERVICE_PORT`: Port d'écoute du service
- `NOTIFICATIONS_SERVICE_UL_API_NOTIFICATIONS_URL`: L'URL de l'API des notifications
- `NOTIFICATIONS_SERVICE_DIRECTUS_API_URL`: L'URL de l'API Directus des channels
- `NOTIFICATIONS_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus
