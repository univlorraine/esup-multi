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
if ! npx license-checker-rseidelsohn &> /dev/null
then
  WAS_INSTALLED=0
  echo "Installing license-checker-rseidelsohn globally..."
  npm i -g license-checker-rseidelsohn
  echo ""
  if ! npx license-checker-rseidelsohn &> /dev/null
  then
    echo "license-checker-rseidelsohn could not be installed"
    exit 1
  fi
fi


# Count number of tasks
NB_TASKS=9 # toc (1) + root (2) + frontend (2) + backend-mocks (2) + backend/main (2)
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
    echo "* [Root directory](#root-directory)"
    echo "* [Frontend](#frontend)"
    echo "* [Mocks (backend)](#backend-mocks)"
    echo "* [Backend](#backend)"
    echo "  * [main](#backend-main)"
  } >> $OUTPUT_FILE
  for d in ./dev/user-backend-nest/microservices/*; do
    if [ -d "$d" ]; then
      {
        echo "  * [$(basename "$d")](#backend-$(basename "$d"))"
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
    npx license-checker-rseidelsohn --summary --excludePrivatePackages --direct 0 --start "$1" | sed '/^[[:space:]]*$/d'
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
    npx license-checker-rseidelsohn --markdown --excludePrivatePackages --direct 0 --start "$1" | sed '/^[[:space:]]*$/d'
    echo ""
  } >> $OUTPUT_FILE

  # update progress
  echo " ✔ $1 [details]"
  NB_DONE=$((NB_DONE+1))
}


echo "Generating library list..."

tableOfContent

# Generate for root directory
{
  echo ""
  echo "# Libraries"
  echo "The \`*\` next to the license name indicates that the license was *guessed* by [license-checker-rseidelsohn](https://www.npmjs.com/package/license-checker-rseidelsohn#how-licenses-are-found)."
  echo "## [Root directory](.)"
} >> $OUTPUT_FILE
licenseSummary .
{
  echo "<details><summary>Détails</summary>"
  echo ""
} >> $OUTPUT_FILE
licenseMarkdown .
{
  echo "</details>"
  echo ""
} >> $OUTPUT_FILE

# Generate for frontend
{
  echo "## [Frontend](./dev/user-frontend-ionic)"
} >> $OUTPUT_FILE
licenseSummary ./dev/user-frontend-ionic
{
  echo "<details><summary>Détails</summary>"
  echo ""
} >> $OUTPUT_FILE
licenseMarkdown ./dev/user-frontend-ionic
{
  echo "</details>"
  echo ""
} >> $OUTPUT_FILE

# Generate for backend/mocks
{
  echo "## [Mocks (backend)](./dev/user-backend-mocks)"
  echo "<span id=\"backend-mocks\"></span>"
} >> $OUTPUT_FILE
licenseSummary ./dev/user-backend-mocks
{
  echo "<details><summary>Détails</summary>"
  echo ""
} >> $OUTPUT_FILE
licenseMarkdown ./dev/user-backend-mocks
{
  echo "</details>"
  echo ""
} >> $OUTPUT_FILE

# Generate for backend/main
{
  echo "## [Backend](./dev/user-backend-nest)"
  echo "### [main](./dev/user-backend-nest/main)"
  echo "<span id=\"backend-main\"></span>"
} >> $OUTPUT_FILE
licenseSummary ./dev/user-backend-nest/main
{
  echo "<details><summary>Détails</summary>"
  echo ""
} >> $OUTPUT_FILE
licenseMarkdown ./dev/user-backend-nest/main
{
  echo "</details>"
  echo ""
} >> $OUTPUT_FILE

# Generate for each backend microservice
for d in ./dev/user-backend-nest/microservices/*; do
  if [ -d "$d" ]; then
    {
      echo "### [$(basename "$d")](./dev/user-backend-nest/microservices/$(basename "$d"))"
      echo "<span id=\"backend-$(basename "$d")\"></span>"
    } >> $OUTPUT_FILE
    licenseSummary "$d"
    {
      echo "<details><summary>Détails</summary>"
      echo ""
    } >> $OUTPUT_FILE
    licenseMarkdown "$d"
    {
      echo "</details>"
      echo ""
    } >> $OUTPUT_FILE
  fi
done

echo "[DONE]"

# Uninstall license-checker-rseidelsohn if it was installed by this script
if [ $WAS_INSTALLED -eq 0 ]; then
  echo ""
  echo "Uninstalling license-checker-rseidelsohn..."
  npm uninstall -g license-checker-rseidelsohn
fi
