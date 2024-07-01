# Backend utilisateur - Module map

Ce module est en charge de remonter des points d'intérêts géolocalisés en provenance d'un fichier geoJSON (`map-data.json`).
## Configuration
- `MAP_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `MAP_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `MAP_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `MAP_SERVICE_PROVIDER_API_URL`: URL du fournisseur.
- `MAP_SERVICE_PROVIDER_API_BEARER_TOKEN`: Token pour contacter le fournisseur.

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `MAP_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `MAP_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `MAP_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `MAP_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `MAP_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `MAP_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `MAP_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
