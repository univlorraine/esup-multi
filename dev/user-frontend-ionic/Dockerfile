FROM nginx:alpine

# Copie les fichiers de l'application compilée dans le répertoire de l'application nginx
COPY www/ /usr/share/nginx/html/
COPY ul-nginx.conf /etc/nginx/nginx.conf

# Expose le port 80 pour que Nginx puisse servir l'application
EXPOSE 80

# Démarre Nginx lors du lancement du conteneur
CMD ["nginx", "-g", "daemon off;"]
