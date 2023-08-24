# Backend utilisateur - Module important-news

Ce module est en charge de remonter les nouvelles importantes par rôle d'utilisateur en provenance du CMS.

## Configuration
- `IMPORTANT_NEWS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `IMPORTANT_NEWS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `IMPORTANT_NEWS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `IMPORTANT_NEWS_SERVICE_DIRECTUS_API_URL`: L'URL de l'API du CMS Directus
- `IMPORTANT_NEWS_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus
- `IMPORTANT_NEWS_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
