# Université de Lorraine - Application MULTI - Tests Jmeter

## Information générale

- Les scénarii ont été regroupés dans un seul fichier de tests pour faciliter les évolutions / adaptations.
L'inconvénient est qu'il faut désactiver les scénarii qu'on ne souhaite pas lancer avant de lancer les tests de charge.
Il est tout à fait possible d'avoir un fichier JMX par scénario.
- jmeter peut être utilisé en mode graphique, pour créer / modifier les tests et en ligne de commande, pour lancer les tests de charge. Par ailleurs, il est recommandé d'utiliser la ligne de commande pour lancer les tests de charges.

## Paramètrage

Depuis l'interface graphique, dans le "User Defined Variables", on peut fixer les variables suivantes:

- host : le nom de domaine (ex: multi-staging.jnesis.com)
- scheme : https ou http
- user : l'utilisateur qui se connecte
- password : le mot de passe de l'utilisateur
- currentDate : la date utilisée pour récupérer les infos de planning (en autres). Le formant attendu est "yyyy-MM-dd"
- authToken : cette variable est alimentée durant les tests. 
- asUser : 

Les scénarii sont représentés par des "Thread Group". Chaque Thread embarque:

- les infos de lancement
- un rapport consolidé : bien préciser le fichier de sorti afin de garder les infos
- un graphique de résultats : bien préciser le fichier de sorti afin de garder les infos
- un graphique intégré : bien préciser le fichier de sorti afin de garder les infos
- un constant timer : permet d'ajouter un timeout entre 2 lancements

## Lancement d'un test de charge

- Ne laisser actif que le scénario souhaité. Désactiver les autres (clic droit sur le Threat, puis cliquer sur Désactiver)
- Lancer un terminal
- Exécuter les commandes: 
```shell
# on précise le chemin du fichier de log, car il est utilisé pour générer des rapports
# adapter les infos Xms et Xmx en fonction des besoins
JVM_ARGS="-Xms10g -Xmx10g" /chemin/du/binaire/jmeter -n -t /chemin/vers/le/fichier/jmx  -l /chemin/du/fichier/de/log.jtl

# on génère le rapport
/chemin/du/binaire/jmeter -g /chemin/du/fichier/de/log.jtl -o /chemin/du/rapport
```
