# Backend utilisateur - Module static-pages

Ce module est en charge de remonter les pages statiques en provenance du CMS.

## Configuration
- `STATIC_PAGES_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `STATIC_PAGES_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `STATIC_PAGES_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `STATIC_PAGES_SERVICE_CMS_CONNECTOR_API_URL`: 'URL de l'API du connecteur CMS permettant de récupérer les données provenant du CMS.
- `STATIC_PAGES_SERVICE_CMS_CONNECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API du connecteur CMS.

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
