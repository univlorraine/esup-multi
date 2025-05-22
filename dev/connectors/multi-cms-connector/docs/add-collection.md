# Ajouter une collection à un CMS
1. Se rendre dans le dossier du module du CMS en question. Ex: `src/cms/wordpress`
2. Dans le dossier `collections`, copier-coller le dossier d'une collection existante. Ex: `social-networks` qui est assez simple
3. Renommer le dossier copié avec le nom de la nouvelle collection. Ex: `contacts-utiles`
4. Renommer le préfixe des fichiers de la collection. Ex: `social-networks` devient `contacts-utiles`. Penser à renommer également le nom des classes
5. Modifier le contenu des fichiers pour qu'ils correspondent à la nouvelle collection (modèle, nom queries GraphQL entrantes, requêtes GraphQL vers le CMS, etc.)
6. Créer le modèle de la collection telle qu'elle sera retournée à MULTI dans `src/common/models/`
7. Ajouter la collection au module du CMS. Ex: dans le fichier `src/cms/wordpress/wordpress.module.ts` :
```typescript
import { Module } from '@nestjs/common';
import { ContactsUtilesDirectusModule } from './collections/contacts-utiles/contacts-utiles.directus.module';
import { SocialNetworksDirectusModule } from './collections/social-networks/social-networks.directus.module';

@Module({
  imports: [ContactsUtilesDirectusModule, SocialNetworksDirectusModule],
  exports: [ContactsUtilesDirectusModule, SocialNetworksDirectusModule],
})
export class DirectusModule {}
