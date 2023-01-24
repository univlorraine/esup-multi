#!/bin/bash
if [ "$CI_PLATFORM" = "ios" ];
then
  echo "Lancement de trapeze"
  npx trapeze run trapeze-ios-ci.yml -y
elif [ "$CI_PLATFORM" = "android" ];
then
  echo "Lancement de trapeze"
  npx trapeze run trapeze-android-ci.yml -y
fi

