# Backend utilisateur - Module clocking
Ce module est en charge de gérer les différentes opérations de pointage horaire.

## Configuration
- `CLOCKING_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `CLOCKING_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `CLOCKING_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `CLOCKING_SERVICE_UL_API_CLOCKING_URL`: L'URL de l'API permettant d'interagir avec le service externe de pointage.
- `CLOCKING_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API permettant d'interagir avec le service externe de pointage.