# Backend utilisateur - Module rss

Ce module est en charge de remonter les contenus de flux rss.

## Configuration
- `RSS_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `RSS_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `RSS_SERVICE_NATS_SERVERS`: Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `RSS_SERVICE_FEED_URL`: L'Url du flux RSS.
- `RSS_SERVICE_ALLOWED_HTML_TAGS`: Tags HTML autorisés dans le contenu d'un article RSS, sans les balises et séparés par des virgules.
Exemple: b,strong,i,italic,ul,ol,li
- `RSS_SERVICE_CACHE_TTL_MS`: Durée de vie du cache en millisecondes (default: 300)
- `RSS_SERVICE_CACHE_MAX`: Max des entrées enregistrées en cache (default: 200)
