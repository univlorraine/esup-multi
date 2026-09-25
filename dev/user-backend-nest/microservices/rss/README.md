# Backend utilisateur - Module rss

Ce module est en charge de remonter les contenus de flux rss.

## Configuration
- `RSS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `RSS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `RSS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `RSS_SERVICE_FEED_URL`: L'Url du flux RSS.
- `RSS_SERVICE_ALLOWED_HTML_TAGS`: Tags HTML autorisés dans le contenu d'un article RSS, sans les balises et séparés par des virgules.
Exemple: b,strong,i,italic,ul,ol,li
- `RSS_SERVICE_FEED_TIMEOUT_MS`: Délai maximum d'une requête vers le flux, en millisecondes (default: 15000)
- `RSS_SERVICE_FEED_RETRY_COUNT`: Nombre de nouvelles tentatives après l'échec d'une requête vers le flux, 0 pour aucune (default: 1)
- `RSS_SERVICE_FEED_RETRY_DELAY_MS`: Délai avant une nouvelle tentative, en millisecondes (default: 1000)
- `RSS_SERVICE_FEED_STALE_MAX_AGE_MS`: Âge maximum du dernier flux valide servi lorsque la récupération échoue, en millisecondes, 0 pour désactiver ce repli (default: 86400000, soit 24h)
- `RSS_SERVICE_CACHE_TTL_MS`: Durée de vie du flux en cache en millisecondes, 0 pour désactiver le cache (default: 300)

### Agentkeepalive configuration
Look at [official documentation](https://github.com/node-modules/agentkeepalive#new-agentoptions) for each of the following options :
- `RSS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE`: Option `keepAlive`
- `RSS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS`: Option `keepAliveMsecs`
- `RSS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT`: Option `freeSocketTimeout`
- `RSS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT`: Option `timeout`
- `RSS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS`: Option `maxSockets`
- `RSS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS`: Option `maxFreeSockets`
- `RSS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL`: Option `socketActiveTTL`

