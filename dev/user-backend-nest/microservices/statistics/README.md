# Backend utilisateur - Module statistics

Ce module est en charge de l'envoi des statistiques vers l'API de l'Université 

## Configuration
- `STATISTICS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `STATISTICS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `STATISTICS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `STATISTICS_SERVICE_COLLECTOR_API_URL`: L'URL de l'API permettant l'envoi des statistiques
- `STATISTICS_SERVICE_COLLECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'envoyer les statistiques

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `STATISTICS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `STATISTICS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `STATISTICS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `STATISTICS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `STATISTICS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `STATISTICS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `STATISTICS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
