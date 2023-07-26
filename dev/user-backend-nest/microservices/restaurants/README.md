# Backend utilisateur - Module restaurants

Ce module est en charge de la récupération des restaurants dans l'API de l'Université 

## Configuration
- `RESTAURANTS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `RESTAURANTS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `RESTAURANTS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `RESTAURANTS_SERVICE_UL_API_URL`: L'URL de l'API permettant d'obtenir les restaurants
- `RESTAURANTS_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'obtenir les informations liées aux restaurant.