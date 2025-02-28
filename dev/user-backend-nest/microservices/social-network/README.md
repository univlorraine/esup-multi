# Backend utilisateur - Module Social-Network

Ce module est en charge de remonter les liens vers différents réseaux sociaux.

## Configuration
- `SOCIAL_NETWORK_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `SOCIAL_NETWORK_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `SOCIAL_NETWORK_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `SOCIAL_NETWORK_SERVICE_CMS_CONNECTOR_API_URL`: 'URL de l'API du connecteur CMS permettant de récupérer les données provenant du CMS.
- `SOCIAL_NETWORK_SERVICE_CMS_CONNECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API du connecteur CMS.
- `SOCIAL_NETWORK_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `SOCIAL_NETWORK_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
