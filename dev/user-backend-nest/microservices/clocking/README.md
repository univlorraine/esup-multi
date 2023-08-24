# Backend utilisateur - Module clocking
Ce module est en charge de gérer les différentes opérations de pointage horaire.

## Configuration
- `CLOCKING_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `CLOCKING_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `CLOCKING_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `CLOCKING_SERVICE_UL_API_CLOCKING_URL`: L'URL de l'API permettant d'interagir avec le service externe de pointage.
- `CLOCKING_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API permettant d'interagir avec le service externe de pointage.
- `CLOCKING_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`