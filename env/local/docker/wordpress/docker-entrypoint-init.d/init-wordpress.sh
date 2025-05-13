#!/bin/bash

source /opt/bitnami/scripts/liblog.sh


# =========================================================
# Fonction pour supprimer le contenu par défaut
# =========================================================
cleanup_default_content() {
    info "Suppression du contenu WordPress par défaut..."

    wp post delete $(wp post list --post_type=post --format=ids --allow-root) --force --allow-root || true
    wp post delete $(wp post list --post_type=page --format=ids --allow-root) --force --allow-root || true
    wp comment delete $(wp comment list --format=ids --allow-root) --force --allow-root || true
    wp widget reset --all --allow-root || true

    info "Contenu par défaut supprimé avec succès"
}

# =========================================================
# Fonction pour gérer les thèmes WordPress
# =========================================================
manage_themes() {
  info "Gestion des thèmes WordPress..."

  # Récupérer le statut complet des thèmes
  THEMES_STATUS=$(wp theme status --allow-root)

  # Obtenir le thème actif (A ou UA)
  ACTIVE_THEME=$(echo "$THEMES_STATUS" | grep -E "^\s*[U]?A" | awk '{print $2}')

  if [ -z "$ACTIVE_THEME" ]; then
    warn "Aucun thème actif trouvé. Utilisation du thème par défaut."
    ACTIVE_THEME="twentytwentyfive"  # Thème par défaut de WordPress
  fi

  info "Thème actif détecté : $ACTIVE_THEME"

  # Vérifier si le thème actif a une mise à jour disponible (indicateur UA)
  if echo "$THEMES_STATUS" | grep -q "^\s*UA"; then
    info "Mise à jour disponible pour le thème actif. Installation en cours..."
    wp theme update "$ACTIVE_THEME" --allow-root
    info "Thème actif mis à jour avec succès."
  else
    info "Le thème actif est à jour."
  fi

  info "Suppression des thèmes inactifs..."
  wp theme delete --all --allow-root

  info "Gestion des thèmes terminée."
}

# ============================================================================================
# Fonction qui installe et active les thèmes nécessaires et supprime ceux inutiles
# ============================================================================================
manage_plugins() {
  info "Activation des plugins nécessaires..."

  wp plugin install pods --activate  --allow-root
  wp plugin install polylang --activate  --allow-root
  wp plugin install https://github.com/univlorraine/multi-wordpress-config/archive/refs/heads/main.zip --activate --allow-root
  wp plugin install wp-graphql --activate --allow-root
  wp plugin install https://github.com/valu-digital/wp-graphql-polylang/archive/refs/heads/stable.zip --activate --allow-root
  wp plugin install disable-gutenberg --activate --allow-root
  wp plugin install wordpress-importer --activate --allow-root

  info "Plugins installés et activés avec succès"

  # Désactiver et supprimer les plugins par défaut
  info "Désactivation et suppression des plugins par défaut..."

  # Vérifier si Akismet est installé, le désactiver et le supprimer
  if wp plugin is-installed akismet --allow-root; then
    wp plugin deactivate akismet --allow-root
    wp plugin delete akismet --allow-root
    info "Plugin akismet désactivé et supprimé."
  else
    warn "Plugin akismet non trouvé."
  fi

  # Vérifier si Hello Dolly est installé, le désactiver et le supprimer
  if wp plugin is-installed hello --allow-root; then
    wp plugin deactivate hello --allow-root
    wp plugin delete hello --allow-root
    info "Plugin hello dolly désactivé et supprimé."
  else
    warn "Plugin hello dolly non trouvé."
  fi

  info "Plugins non nécessaires désinstallés avec succès"
}

