# Backend utilisateur - Module restaurants

Ce module est en charge de la récupération des restaurants dans l'API de l'Université 

## Configuration
- `RESTAURANTS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `RESTAURANTS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `RESTAURANTS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `RESTAURANTS_SERVICE_PROVIDER_API_URL`: L'URL de l'API permettant d'obtenir les restaurants
- `RESTAURANTS_SERVICE_PROVIDER_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'obtenir les informations liées aux restaurant.
- `RESTAURANTS_SERVICE_CACHE_TTL_MS_RESTAURANTS`: Durée de vie du cache en millisecondes pour les restaurants (default: 300)
- `RESTAURANTS_SERVICE_CACHE_TTL_MS_MENUS`: Durée de vie du cache en millisecondes pour les menus (default: 300)
- `RESTAURANTS_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache pour les restaurants et les menus (default: 200)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
