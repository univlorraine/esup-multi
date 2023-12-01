# Université de Lorraine - Application MULTI

## Application utilisateur

- [Frontend Ionic](dev/user-frontend-ionic/README.md)
- [Backend Nest](dev/user-backend-nest/README.md)

## Licence

MULTI est sous la licence [CeCILL-2.1](LICENCE).

### En cas de changement de licence

> Cette section destinée à la Direction du Numérique de l'Université de Lorraine.

Si le projet doit être distribué sous une autre licence, il est nécessaire
de modifier le fichier [LICENCE](LICENCE) et de mettre à jour l'en-tête
de tous les fichiers du projet (votre IDE devrait pouvoir le faire pour vous).

Pensez également à mettre à jour les fichiers `package.json` indiquant
l'identifiant [SPDX](https://spdx.org/licenses/) de la licence du projet,
l'IDE ne le fera probablement pas.

Des informations complémentaires sont disponibles sur la page
[Vademecum licences](https://wikidocs.univ-lorraine.fr/display/dnsigdoctechdev/Vademecum+licences#Vademecumlicences-IDEJetBrains)
du wiki de l'Université de Lorraine (notamment la procédure pour les en-têtes
avec un IDE JetBrains).

## Dépendances

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