# =============================================================
# Fonction qui met à jours les traductions si disponibles
# =============================================================
update_translations() {
  # Définir explicitement la locale
    LOCALE=${WORDPRESS_INSTALL_LOCALE:-fr_FR}

    info "Mise à jour des traductions du core..."
    wp language core update --allow-root

    info "Vérification de l'activation de la langue..."
    wp language core install $LOCALE --activate --allow-root

    info "Mise à jour des traductions des plugins installés..."
    ACTIVE_PLUGINS=$(wp plugin list --status=active --field=name --allow-root)
    for plugin in $ACTIVE_PLUGINS; do
      info "Mise à jour des traductions pour: $plugin"
      wp language plugin install $plugin $LOCALE --allow-root || true
      wp language plugin update $plugin --allow-root || true
    done

    info "Mise à jour des traductions des thèmes installés..."
    wp language theme update --all --allow-root

    info "Nettoyage du cache WordPress..."
    wp cache flush --allow-root
}

# ==================================================================
# Fonction pour configurer la redirection des uploads vers Nginx
# ==================================================================
## Ici nous sommes obligés de passer par un lien symbolique pour le répertoire uploads car si nous montons directement
## un volume dans /opt/bitnami/wordpress/wp-content/ le script d'installation de l'image Bitnami tombe en erreur
configure_uploads_security() {
  local uploads_dir="/opt/bitnami/wordpress/wp-content/uploads"
  local nginx_uploads_dir="/var/www/html/wp-content/uploads"

  info "Configuration de la sécurité du dossier uploads..."
  # Si on a choisi un fonctionnement avec nginx pour la délivrance des assets
  if [ -n "$NGINX_UPLOADS_PROXY" ]; then
    info "Variable NGINX_UPLOADS_PROXY définie, création du lien symbolique et copie de .htaccess-nginx-proxy..."
    BLOG_URL=${WORDPRESS_BLOG_URL:-http://localhost:9090}
    BLOG_HOST=$(echo $BLOG_URL | sed -e 's|^[^/]*//||' -e 's|/.*$||')
    PROXY_URL=${NGINX_UPLOADS_PROXY:-http://localhost:8080}

    if [ -d "$uploads_dir" ] && [ -d "$nginx_uploads_dir" ]; then
      info "Création du lien symbolique pour le dossier uploads..."

      # Supprimer le répertoire uploads existant
      rm -rf "$uploads_dir"

      # Créer le lien symbolique
      ln -s "$nginx_uploads_dir" "$uploads_dir"

      info "Lien symbolique créé avec succès."
    else
      warn "Impossible de créer le lien symbolique, les répertoires nécessaires n'existent pas."
    fi

    info "Configuration du .htaccess avec BLOG_HOST=$BLOG_HOST et PROXY_URL=$PROXY_URL"

    # Créer le fichier .htaccess pour la redirection vers le serveur nginx
    cat > /opt/bitnami/wordpress/.htaccess << EOF
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTP_HOST} ^localhost:9090$ [NC]
RewriteRule ^wp-content/uploads/(.*)$ ${NGINX_UPLOADS_PROXY}/wp-content/uploads/\$1 [L,R=301]
</IfModule>
EOF
  fi

  # Ajuster les permissions
  chown 1001:1001 "$uploads_dir" -R

  # Créer également un fichier index.php vide pour plus de sécurité
  echo '<?php // Silence is golden. ?>' > "$uploads_dir/index.php"
  chmod 644 "$uploads_dir/index.php"

  info "Configuration de la sécurité du dossier uploads terminée."
}

# ==================================================================
# Fonction principale du script
# ==================================================================
main() {
  info "Démarrage de la configuration personnalisée de WordPress..."

  # Vérifier si WordPress a déjà été initialisé
  if [ -f "/bitnami/wordpress/.initialized" ]; then
      info "WordPress a déjà été initialisé. Ignorer la configuration."
      exit 0
  fi

  # On supprime le contenu par défaut
  cleanup_default_content

  # On supprime les thèmes inutiles
  manage_themes

  # On active les plugins nécessaires à Multi et on désactive les plugins Wordpress inutiles
  manage_plugins

  # On met à jour les traductions si disponibles
  update_translations

  # Configurer la sécurité des uploads
  configure_uploads_security

  # Marquer l'initialisation comme terminée
  touch /bitnami/wordpress/.initialized
  info "Initialisation terminée."
}

# Exécuter la fonction principale
main
