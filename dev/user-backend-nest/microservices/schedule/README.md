# Backend utilisateur - Module schedule

Ce module est en charge de remonter les contenus d'emplois du temps en provenance de l'API de l'Université.

## Configuration
- `SCHEDULE_SERVICE_UL_API_USER_SCHEDULE_URL`: L'URL de l'API de l'UL permettant d'obtenir les emplois du temps d'un utilisateur. `{username}` sera remplacé par la valeur de l'identifiant de l'utilisateur.
- `SCHEDULE_SERVICE_UL_API_BEARER_TOKEN`: Bearer token permettant l'accès à l'API de l'Université
- `SCHEDULE_SERVICE_ADMIN_ROLES`: Liste des rôles uilisateur autorisés à afficher l'emploi du temps d'une tierce personne
