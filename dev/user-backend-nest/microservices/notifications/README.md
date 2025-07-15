# Backend utilisateur - Module notifications

Ce module est en charge de remonter les notifications de l'utilisateur en provenance de l'API de l'université. Il remonte également les channels de notifications et leurs caractéristiques en provenance du CMS.

## Configuration
- `NOTIFICATIONS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `NOTIFICATIONS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `NOTIFICATIONS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `NOTIFICATIONS_SERVICE_PROVIDER_API_URL`: L'URL de l'API des notifications
- `NOTIFICATIONS_SERVICE_PROVIDER_API_BEARER_TOKEN`: Le token d'accès à l'API permettant d'obtenir les notifications et les channels.
- `NOTIFICATIONS_SERVICE_CMS_CONNECTOR_API_URL`: L'URL de l'API du connecteur CMS permettant de récupérer les données provenant du CMS.
- `NOTIFICATIONS_SERVICE_CMS_CONNECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API du connecteur CMS.
- `NOTIFICATIONS_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `NOTIFICATIONS_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `NOTIFICATIONS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `NOTIFICATIONS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `NOTIFICATIONS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `NOTIFICATIONS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `NOTIFICATIONS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `NOTIFICATIONS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `NOTIFICATIONS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
