# Backend utilisateur - Module auth
Ce module est en charge d'interagir avec le CAS serveur et autres services tiers qui fournissent authentification et autorisations.
## Configuration
- `AUTH_SERVICE_HOST`: L'hôte d'écoute pour le monitoring du service
- `AUTH_SERVICE_PORT`: Port d'écoute pour le monitoring du service
- `AUTH_SERVICE_NATS_SERVERS` : Addresses complètes des serveurs NATS séparées par des virgules (ex: nats://localhost:4222)
- `AUTH_SERVICE_CAS_URL_REQUEST_TGT`: L'URL d'obtention d'un ticket CAS TGT.
- `AUTH_SERVICE_CAS_URL_REQUEST_ST`: L'URL d'obtention d'un ticket CAS ST (ticket de service) contenant `{tgt}` qui sera remplacé par la valeur du ticket CAS TGT.
- `AUTH_SERVICE_CAS_URL_LOGOUT`: L'URL de logout du CAS contenant `{tgt}` qui sera remplacé par la valeur du ticket CAS TGT.
- `AUTH_SERVICE_UL_API_URL_USER_PROFILE`: L'URL de l'API permettant d'obtenir le profil d'un utilisateur. `{username}` sera remplacé par la valeur de l'identifiant de l'utilisateur.
- `AUTH_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API permettant d'obtenir le profil d'un utilisateur.
- `AUTH_SERVICE_USERNAMES_CLEANUP_SCHEDULE`: La notation cron qui définit la tâche planifiée de nettoyage des nom d'utilisateur sauvegardés devenus obsolètes.
- `AUTH_SERVICE_USERNAMES_CLEANUP_NOT_USED_SINCE_IN_DAYS`: Le nombre de jours d'inactivité après lesquels un nom d'utilisateur sauvegardé est considérée comme étant obsolète.
- `AUTH_SERVICE_MONGO_URL`: L'URL de connexion à la base mongo de l'authentification.
- `AUTH_SERVICE_JWT_SECRET`: Le secret du JWT qui protège les URLs de ré-authentification.
- `AUTH_SERVICE_CREDENTIALS_CLEANUP_SCHEDULE`: La notation cron qui définit la tâche planifiée de nettoyage des anciennes authentifications sauvegardées devenues obsolètes.
- `AUTH_SERVICE_CREDENTIALS_CLEANUP_NOT_USED_SINCE_IN_DAYS`: Le nombre de jours d'inactivité après lesquels une authentification sauvegardée est considérée comme étant obsolète.
- `AUTH_SERVICE_DIRECTUS_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API du CMS Directus
- `AUTH_SERVICE_DIRECTUS_API_URL`: L'URL d'accès à l'API Directus