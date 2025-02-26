# Backend utilisateur - Module card-eu

Ce module est en charge de remonter les contenus de la carte d'étudiant européenne de l'utilisateur en provenance de l'API de l'Université.

## Configuration
- `CARD_EU_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `CARD_EU_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `CARD_EU_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `CARD_EU_SERVICE_PROVIDER_API_URL`: L'URL de l'API permettant d'obtenir la carte d'étudiant européenne d'un utilisateur. `{username}` sera remplacé par la valeur de l'identifiant de l'utilisateur.
- `CARD_EU_SERVICE_PROVIDER_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'obtenir les informations liées à la carte de l'utilisateur.

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `CARD_EU_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `CARD_EU_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `CARD_EU_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `CARD_EU_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `CARD_EU_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `CARD_EU_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `CARD_EU_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
