# Backend utilisateur - Module mail-calendar
Ce module est en charge de remonter les informations liées aux mails et calendrier de l'utilisateur en provenance de l'API de l'Université.

## Configuration
- `MAIL_CALENDAR_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `MAIL_CALENDAR_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `MAIL_CALENDAR_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `MAIL_CALENDAR_SERVICE_UL_API_URL`: L'URL de l'API permettant d'interagir avec le service externe de mail et calendrier.
- `MAIL_CALENDAR_SERVICE_UL_API_BEARER_TOKEN`: La clef d'authentification à l'API de l'Université.
- `MAIL_CALENDAR_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `MAIL_CALENDAR_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)

### Configuration Cache
- `MAIL_CALENDAR_SERVICE_CACHE_REDIS_HOST`: Hostname du serveur Redis pour le partage de cache entre les différentes instances du microservice
- `MAIL_CALENDAR_SERVICE_CACHE_REDIS_PORT`: Port du serveur Redis
- `MAIL_CALENDAR_SERVICE_CACHE_REDIS_PASSWORD`: Mot de passe d'accès à la base Redis
- `MAIL_CALENDAR_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `MAIL_CALENDAR_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `MAIL_CALENDAR_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `MAIL_CALENDAR_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `MAIL_CALENDAR_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `MAIL_CALENDAR_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `MAIL_CALENDAR_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `MAIL_CALENDAR_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `MAIL_CALENDAR_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`
