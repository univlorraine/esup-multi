# Projet Esup-Multi

![https://img.shields.io/github/license/EsupPortail/Esup-Pod)](https://img.shields.io/badge/License-CeCILL%202.1-orange)

Le projet Esup-Multi porté par l'université de Lorraine a pour objectif de proposer un socle technique opensource permettant la mise en oeuvre d'une application mobile institutionnelle Android, iOS et Web. Elle apporte un back-end modulaire qui assoupli le paramétrage et la gestion des contenus.

Les sources du projet sont constituées :

- D'un **front-end** qui permet de générer les applications iOs et Android ([Read me](dev/user-frontend-ionic/README.md))
- D'un **back-end** basé sur une archtecture micro-services et composée de 17 modules ([Read me](dev/user-backend-nest/README.md))

## Installation quickstart

Plus d'information dans la [documentation d'installation](https://www.esup-portail.org/wiki/x/F4DoTw)

## Technologies utilisées

Côté front-end :

- Ionic
- Angular

Côté back-end :
- NodeJS avec Express et NestJS
- Nats
- Directus
- MongoDB

Retrouvez toute la documentation sur [notre espace wiki](https://www.esup-portail.org/wiki/x/EYDoTw)

## Licence et contributions

MULTI est sous la licence [CeCILL-2.1](LICENCE). Si vous souhaitez contribuer au projet vous pouvez contacter [esup-multi@esup-portail.org](mailto:esup-multi@esup-portail.org).

### Dépendances

La liste des dépendances et du code tiers utilisé est disponible
dans le fichier [libraries.md](libraries.md).\
Si vous apportez des modifications à ce projet, merci de mettre à jour
ce fichier en lançant le script [generateLibraryList.bash](generateLibraryList.bash)
à la racine du projet (aucun argument requis).

L'utilisation du script nécessite d'avoir l'interpréteur de commandes
[bash](https://www.gnu.org/software/bash/) ainsi que [npm](https://www.npmjs.com/)
sur votre machine. Sur windows, vous pouvez utiliser
[wsl](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10) pour accéder à bash.

Tant que l'arborescence globale du projet n'est pas modifiée, il ne devrait
pas être nécessaire de modifier le script. Par conséquent, ajouter ou supprimer
un microservice ne nécessite pas de modifier le script.

Le script utilise [license-checker-rseidelsohn](https://www.npmjs.com/package/license-checker-rseidelsohn)
(license [BSD-3-Clause](https://spdx.org/licenses/BSD-3-Clause.html))
pour générer la liste des dépendances à partir des fichiers `package.json`
du projet.
