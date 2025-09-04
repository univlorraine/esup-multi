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

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CacheCollection, getCacheTTL, isCacheEnabled } from './cache.config';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@redis/redis.service';

@Injectable()
export class CacheService implements OnModuleInit {
  private readonly logger = new Logger(CacheService.name);
  private memoryCache = new Map<string, { data: any; expiresAt: number }>();

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async onModuleInit() {
    // On vide le cache au démarrage de l'application après un délai
    // pour s'assurer que le service est bien initialisé
    setTimeout(() => {
      this.clearCacheOnStartup();
    }, 2000);
  }

  /**
   * Vide le cache au démarrage de l'application si le cache est activé.
   * @private
   */
  private async clearCacheOnStartup() {
    if (!isCacheEnabled()) {
      this.logger.log('Cache disabled, skipping startup cache clear');
      return;
    }

    this.logger.log('Clearing all existing cache...');

    try {
      await this.invalidateAll();
      this.logger.log('Cache cleared successfully');
    } catch (error) {
      this.logger.warn('Failed to clear cache:', error.message);
    }
  }

  /**
   * Génère une clé de cache unique pour une collection et un ID spécifique.
   * @param collection
   * @param id
   * @private
   */
  private getCacheKey(
    collection: CacheCollection,
    id?: string | number,
  ): string {
    const env = process.env.NODE_ENV || 'dev';
    const base = id ? `${collection}:${id}` : `${collection}:all`;
    return `multi:${env}:cache:${base}`;
  }

  /**
   * Génère une clé de lock unique pour une collection et un ID spécifique.
   * @param collection
   * @param id
   * @private
   */
  private getLockKey(
    collection: CacheCollection,
    id?: string | number,
  ): string {
    const env = process.env.NODE_ENV || 'dev';
    const base = id ? `${collection}:${id}` : `${collection}:all`;
    return `multi:${env}:lock:${base}`;
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
    if (!isCacheEnabled()) {
      this.logger.debug('Cache disabled, skipping get');
      return null;
    }

    const key = this.getCacheKey(collection, id);

    // Essai Redis d'abord si disponible
    if (this.redisService.isAvailable()) {
      try {
        const redisValue = await this.redisService.get(key);
        if (redisValue) {
          const parsed = JSON.parse(redisValue);
          this.logger.debug(`Redis cache hit for ${key}`);
          return parsed;
        }
      } catch (error) {
        this.logger.warn(`Redis cache error for ${key}:`, error.message);
      }
    }

    // Fallback vers cache mémoire
    const memoryItem = this.memoryCache.get(key);
    if (memoryItem && memoryItem.expiresAt > Date.now()) {
      this.logger.debug(`Memory cache hit for ${key}`);
      return memoryItem.data;
    }

    this.logger.debug(`Cache miss for ${key}`);
    return null;
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
    if (!isCacheEnabled()) {
      this.logger.debug('Cache disabled, skipping set');
      return;
    }

    const key = this.getCacheKey(collection, id);
    const ttl = getCacheTTL(collection);

    try {
      // Stockage Redis si disponible
      if (this.redisService.isAvailable()) {
        const success = await this.redisService.set(
          key,
          JSON.stringify(data),
          ttl,
        );
        if (success) {
          this.logger.debug(`Redis cache set for ${key} with TTL ${ttl}ms`);
        }
      }

      // Stockage mémoire en parallèle (backup)
      this.memoryCache.set(key, {
        data,
        expiresAt: Date.now() + ttl,
      });
      this.logger.debug(`Memory cache set for ${key} with TTL ${ttl}ms`);
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
      const env = process.env.NODE_ENV || 'dev';
      const pattern = `multi:${env}:cache:${collection}:*`;

      // 1) Redis : suppression de toutes les clés de la collection
      if (this.redisService.isAvailable()) {
        const deleted = await this.redisService.delPattern(pattern);
        this.logger.debug(
          `Redis: deleted ${deleted} key(s) for pattern "${pattern}"`,
        );
      } else {
        this.logger.debug('Redis unavailable, skipping Redis invalidation');
      }

      // 2) Mémoire : suppression de toutes les clés correspondantes
      let memDeleted = 0;
      for (const key of Array.from(this.memoryCache.keys())) {
        if (key.startsWith(`multi:${env}:cache:${collection}:`)) {
          this.memoryCache.delete(key);
          memDeleted++;
        }
      }
      this.logger.debug(
        `Memory: deleted ${memDeleted} key(s) for collection "${collection}"`,
      );

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
      // Redis : suppression par pattern
      if (this.redisService.isAvailable()) {
        const env = process.env.NODE_ENV || 'dev';
        await this.redisService.delPattern(`multi:${env}:cache:*`);
      }

      // Mémoire : clear complet
      this.memoryCache.clear();

      // Émission des événements pour chaque collection
      for (const collection of Object.values(CacheCollection)) {
        const defaultCms = this.configService.get<string>('DEFAULT_CMS');
        if (defaultCms) {
          const emitKey = `${defaultCms.toLowerCase()}.${collection.toLowerCase()}.cache.cleared`;
          this.logger.debug(`Emitting ${emitKey} event`);
          this.eventEmitter.emit(emitKey);
        }
        this.eventEmitter.emit(`${collection}.cache.cleared`);
      }

      this.logger.debug('All cache invalidated');
    } catch (error) {
      this.logger.error('Cache invalidation error', error);
    }
  }

