# Multi CMS Connector

API NestJS permettant d'interfacer la backend de MULTI avec le CMS de son choix (Wordpress, Directus, etc.).
Les échanges entre le connecteur et le CMS, et entre le connecteur et le backend de MULTI se font via des requêtes GraphQL.

Pour connaitre les requêtes GraphQL disponibles côté backend se référer à la documentation sur le [wiki](https://www.esup-portail.org/wiki/spaces/ESUPMULTI/pages/1425801229/Connecteur+CMS+Headless)

## Configuration
* `NODE_ENV`: Environnement d'exécution (défaut : development)
* `TOKEN_SECRET`: Clé privée utilisée pour signer les JWT
* `PORT`: Port d'écoute de l'application (défaut : 4000)
* `DEFAULT_CMS`: CMS par défaut à utiliser (directus ou wordpress)

### Directus
* `DIRECTUS_API_URL`: URL de l'API Directus
* `DIRECTUS_API_TOKEN`: Token d'accès à l'API Directus

### Wordpress
* `WORDPRESS_API_URL`: URL de l'API Wordpress
* `WORDPRESS_API_USERNAME`: Nom d'utilisateur de l'API Wordpress
* `WORDPRESS_API_PASSWORD`: Mot de passe de l'API Wordpress

