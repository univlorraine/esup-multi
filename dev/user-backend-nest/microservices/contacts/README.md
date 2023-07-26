# Backend utilisateur - Module contacts

Ce module est en charge de la recherche de contact dans l'API de l'Université 

## Configuration
- `CONTACTS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `CONTACTS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `CONTACTS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `CONTACTS_SERVICE_UL_API_URL_USER_PROFILE`: L'URL de l'API permettant d'obtenir les utilisateurs
- `CONTACTS_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'obtenir les informations liées à la recherche.