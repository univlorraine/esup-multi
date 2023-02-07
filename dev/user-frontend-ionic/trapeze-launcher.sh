#!/bin/bash
if [ -v "$CI_PLATFORM" ];
then
  echo "Lancement de trapeze pour la CI"
  npx trapeze run trapeze-config.prod.yml --$CI_PLATFORM -y
else
  echo "Lancement de trapeze pour le développement local"
  npx trapeze run trapeze-config.dev.yml -y
fi

