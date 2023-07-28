# Backend utilisateur - Module statistics

Ce module est en charge de l'envoi des statistiques vers l'API de l'Université 

## Configuration
- `STATISTICS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `STATISTICS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `STATISTICS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `STATISTICS_SERVICE_UL_API_URL`: L'URL de l'API permettant l'envoi des statistiques
- `STATISTICS_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'envoyer les statistiques