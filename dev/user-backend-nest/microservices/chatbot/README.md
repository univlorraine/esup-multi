# Backend utilisateur - Module chatbot

Ce module est en charge d'intéragir avec l'api du chatbot de l'université.

## Configuration
- `CHATBOT_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `CHATBOT_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `CHATBOT_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `CHATBOT_SERVICE_TOCK_API_URL`: L'URL de l'API du chatbot

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `CHATBOT_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `CHATBOT_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `CHATBOT_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `CHATBOT_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `CHATBOT_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `CHATBOT_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `CHATBOT_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
