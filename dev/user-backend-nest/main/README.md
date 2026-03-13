# Configuration
- `API_GATEWAY_SERVER_PORT`: Port d'écoute de l'API Gateway.
- `API_GATEWAY_CORS_ORIGIN`: Autorisations CORS : séparées par des virgules (ex: http://localhost:8000, http://127.0.0.1:8000).

- `FEATURES_SERVICE_NATS_SERVERS`: Adresses complètes des serveurs NATS pour communiquer avec le microservice `features`, séparées par des virgules (ex: nats://localhost:4222).

- `AUTH_SERVICE_NATS_SERVERS`: Adresses complètes des serveurs NATS pour communiquer avec le microservice `auth`, séparées par des virgules (ex: nats://localhost:4222).
- `AUTH_SERVICE_JWT_SECRET`: Le secret du JWT qui protège les URLs de ré-authentification.

- `CARD_SERVICE_NATS_SERVERS`: Adresses complètes des serveurs NATS pour communiquer avec le microservice `card`, séparées par des virgules (ex: nats://localhost:4222).

- `CARD_EU_SERVICE_NATS_SERVERS`: Adresses complètes des serveurs NATS pour communiquer avec le microservice `card-eu`, séparées par des virgules (ex: nats://localhost:4222).

- `MAP_SERVICE_NATS_SERVERS`: Adresses complètes des serveurs NATS pour communiquer avec le microservice `map`, séparées par des virgules (ex: nats://localhost:4222).

- `RSS_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `rss`, séparées par des virgules (ex: nats://localhost:4222).

- `SCHEDULE_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `schedule`, séparées par des virgules (ex: nats://localhost:4222).

- `NOTIFICATIONS_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `notifications`, séparées par des virgules (ex: nats://localhost:4222).

- `SOCIAL_NETWORK_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `social-network`, séparées par des virgules (ex: nats://localhost:4222).

- `CONTACT_US_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `contact-us`, séparées par des virgules (ex: nats://localhost:4222).

- `CONTACTS_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `contacts`, séparées par des virgules (ex: nats://localhost:4222).

- `RESTAURANTS_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `restaurants`, séparées par des virgules (ex: nats://localhost:4222).

- `STATISTICS_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `statistics`, séparées par des virgules (ex: nats://localhost:4222).

- `MAIL_CALENDAR_SERVICE_NATS_SERVERS` : Adresses complètes des serveurs NATS pour communiquer avec le microservice `mail-calendar`, séparées par des virgules (ex: nats://localhost:4222).

# Paramétrer la vérification des mises à jour côté client
Si vous avez activé le module côté client qui permet de vérifier les mises à jour disponibles, il faudra alors renseigner ces informations de mises à jour dans le fichier `src/client-infos.json` 
(copier au préalable le fichier `src/client-infos.json.dist`)

- **storeVersion**: numéro de version du client actuellement sur les stores
- **minVersionRequired**: version minimum du client requise
- **playStoreUrl**: url vers l'application sur le Play Store
- **appStoreUrl**:  url vers l'application sur l'App Store
