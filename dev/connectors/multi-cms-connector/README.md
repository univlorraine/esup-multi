# Multi CMS Connector

API NestJS permettant d'interfacer la backend de MULTI avec le CMS de son choix (Wordpress, Directus, etc.).
Les échanges entre le connecteur et le CMS, et entre le connecteur et le backend de MULTI se font via des requêtes GraphQL.

Pour connaitre les requêtes GraphQL disponibles côté backend se référer à la documentation sur le [wiki](https://www.esup-portail.org/wiki/spaces/ESUPMULTI/pages/1425801229/Connecteur+CMS+Headless)

## Configuration
* `NODE_ENV`: Environnement d'exécution (défaut : development)
* `TOKEN_SECRET`: Clé privée utilisée pour signer les JWT
* `PORT`: Port d'écoute de l'application (défaut : 4000)
* `DEFAULT_CMS`: CMS par défaut à utiliser (directus ou wordpress)

### Directus
* `DIRECTUS_API_URL`: URL de l'API Directus
* `DIRECTUS_API_TOKEN`: Token d'accès à l'API Directus

### Wordpress
* `WORDPRESS_API_URL`: URL de l'API Wordpress
* `WORDPRESS_API_USERNAME`: Nom d'utilisateur de l'API Wordpress
* `WORDPRESS_API_PASSWORD`: Mot de passe de l'API Wordpress

### Redis
* `REDIS_HOST`: Hôte du serveur Redis
* `REDIS_PORT`: Port du serveur Redis
* `REDIS_PASSWORD`: Mot de passe du serveur Redis (optionnel)
* `REDIS_DB`: Numéro de la base de données Redis (optionnel, défaut : 0)

### Cache
* `CACHE_ENABLED`: Active ou désactive le cache (true/false, défaut : true)
* `CACHE_TTL_CHANNELS`: TTL du cache pour la collection Channels (en secondes)
* `CACHE_TTL_CONTACT_US`: TTL du cache pour la collection Contact-Us (en secondes)
* `CACHE_TTL_FEATURES`: TTL du cache pour la collection Features (en secondes)
* `CACHE_TTL_IMPORTANT_NEWS`: TTL du cache pour la collection Important-News (en secondes)
* `CACHE_TTL_LOGIN`: TTL du cache pour la collection Login (en secondes)
* `CACHE_TTL_SOCIAL_NETWORKS`: TTL du cache pour la collection Social-Networks (en secondes)
* `CACHE_TTL_STATIC_PAGES`: TTL du cache pour la collection Static-Pages (en secondes)
* `CACHE_TTL_WIDGETS`: TTL du cache pour la collection Widgets (en secondes)

## Cache

Le connecteur CMS utilise un système de cache Redis distribué pour optimiser les performances et éviter les latences des requêtes vers le CMS.

### Architecture du Cache

- **Backend principal** : Redis (avec fallback automatique vers le cache mémoire si Redis n'est pas disponible)
- **Namespace** : `multi-cms-connector` pour éviter les conflits
- **Clés** : Format `{collection}:all` ou `{collection}:{id}` 
- **TTL configurables** : Par collection via variables d'environnement
- **Invalidation** : Manuelle via API REST et automatique au démarrage

### Configuration du Cache

#### Activation/Désactivation
Le cache peut être entièrement désactivé pour les tests de performance :

```bash
# Désactiver le cache
CACHE_ENABLED=false
```

#### Variables d'environnement TTL
Les TTL du cache de chaque collection peut être paramétré depuis le fichier .env (cf. Configuration ci-dessus)

#### Valeurs par défaut (fallback)
Si les variables d'environnement ne sont pas définies, les TTL suivants sont utilisés :
- **Collections dynamiques** (features, important-news, widgets) : 1 heure
- **Collections statiques** (login, contact-us, channels, etc.) : 1 jour
- **TTL par défaut** : 5 minutes

### API Cache

Des routes sont mises à disposition pour vider le cache depuis une application tierce. 
Cela peut être utile si on souhaite utiliser des TTL plus long, mais pouvoir tout de même invalider le cache lors de la modification d'un élément dans le CMS par exemple.

#### Vider tout le cache
```bash
GET /cache/clear-all
```

#### Vider le cache d'une collection
```bash
GET /cache/clear/{collection}
```

Collections disponibles : `channels`, `contact-us`, `features`, `important-news`, `login`, `social-networks`, `static-pages`, `widgets`

### Système d'événements et Preload

Le système utilise des événements NestJS pour déclencher automatiquement le preload des données après vidage du cache.

#### Architecture événementielle

1. **Au démarrage** : Le `CacheService` vide tout le cache et émet `cache.startup.cleared`
2. **Via l'API** : Le `CacheController` invalide une collection et émet `{cms}.{collection}.cache.cleared`
3. **Services** : Chaque service écoute son événement spécifique et preload automatiquement

#### Implémentation dans un service

Chaque service de collection implémente le pattern suivant :

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

@Injectable()
export class FeaturesWordpressService {
  private readonly logger = new Logger(FeaturesWordpressService.name);
  
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.features.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload features after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading features...');
    await this.getFeatures();
    this.logger.log('Features preloaded successfully');
  }

  async getFeatures(): Promise<Features[]> {
    const cached = await this.cacheService.get<Features[]>(CacheCollection.FEATURES);
    if (cached) return cached;
    
    // Logique de récupération des données...
    const result = await this.fetchFromCms();
    await this.cacheService.set(CacheCollection.FEATURES, result);
    return result;
  }
}
```
