# Backend utilisateur - Module contact-us
Ce module permet aux utilisateurs de l'application de contacter un administrateur (par mail).

## Configuration
- `CONTACT_US_SERVICE_HOST`: L'hôte d'écoute du service
- `CONTACT_US_SERVICE_PORT`: Port d'écoute du service
- `CONTACT_US_SERVICE_SMTP`: La chaîne de connexion STMP (ex: `smtps://user@domain.com:pass@smtp.domain.com`)
- `CONTACT_US_SERVICE_CMS_CONNECTOR_API_URL`: 'URL de l'API du connecteur CMS permettant de récupérer les données provenant du CMS.
- `CONTACT_US_SERVICE_CMS_CONNECTOR_API_BEARER_TOKEN`: Le token d'accès à l'API du connecteur CMS.
- `CONTACT_US_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `CONTACT_US_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
