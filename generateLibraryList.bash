#!/bin/bash

#
# Copyright ou © ou Copr. Université de Lorraine, (2022)
#
# Direction du Numérique de l'Université de Lorraine - SIED
#  (dn-mobile-dev@univ-lorraine.fr)
# JNESIS (contact@jnesis.com)
#
# Ce logiciel est un programme informatique servant à rendre accessible
# sur mobile divers services universitaires aux étudiants et aux personnels
# de l'université.
#
# Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
# et respectant les principes de diffusion des logiciels libres. Vous pouvez
# utiliser, modifier et/ou redistribuer ce programme sous les conditions
# de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
# sur le site "http://cecill.info".
#
# En contrepartie de l'accessibilité au code source et des droits de copie,
# de modification et de redistribution accordés par cette licence, il n'est
# offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
# seule une responsabilité restreinte pèse sur l'auteur du programme, le
# titulaire des droits patrimoniaux et les concédants successifs.
#
# À cet égard, l'attention de l'utilisateur est attirée sur les risques
# associés au chargement, à l'utilisation, à la modification et/ou au
# développement et à la reproduction du logiciel par l'utilisateur étant
# donné sa spécificité de logiciel libre, qui peut le rendre complexe à
# manipuler et qui le réserve donc à des développeurs et des professionnels
# avertis possédant des connaissances informatiques approfondies. Les
# utilisateurs sont donc invités à charger et à tester l'adéquation du
# logiciel à leurs besoins dans des conditions permettant d'assurer la
# sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
# à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
#
# Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
# pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
# termes.
#

OUTPUT_FILE=libraries.md

# Check if npm is installed
if ! command -v npm &> /dev/null
then
  echo "npm could not be found"
  exit 1
fi

# Check if license-checker-rseidelsohn is installed
WAS_INSTALLED=1
if ! command -v license-checker-rseidelsohn &> /dev/null
then
  WAS_INSTALLED=0
  echo "Installing license-checker-rseidelsohn..."
  npm i -g license-checker-rseidelsohn
  echo ""
  if ! command -v license-checker-rseidelsohn &> /dev/null
  then
    echo "license-checker-rseidelsohn could not be installed"
    exit 1
  fi
fi

# Count number of tasks
NB_TASKS=5 # toc + frontend + backend/main
NB_DONE=0
for d in ./dev/user-backend-nest/microservices/*; do
  if [ -d "$d" ]; then
    NB_TASKS=$((NB_TASKS+2)) # + details + summary
  fi
done



function tableOfContent() {
  # print progress
  echo -ne "[$((NB_DONE*100/NB_TASKS))%]\r"

  # generate table of content
  echo "# Table of content" > $OUTPUT_FILE
  {
    echo "* [Frontend](#frontend) [[summary](#summary-frontend)] [[details](#details-frontend)]"
    echo "* [Backend](#backend)"
    echo "  * [main](#backend-main) [[summary](#summary-backend-main)] [[details](#details-backend-main)]"
  } >> $OUTPUT_FILE
  for d in ./dev/user-backend-nest/microservices/*; do
    if [ -d "$d" ]; then
      {
        echo "  * [$(basename "$d")](#backend-$(basename "$d")) [[summary](#summary-backend-$(basename "$d"))] [[details](#details-backend-$(basename "$d"))]"
      } >> $OUTPUT_FILE
    fi
  done

  # update progress
  echo " ✔ Table of content"
  NB_DONE=$((NB_DONE+1))
}
function licenseSummary() {
  # print progress
  echo -ne "[$((NB_DONE*100/NB_TASKS))%]\r"

  # generate license summary for the given directory
  {
    echo "\`\`\`"
    license-checker-rseidelsohn --summary --excludePrivatePackages --direct 0 --start "$1" | sed '/^[[:space:]]*$/d'
    echo "\`\`\`"
    echo ""
  } >> $OUTPUT_FILE

  # update progress
  echo " ✔ $1 [summary]"
  NB_DONE=$((NB_DONE+1))
}
function licenseMarkdown() {
  # print progress
  echo -ne "[$((NB_DONE*100/NB_TASKS))%]\r"

  # generate library list for the given directory
  {
    license-checker-rseidelsohn --markdown --excludePrivatePackages --direct 0 --start "$1" | sed '/^[[:space:]]*$/d'
    echo ""
  } >> $OUTPUT_FILE

  # update progress
  echo " ✔ $1 [details]"
  NB_DONE=$((NB_DONE+1))
}


echo "Generating library list..."

tableOfContent

# Generate for frontend
{
  echo ""
  echo "# Libraries"
  echo "The \`*\` next to the license name indicates that the license was *guessed* by [license-checker-rseidelsohn](https://www.npmjs.com/package/license-checker-rseidelsohn#how-licenses-are-found)."
  echo "## [Frontend](./dev/user-frontend-ionic)"
  echo "### Summary"
  echo "<span id=\"summary-frontend\"></span>"
} >> $OUTPUT_FILE
licenseSummary ./dev/user-frontend-ionic
{
  echo "### Details"
  echo "<span id=\"details-frontend\"></span>"
} >> $OUTPUT_FILE
licenseMarkdown ./dev/user-frontend-ionic

# Generate for backend/main
{
  echo "## [Backend](./dev/user-backend-nest)"
  echo "### [main](./dev/user-backend-nest/main)"
  echo "<span id=\"backend-main\"></span>"
  echo "#### Summary"
  echo "<span id=\"summary-backend-main\"></span>"
} >> libraries.md
licenseSummary ./dev/user-backend-nest/main
{
  echo "#### Details"
  echo "<span id=\"details-backend-main\"></span>"
} >> $OUTPUT_FILE
licenseMarkdown ./dev/user-backend-nest/main

# Generate for each backend microservice
for d in ./dev/user-backend-nest/microservices/*; do
  if [ -d "$d" ]; then
    {
      echo "### [$(basename "$d")](./dev/user-backend-nest/microservices/$(basename "$d"))"
      echo "<span id=\"backend-$(basename "$d")\"></span>"
      echo "#### Summary"
      echo "<span id=\"summary-backend-$(basename "$d")\"></span>"
    } >> libraries.md
    licenseSummary "$d"
    {
      echo "#### Details"
      echo "<span id=\"details-backend-$(basename "$d")\"></span>"
    } >> $OUTPUT_FILE
    licenseMarkdown "$d"
  fi
done

echo "[DONE]"

# Uninstall license-checker-rseidelsohn if it was installed by this script
if [ $WAS_INSTALLED -eq 0 ]; then
  echo ""
  echo "Uninstalling license-checker-rseidelsohn..."
  npm uninstall -g license-checker-rseidelsohn
fi
