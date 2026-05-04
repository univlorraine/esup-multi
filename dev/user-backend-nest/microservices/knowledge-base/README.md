# Backend utilisateur - Module knowledge-base

Ce module est en charge de remonter les nouvelles importantes par rôle d'utilisateur en provenance du CMS.

## Configuration
- `KNOWLEDGE_BASE_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `KNOWLEDGE_BASE_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `KNOWLEDGE_BASE_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `KNOWLEDGE_BASE_SERVICE_CMS_CONNECTOR_API_URL`: 'URL de l'API du connecteur CMS permettant de récupérer les données provenant du CMS.
- `KNOWLEDGE_BASE_SERVICE_CMS_CONNECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API du connecteur CMS.

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `KNOWLEDGE_BASE_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `KNOWLEDGE_BASE_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `KNOWLEDGE_BASE_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `KNOWLEDGE_BASE_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `KNOWLEDGE_BASE_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `KNOWLEDGE_BASE_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `KNOWLEDGE_BASE_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
