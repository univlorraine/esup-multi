# Backend utilisateur - Module cards

Ce module est en charge de remonter les contenus des cartes universitaires et professionnelles de l'utilisateur en provenance de l'API de l'Université.

## Configuration
- `CARDS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `CARDS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `CARDS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `CARDS_SERVICE_PROVIDER_API_URL`: L'URL de l'API permettant d'obtenir les cartes universitaires ou professionelles d'un utilisateur. `{username}` sera remplacé par la valeur de l'identifiant de l'utilisateur.
- `CARDS_SERVICE_PROVIDER_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'obtenir les informations liées aux cartes utilisateur.

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `CARDS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `CARDS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `CARDS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `CARDS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `CARDS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `CARDS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `CARDS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
