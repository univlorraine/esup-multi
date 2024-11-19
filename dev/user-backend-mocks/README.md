# Application de "bouchonnage" des données utilisateurs

## Installation

Installer node en version 16+ avec nvm (Node Version Manager) :
- [Installation nvm](https://github.com/nvm-sh/nvm)

### Utiliser la version par défaut du projet
Se placer dans le dossier racine du projet et exécuter :
```bash
nvm use
```

### Installer toutes les dépendances
Se placer dans le dossier [user-backend-mocks](.) et exécuter :
```bash
npm ci
```

## Configuration
Dupliquer le fichier **.env.dist** et le renommer **.env**\
Modifier si besoin les variables d'environnement.

## Exécution
Se placer dans le dossier [user-backend-mocks](.) et exécuter :
```bash
npm start
```

### Comptes utilisateurs
Trois comptes utilisateurs sont disponibles pour les tests :
- `etu` : étudiant
- `staff` : personnel
- `prof` : enseignant

Les mots de passe sont identiques aux identifiants.

## Modifications de l'application multi
Il est nécessaire de modifier les fichiers d'environnement de l'application multi-tenant pour associer les microservices
aux web-services de bouchonnage du projet
```
Il est convenu que le projet est exécuté en local (localhost), sur le port 3099.
```

Pour la suite, se placer dans le dossier [user-backend-nest](../user-backend-nest).

### Microservice auth
Remplacer les variables dans le fichier `microservices/auth/.env` par les suivantes :
```
AUTH_SERVICE_CAS_URL_REQUEST_TGT=http://localhost:3099/mocking/auth
AUTH_SERVICE_CAS_URL_LOGOUT=http://localhost:3099/mocking/auth

AUTH_SERVICE_UL_API_URL_USER_PROFILE=http://localhost:3099/mocking/auth/multi-user-provider/{username}
```
Relancer le service `auth` pour prendre en compte les nouvelles variables.

### Microservice cards
Remplacer les variables dans le fichier `microservices/cards/.env` par les suivantes :
```
CARDS_SERVICE_UL_API_URL=http://localhost:3099/mocking/cards/{username}
```
Relancer le service `cards` pour prendre en compte les nouvelles variables.

### Microservice chatbot
Remplacer les variables dans le fichier `microservices/chatbot/.env` par les suivantes :
```
CHATBOT_SERVICE_UL_API_TOCK_URL=http://localhost:3099/mocking/chatbot
```
Relancer le service `chatbot` pour prendre en compte les nouvelles variables.

### Microservice clocking
Remplacer les variables dans le fichier `microservices/clocking/.env` par les suivantes :
```
CLOCKING_SERVICE_UL_API_URL=http://localhost:3099/mocking/clocking
```

### Microservice contacts
Remplacer les variables dans le fichier `microservices/contacts/.env` par les suivantes :
```
CONTACTS_SERVICE_UL_API_URL_USER_PROFILE=http://localhost:3099/mocking/contacts/multi-user-directory
```
Relancer le service `contacts` pour prendre en compte les nouvelles variables.

### Microservice mail-calendar
Remplacer les variables dans le fichier `microservices/mail-calendar/.env` par les suivantes :
```
MAIL_CALENDAR_SERVICE_UL_API_URL=http://localhost:3099/mocking/mail-calendar
```
Relancer le service `mail-calendar` pour prendre en compte les nouvelles variables.

### Microservice map

Remplacer les variables dans le fichier `microservices/map/.env` par les suivantes :

```
MAP_SERVICE_PROVIDER_API_URL=http://localhost:3099/mocking/map
```

### Microservice notifications
Remplacer les variables dans le fichier `microservices/notifications/.env` par les suivantes :
```
NOTIFICATIONS_SERVICE_UL_API_NOTIFICATIONS_URL=http://localhost:3099/mocking/notifications/multi-notification-manager
```
Relancer le service `notifications` pour prendre en compte les nouvelles variables.

### Microservice restaurants
Remplacer les variables dans le fichier `microservices/restaurants/.env` par les suivantes :
```
RESTAURANTS_SERVICE_UL_API_URL=http://localhost:3099/mocking/restaurants
```
Relancer le service `restaurants` pour prendre en compte les nouvelles variables.

### Microservice rss
Remplacer les variables dans le fichier `microservices/rss/.env` par les suivantes :
```
RSS_SERVICE_FEED_URL=http://localhost:3099/mocking/rss
```

### Microservice schedule
Remplacer les variables dans le fichier `microservices/schedule/.env` par les suivantes :
```
SCHEDULE_SERVICE_UL_API_USER_SCHEDULE_URL=http://localhost:3099/mocking/schedule/{username}?startDate={startDate}&endDate={endDate}
```
Relancer le service `schedule` pour prendre en compte les nouvelles variables.

### Microservice statistics
Remplacer les variables dans le fichier `microservices/statistics/.env` par les suivantes :
```
STATISTICS_SERVICE_UL_API_URL=http://localhost:3099/mocking/statistics
```

## Les données bouchonnées

- [auth](src/auth/auth.mock.js)
- [chatbot](src/chatbot/chatbot.mock.js)
- [contacts](src/contacts/contacts.mock.js)
- [mail-calendar](src/mail-calendar/mail-calendar.mock.js)
- [notifications](src/notifications/notifications.mock.js)
- [schedule](src/schedule/schedule.mock.js)
- [restaurants](src/restaurants/restaurants.mock.js)
- [cards](src/cards/cards.mock.js)
- [rss](src/rss/rss.mock.js)
- [clocking](src/clocking/clocking.mock.js)
