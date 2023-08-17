# Backend utilisateur - Module Social-Network

Ce module est en charge de remonter les liens vers différents réseaux sociaux.

## Configuration
- `SOCIAL_NETWORK_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `SOCIAL_NETWORK_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `SOCIAL_NETWORK_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `SOCIAL_NETWORK_SERVICE_DIRECTUS_API_URL`: L'URL de l'API du CMS Directus
- `SOCIAL_NETWORK_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `SOCIAL_NETWORK_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`