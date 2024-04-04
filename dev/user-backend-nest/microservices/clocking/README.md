# Backend utilisateur - Module clocking
Ce module est en charge de gérer les différentes opérations de pointage horaire.

## Configuration
- `CLOCKING_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `CLOCKING_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `CLOCKING_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `CLOCKING_SERVICE_PROVIDER_API_URL`: L'URL de l'API permettant d'interagir avec le service externe de pointage.
- `CLOCKING_SERVICE_PROVIDER_API_BEARER_TOKEN`: Le token d'accès à l'API permettant d'interagir avec le service externe de pointage.

### Configuration Cache
- `CLOCKING_SERVICE_CACHE_REDIS_HOST`: Hostname du serveur Redis pour le partage de cache entre les différentes instances du microservice
- `CLOCKING_SERVICE_CACHE_REDIS_PORT`: Port du serveur Redis
- `CLOCKING_SERVICE_CACHE_REDIS_PASSWORD`: Mot de passe d'accès à la base Redis
- `CLOCKING_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `CLOCKING_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
