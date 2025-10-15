# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.x.x (Unreleased)

### Client
#### Bug fixes
* Correction du mode *Edge to Edge* pour Android
* **(app-update)**: Le client n'était plus capable de récupérer la version min requise suite au passage au multi-tenants
* **(chatbot)** : Balises non affichées dans les messages du chatbot
* **(features)** : Normalisation du contenu pour la recherche dans les services
* **(login)** : Afficher/masquer le mot de passe, utilisation du composant Ionic prévu à cet effet
* **(map)** : Prise en compte de l'état d'activation du service de localisation du système
* **(schedule)** : Suppression des espaces dans le champ *asUser* des gestionnaires

#### Autres
* Mises à jour des dépendances suite aux alertes CVE

### Backend
#### Bug fixes
* **(contact-us)** : Prévention partielle des usurpations d'adresse email, et avertissement si l'utilisateur n'est pas connecté

#### New features
* **(auth)** : Suppression du cache dans le microservice, déportation vers le connecteur CMS
* **(contact-us)** : Suppression du cache dans le microservice, déportation vers le connecteur CMS
* **(features)** : Suppression du cache dans le microservice, déportation vers le connecteur CMS
* **(important-news)** : Suppression du cache dans le microservice, déportation vers le connecteur CMS
* **(notifications)** : Suppression du cache dans le microservice, déportation vers le connecteur CMS
* **(social-networks)** : Suppression du cache dans le microservice, déportation vers le connecteur CMS
* **(static-pages)** : Suppression du cache dans le microservice, déportation vers le connecteur CMS

#### Autres
* Mises à jour des dépendances suite aux alertes CVE

### Connecteurs
#### New features
* **(multi-cms-connector)** : Ajout de cache pour palier aux problèmes de performance côté CMS
* **(multi-cms-connector)** : Ajout de routes permettant de vider le cache via des webhooks côté CMS

#### Autres
* Mises à jour des dépendances suite aux alertes CVE

## 2.0.0 (2025-07-16)

### Client
#### Bug fixes
* **(features)** : Amélioration du comportement du champ de recherche dans les services
* **(notifications)** : Le tap sur une notification système redirige désormais sur la page des notifications dans l'application
* **(restaurants)** : Correction des dates tronquées à cause d'un scroll vertical inutile
* **(schedule)** : Correction du bouton 'Voir Plus' de la vue liste de l'emploi du temps qui ne s'affichait pas lorsque l'étudiant n'a pas de cours pendant plus de 15 jours

#### New features
* **(login)** : Ajout d'un bouton permettant de voir le mot de passe saisi
* **(multi-tenant)** : On peut désormais avoir plusieurs établissements (tenants) dans la même application, chacun pouvant définir son logo, ses traductions et son backend
* **(restaurants)** : Favoris multiples
* **(schedule)** : Affichage du nom du planning sur l'évènement
* **(shared)** : Navigation, possibilité de forcer l'affichage pleine page (*full*) pour les fonctionnalités positionnées dans le menu *tabs*.

#### Styles
* Suppression du libellé du bouton Retour pour gagner en espace dans la barre de menu supérieure

