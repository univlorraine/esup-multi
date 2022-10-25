# Backend utilisateur - Module auth

Ce module est en charge d'interagir avec le CAS serveur et autres services tiers qui fournissent authentification et autorisations.
## Configuration
- `AUTH_SERVICE_PORT`: Port d'écoute du service
- `AUTH_SERVICE_CAS_URL_REQUEST_TGT`: L'URL d'obtention d'un ticket CAS TGT.
- `AUTH_SERVICE_CAS_URL_REQUEST_ST`: L'URL d'obtention d'un ticket CAS ST (ticket de service) contenant `{tgt}` qui sera remplacé par la valeur du ticket CAS TGT.
- `AUTH_SERVICE_CAS_URL_LOGOUT`: L'URL de logout du CAS contenant `{tgt}` qui sera remplacé par la valeur du ticket CAS TGT.
- `AUTH_SERVICE_UL_API_URL_USER_PROFILE`: L'URL de l'API permettant d'obtenir le profil d'un utilisateur. `{username}` sera remplacé par la valeur de l'identifiant de l'utilisateur.
- `AUTH_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API permettant d'obtenir le profil d'un utilisateur.