  private readonly loadingPromises = new Map<string, Promise<any>>();

  async getOrFetchWithLock<T>(
    collection: CacheCollection,
    fetcher: () => Promise<T>,
    id?: string | number,
  ): Promise<T> {
    // 0) Premier check cache
    const first = await this.get<T>(collection, id);
    if (first !== null && first !== undefined) return first;

    const cacheKey = this.getCacheKey(collection, id);
    const lockKey = this.getLockKey(collection, id);
    const lockTtl = 10000; // 10 secondes

    // 1. Prévention du cache stampede local (même instance)
    if (this.loadingPromises.has(cacheKey)) {
      this.logger.debug(`${cacheKey} already loading (in-memory), waiting...`);
      return await this.loadingPromises.get(cacheKey)!;
    }

    let lockToken: string | null = null;
    const start = Date.now();
    const maxWaitMs = 8000;
    let delay = 150;

    // 2. Prévention du cache stampede distribué (multi-instance) avec Redis
    if (this.redisService.isAvailable()) {
      while (!lockToken && Date.now() - start <= maxWaitMs) {
        // On re-checke le cache avant d'essayer d'acquérir le lock
        const second = await this.get<T>(collection, id);
        if (second !== null && second !== undefined) return second;

        // On attend d'acquérir le lock avant de continuer
        lockToken = await this.redisService.tryLock(lockKey, lockTtl);

        if (lockToken) {
          this.logger.debug(`Lock acquired for ${cacheKey}`);

          // Recheck cache APRÈS lock (double-check pour éviter le fetch inutile)
          const third = await this.get<T>(collection, id);
          if (third !== null && third !== undefined) {
            // Rien à faire, on libère le lock proprement et on sert le cache
            await this.redisService.releaseLock(lockKey, lockToken);
            this.logger.debug(
              `Cache already filled for ${cacheKey} after lock — no fetch`,
            );
            return third;
          }

          // On a le lock et le cache est toujours vide → on sort de la boucle pour fetch
          break;
        }

        this.logger.debug(
          `${cacheKey} being loaded by another instance, waiting...`,
        );

        await new Promise((res) =>
          setTimeout(res, delay + Math.floor(Math.random() * 50)),
        );
        delay = Math.min(Math.floor(delay * 1.8), 750);
      }
    } else {
      this.logger.debug('Redis unavailable, fallback to in-memory');
    }

    // Lock acquired (or no Redis), can load data
    const loadingPromise = (async () => {
      try {
        // Dernier re-check juste avant fetch (cas limite)
        const fourth = await this.get<T>(collection, id);
        if (fourth !== null && fourth !== undefined) return fourth;

        const result = await fetcher();
        await this.set(collection, result, id);
        this.logger.debug(`${cacheKey} loaded and cached`);
        return result;
      } catch (error) {
        this.logger.error(`Loading error for ${cacheKey}:`, error);
        throw error;
      } finally {
        if (lockToken) {
          await this.redisService.releaseLock(lockKey, lockToken);
          this.logger.debug(`Lock released for ${cacheKey}`);
        }
      }
    })();
    this.loadingPromises.set(cacheKey, loadingPromise);

    try {
      return await loadingPromise;
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }
}
