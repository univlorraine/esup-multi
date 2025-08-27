/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 * (dn-mobile-dev@univ-lorraine.fr)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { CacheCollection, getCacheTTL } from './cache.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService implements OnModuleInit {
  private readonly logger = new Logger(CacheService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // On vide le cache au démarrage de l'application après un délai
    // pour s'assurer que le service est bien initialisé
    setTimeout(() => {
      this.clearCacheOnStartup();
    }, 2000);
  }

  private async clearCacheOnStartup() {
    this.logger.log('Clearing all existing cache...');

    try {
      await this.invalidateAll();
      this.logger.log('Cache cleared successfully');
    } catch (error) {
      this.logger.warn('Failed to clear cache:', error.message);
    }
  }

  private getCacheKey(
    collection: CacheCollection,
    id?: string | number,
  ): string {
    return id ? `${collection}:${id}` : `${collection}:all`;
  }

  /**
   * Retourne le cache pour une collection et un ID spécifique.
   * Si aucun ID n'est fourni, retourne le cache pour toute la collection.
   * @param collection
   * @param id
   */
  async get<T>(
    collection: CacheCollection,
    id?: string | number,
  ): Promise<T | null> {
    const key = this.getCacheKey(collection, id);
    try {
      const cached = await this.cacheManager.get<T>(key);
      if (cached) {
        this.logger.debug(`Cache hit for ${key}`);
        return cached;
      }
      this.logger.debug(`Cache miss for ${key}`);
      return null;
    } catch (error) {
      this.logger.error(
        `Cache get error for ${collection} with key ${key}`,
        error,
      );
      return null;
    }
  }

  /**
   * Enregistre des données dans le cache pour une collection et un ID spécifique.
   * Si aucun ID n'est fourni, enregistre les données pour toute la collection.
   * @param collection
   * @param data
   * @param id
   */
  async set<T>(
    collection: CacheCollection,
    data: T,
    id?: string | number,
  ): Promise<void> {
    const key = this.getCacheKey(collection, id);
    try {
      const ttl = getCacheTTL(collection);
      await this.cacheManager.set(key, data, ttl);
      this.logger.debug(`Cache set for ${key} with TTL ${ttl}ms`);
    } catch (error) {
      this.logger.error(
        `Cache set error for ${collection} with key ${key}`,
        error,
      );
    }
  }

  /**
   * Invalide le cache pour une collection spécifique.
   * @param collection
   */
  async invalidateCollection(collection: CacheCollection): Promise<void> {
    try {
      const allKey = this.getCacheKey(collection);
      await this.cacheManager.del(allKey);

      // On émet un événement pour déclencher le preload de la collection
      const defaultCms = this.configService.get<string>('DEFAULT_CMS');
      if (defaultCms) {
        const emitKey = `${defaultCms.toLowerCase()}.${collection.toLowerCase()}.cache.cleared`;
        this.logger.debug(`Emitting ${emitKey} event`);
        this.eventEmitter.emit(emitKey);
      }

      this.eventEmitter.emit(`${collection}.cache.cleared`);

      this.logger.debug(`Cache invalidated for collection ${collection}`);
    } catch (error) {
      this.logger.error(
        `Cache invalidation error for collection ${collection}`,
        error,
      );
    }
  }

  /**
   * Invalide le cache pour toutes les collections.
   */
  async invalidateAll(): Promise<void> {
    try {
      for (const collection of Object.values(CacheCollection)) {
        await this.invalidateCollection(collection);
      }
      this.logger.debug('All cache invalidated');
    } catch (error) {
      this.logger.error('Cache invalidation error', error);
    }
  }

  /**
   * Invalide le cache pour une collection et un ID spécifique.
   * (inutilisé sur le projet pour le moment)
   * @param collection
   * @param id
   */
  async invalidateKey(
    collection: CacheCollection,
    id?: string | number,
  ): Promise<void> {
    try {
      const key = this.getCacheKey(collection, id);
      await this.cacheManager.del(key);
      this.logger.debug(`Cache invalidated for key ${key}`);
    } catch (error) {
      const errorKey = this.getCacheKey(collection, id);
      this.logger.error(`Cache invalidation error for key ${errorKey}`, error);
    }
  }
}
