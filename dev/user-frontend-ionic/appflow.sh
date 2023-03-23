#!/bin/bash

# Set the -e option: exit on first error
set -e

#Récupération des secrets
echo "Récupération des secrets"
npm install $MULTI_SECRETS_PATH --no-save
#Placement des secrets au bon endroit
echo "Déplacement des secrets..."
mkdir -p src/environments/firebase
mv -v node_modules/secrets/firebase/*  src/environments/firebase
echo "Secrets déplacés"

#Lancement de trapeze
echo "Lancement de Trapeze..."
TRAPEZE_FILE=${TRAPEZE_FILE:-trapeze-config.dev.yml}
echo $TRAPEZE_FILE
npx trapeze run $TRAPEZE_FILE -y
echo "fin de Trapeze."

#Lancement du build (on ne passe pas par le npm run build pour ne pas rendre le projet adhérant à linux/mac)
echo "Determination du basehref..."
if [[ "$CI_PLATFORM" == "web" ]]; then
  BASE_HREF="--base-href=/pwa/"
  echo "La valeur du basehref est $BASE_HREF"
else
  echo "La valeur du basehref est /"
fi

echo "Lancement du build..."
echo "BUILD_ENV: $BUILD_ENV"
npm run build -- --configuration=$BUILD_ENV $BASE_HREF
