# Backend utilisateur - Module info
Ce module est en charge de remonter les services internes et externes de l'application en provenance du CMS.

## Configuration
- `FEATURES_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `FEATURES_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `FEATURES_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `FEATURES_SERVICE_CMS_CONNECTOR_API_URL`: L'URL de l'API du connecteur CMS permettant de récupérer les données provenant du CMS.
- `FEATURES_SERVICE_CMS_CONNECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API du connecteur CMS.
- `FEATURES_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `FEATURES_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `FEATURES_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `FEATURES_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `FEATURES_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `FEATURES_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `FEATURES_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `FEATURES_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `FEATURES_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