#### Autres
* Migration de [NodeJS](https://nodejs.org/docs/latest-v20.x/api/index.html) : Version 18 → Version 20
* Mise à jour du moteur [Capacitor](https://capacitorjs.com/docs) : Version 6 → Version 7

### Connecteurs
* Ajout du connecteur **multi-cms-connector** permettant de faire l'intermédiaire entre le client et un CMS au choix (Directus et WordPress pour l'instant).
Pour plus d'information sur l'installation et la configuration du connecteur CMS : https://www.esup-portail.org/wiki/x/DQD8V

### !! BREAKING CHANGES !!
La mise en place du connecteur CMS a nécessité la refactorisation des requêtes des microservices vers le CMS. Le passage à cette release 2.0 implique donc la mise en place du connecteur CMS pour que l'application continue de fonctionner correctement.

Les microservices impactés sont :
* auth
* contact-us
* features
* important-news
* notifications
* social-network
* static-pages
* widgets

Côté client, certains DTO ont également été revus pour plus de cohérence avec les données renvoyées par le connecteur CMS. Il est donc nécessaire de mettre à jour le client pour que l'application continue de fonctionner correctement.

Les modules concernés sont :
* auth
* contact-us
* features
* important-news
* notifications
* static-pages

## 1.2.0 (2024-12-11)

### Client
#### Bug fixes
* **(guided-tour)** : correction problème de chargement des traductions du tour guidé sur certains périphériques
* **(rss)** : correction problème de décalage du bouton 'Lire plus' sur iOS
* **(statistics)** : suppression de l'utilisation du DeviceId pour le suivi des statistiques d'usage comme préconisé dans le RGPD. Utilisation d'une UID générée automatiquement par le client à la place.
* **(widgets)** : les widgets tiennent désormais compte de l'Ionicon ou bien des icônes SVG renseignées du côté du CMS et les affichent à côté du titre de la Widget
* **(widgets)** : correction du problème de chargement du contenu sur les widgets au premier démarrage de l'application ou après authentification

#### New features
* **(app-update)** : Nouveau module permettant de vérifier si une mise à jour du client est disponible sur les stores et force éventuellement l'utilisateur à mettre à jour si des évolutions majeures empêchent le fonctionnement des anciennes versions
* **(calendar)** : Il est désormais possible de choisir entre 2 affichages pour la widget des évènements du calendrier :
  * Liste verticale (list)
  * Slider horizontal (slider)
* **(schedule)** : Il est désormais possible de choisir entre 2 affichages pour la widget des prochains cours à venir :
  * Liste verticale (list)
  * Slider horizontal (slider)
* **(shared)** : Création d'un nouveau service **Alert** partagé, permettant de gérer l'affichage des messages d'alerte par le biais d'une file d'attente et par ordre de priorité

### Backend
#### Bug fixes
* **(auth)** : l'authentification transmet désormais l'IP du client au serveur CAS pour éviter le bannissement du microservice auth sur de trop nombreuses tentatives d'authentification en échec
* **(maps)** : suppression du tracking du fichier map-data.json et ajout d'un fichier .dist avec des POI factices
* **(statistics)** : prise en compte de la nouvelle uid de tracking à la place du Device Id pour la génération des statistiques d'usage

#### New Features
* **(main)** : une nouvelle route `/app-update-infos` a été ajoutée permettant de retourner les informations nécessaires au client pour le module de mise à jour `app-update`

### Autres
* Mise à jour du framework [Ionic](https://ionic.io/docs) : Version 7 → Version 8
* Ajout d'une variable d'environnement pour les mocks pour indiquer l'url vers les assets statiques

## 1.1.0 (2024-09-13)

### Client

#### Bug fixes
* Ajout de la favicon manquantes
* Ajout des textes de remplacement (placeholder) manquants sur certains champs de l'application :
  * Recherche dans les services
  * Dialogue avec le Chatbot
  * Champs du formulaire de contact
* Correctifs liés à Firebase Messaging :
  * Mise à jour de la librairie Firebase Messaging
  * Le client vérifie désormais la validité du token au réveil de l'application
* Ajout du texte de traduction manquant pour le bouton de retour arrière sur iOS
* Correction des alertes de sécurité CVE :
    * https://nvd.nist.gov/vuln/detail/CVE-2024-39338 - paquet concerné : axios@1.6.7
    * https://nvd.nist.gov/vuln/detail/CVE-2022-29622 - paquet concerné : express@4.16.1
    * https://nvd.nist.gov/vuln/detail/CVE-2022-37620 - paquet concerné : @nestjs-modules/mailer@1.10.3
    * https://nvd.nist.gov/vuln/detail/CVE-2024-36361 - paquet concerné : @nestjs-modules/mailer@1.10.3
    * https://nvd.nist.gov/vuln/detail/CVE-2024-37890 - paquet concerné : protractor@7.0.0
* Correction de bugs mineurs
* **(cards)** :
  * Réduction de la taille du QRCode
  * Sur tablette et desktop, cliquer à côté de la modal affichant la carte sélectionnée ferme désormais cette modal
  * Correction de l'affichage d'un message d'erreur sous la carte sur les périphériques Android
* **(important-news)** : Correction du problème de la widget s'affichant vide si pas d'informations importantes en cours
* **(notifications)** : Correction de la couleur du texte du bouton "Supprimer" lors du swipe sur une notification le rendant invisible en mode sombre
* **(statistics)** : Simplification du type de la plateforme utilisée par l'utilisateur lors d'envoi des statistiques (désormais 3 types : android, ios, web)

#### New features
* Création d'un thème neutre Esup et retrait des marques d'appartenance à l'Université de Lorraine
* Centralisation et amélioration du paramétrage des modules des fonctionnalités à activer dans le client au sein d'un seul et même fichier : **environment.ts**
* Déplacement des fichiers de styles CSS des modules des fonctionnalités dans des répertoires dédiés theme/app-theme/styles/* pour permettre une personnalisation simplifiée
* Ajout d'une variable pour le titre de l'application dans le fichier environment.ts
* Ajout d'une variable appVersion dans le fichier environment.ts permettant désormais de séparer la version de l'application publiée du numéro de version du projet Multi-Esup
* Ajout de la possibilité de personnaliser le tour guidé s'affichant au premier démarrage de l'application
* **(important-news)** : Il est désormais possible de choisir entre 2 affichages pour la widget des informations importantes :
  * Image à gauche et bloc de texte à droite
  * Image en haut et bloc de texte en dessous
* **(restaurants)** : Ajout d'une image par défaut pour les restaurants universitaires n'en disposant pas
* **(rss)** : Il est désormais possible de choisir entre 2 affichages pour l'affichage des actualités (widget + page des actualités)
  * Image à gauche et bloc de texte à droite
  * Image en haut et bloc de texte en dessous
* **(schedule)** : Il est désormais possible d'accéder directement à l'emploi du temps en web via une url (https://mon-url-vers-ma-pwa.edu/schedule/calendar)
* **(menu)** : Amélioration de l'ergonomie du menu utilisateur sur les périphériques avec une petite résolution

#### Autres
* Mise à jour de la librairie [ionicons](https://ionic.io/ionicons) afin de disposer de la nouvelle icône X en remplacement de l'ancienne icône Twitter
* Migration de [NodeJS](https://nodejs.org/docs/latest-v18.x/api/index.html) : Version 16 → Version 18
* Mise à jour du framework [Angular](https://v16.angular.io/docs) : Version 14 → Version 16
* Mise à jour du moteur [Capacitor](https://capacitorjs.com/docs) : Version 5 → Version 6
* **(reservation)** : Remplacement du plugin Capacitor de lecture de code-barres @capacitor-community/barcode-scanner déprécié par le plugin @capacitor-mlkit/barcode-scanning

### Backend

#### Bug fixes
* **(map)**: Correction du fichier .env non pris en compte par le microservice

#### New features
* Création d'un serveur de mocks embarqué pour le déploiement rapide en local

#### Autres
* Migration des microservices vers Node v18
* Suppression de l'appartenance à l'Université de Lorraine dans les noms des variables

### Documentation
* Ajout de fichiers d'exemple de configuration pour un déploiement via Gitlab-CI
* Ajout des fichiers de configuration run/debug pour les suites d'IDE Jetbrains

## 1.0.3 (2024-02-07)
### Client
#### Bug fixes
* Ajout d'éléments d'accessibilité manquants sur certaines icônes
* Correction langue choisie non prise en compte pour la langue pour l'accessibilité
* Amélioration des performances
* **(notifications)** : Correction de la pastille de l'icône des notifications qui ne se rafraîchissait pas au réveil de l'application
### Backend
#### Autre
* Mise à jour de dépendances suite aux alertes CVE

## 1.0.2 (2024-01-23)
### Client
#### Bug Fixes
* Correction de l'apparition de la popup d'erreur en boucle lors de la navigation 'hors ligne'
* Ajout de l'accessibilité manquante sur certaines images et boutons
* **(notifications)** : Correction des problèmes de réception des notifications sur certains appareils

## 1.0.1 (2023-12-20)
### Client
#### Bug Fixes
* Correction de certains problèmes d'accessibilité sur les images
* Correction du problème d'affichage des boutons radio sur iOs
* Correction de la couleur de certains liens en mode sombre rendant invisibles ces liens
* **(clocking)** : Optimisation de l'affichage du widget pour les tops
* **(contacts)** : Optimisation de l'affichage du résultat d'une recherche
* **(menu)** : Correction de la marge de certains items trop large sur iOS
* **(notifications)** : Correction des problèmes sur les filtres des notifications
* **(schedule)** : Correction du problème des emplois du temps vides
* **(unread-mail)** : Prise en compte des utilisateurs sans boîte mail dans l'établissement

### Documentation

* Add CeCILL-2.1 License on project

## 1.0.0 (2023-11-20)

**Note:** Starting point of this Changelog file
