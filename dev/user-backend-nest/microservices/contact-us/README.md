# Backend utilisateur - Module contact-us
Ce module permet aux utilisateurs de l'application de contacter un administrateur (par mail).

## Configuration
- `CONTACT_US_SERVICE_HOST`: L'hôte d'écoute du service
- `CONTACT_US_SERVICE_PORT`: Port d'écoute du service
- `CONTACT_US_SERVICE_SMTP`: La chaîne de connexion STMP (ex: `smtps://user@domain.com:pass@smtp.domain.com`)
- `CONTACT_US_SERVICE_DIRECTUS_API_URL`: L'URL de l'API du CMS Directus
- `CONTACT_US_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
