# Backend utilisateur - Module important-news

Ce module est en charge de remonter les nouvelles importantes par rôle d'utilisateur en provenance du CMS.

## Configuration
- `IMPORTANT_NEWS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `IMPORTANT_NEWS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `IMPORTANT_NEWS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `IMPORTANT_NEWS_SERVICE_CMS_CONNECTOR_API_URL`: 'URL de l'API du connecteur CMS permettant de récupérer les données provenant du CMS.
- `IMPORTANT_NEWS_SERVICE_CMS_CONNECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API du connecteur CMS.

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `IMPORTANT_NEWS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
