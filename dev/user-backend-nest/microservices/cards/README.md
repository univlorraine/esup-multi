# Backend utilisateur - Module cards

Ce module est en charge de remonter les contenus des cartes universitaires et professionnelles de l'utilisateur en provenance de l'API de l'Université.

## Configuration
- `CARDS_SERVICE_UL_API_URL_USER_CARDS`: L'URL de l'API permettant d'obtenir les cartes universitaires ou professionelles d'un utilisateur. `{username}` sera remplacé par la valeur de l'identifiant de l'utilisateur.
- `CARDS_SERVICE_UL_API_BEARER_TOKEN`: Le token d'accès à l'API de l'Université permettant d'obtenir les informations liées aux cartes utilisateur.