#!/bin/bash
#Récupération des secrets
echo "Récupération des secrets"
npm install $MULTI_SECRETS_PATH --no-save
#Placement des secrets au bon endroit
echo "Placement des secrets au bon endroit"
mkdir -p src/environments/firebase
mv -v node_modules/secrets/firebase/*  src/environments/firebase

#Lancement de trapeze
echo "Lancement de trapeze"
TRAPEZE_FILE=${TRAPEZE_FILE:-trapeze-config.dev.yml}
echo $TRAPEZE_FILE
npx trapeze run $TRAPEZE_FILE -y

#Lancement du build
echo "Lancement du build"
npm run build
