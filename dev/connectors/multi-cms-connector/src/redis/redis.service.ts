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

import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: RedisClientType | null = null;
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  /**
   * Connexion à Redis
   */
  async connect(): Promise<void> {
    const redisHost = this.configService.get<string>('REDIS_HOST');
    const redisPort = this.configService.get<number>('REDIS_PORT', 6379);
    const redisPassword = this.configService.get<string>('REDIS_PASSWORD');
    const redisDb = this.configService.get<number>('REDIS_DB', 0);

    if (!redisHost) {
      this.logger.log('Redis not configured - using memory-only cache');
      return;
    }

    try {
      const redisUrl = redisPassword
        ? `redis://:${redisPassword}@${redisHost}:${redisPort}/${redisDb}`
        : `redis://${redisHost}:${redisPort}/${redisDb}`;

      this.client = createClient({
        url: redisUrl,
        socket: {
          connectTimeout: 5000,
          reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
        },
      });

      this.client.on('ready', () => {
        this.isConnected = true;
        this.logger.log(`Connected to Redis at ${redisHost}:${redisPort}`);
      });

      this.client.on('error', (error) => {
        this.isConnected = false;
        this.logger.error('Redis connection error:', error.message);
      });

      this.client.on('end', () => {
        this.isConnected = false;
        this.logger.warn('Redis connection closed');
      });

      await this.client.connect();
    } catch (error) {
      this.logger.error('Failed to connect to Redis:', error.message);
      this.client = null;
      this.isConnected = false;
    }
  }

  /**
   * Déconnexion de Redis
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.quit();
        this.logger.log('Disconnected from Redis');
      } catch (error) {
        this.logger.warn('Error during Redis disconnect:', error.message);
      }
      this.client = null;
      this.isConnected = false;
    }
  }

  /**
   * Vérifie si Redis est disponible
   */
  isAvailable(): boolean {
    return this.client !== null && this.isConnected;
  }

  /**
   * Stocke une valeur dans Redis avec ou sans TTL
   */
  async set(key: string, value: string, ttl?: number): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      if (ttl) {
        // Si un TTL est fourni, on indique un temps d'expiration en millisecondes à notre commande Redis (PX)
        await this.client!.set(key, value, { PX: ttl });
      } else {
        // Sinon, on stocke la valeur sans expiration
        await this.client!.set(key, value);
      }
      return true;
    } catch (error) {
      this.logger.error(`Failed to set Redis key ${key}:`, error.message);
      return false;
    }
  }

  /**
   * Récupère une valeur depuis Redis
   */
  async get(key: string): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const result = await this.client!.get(key);
      return typeof result === 'string' ? result : null;
    } catch (error) {
      this.logger.error(`Failed to get Redis key ${key}:`, error.message);
      return null;
    }
  }

  /**
   * Supprime une valeur dans Redis à partir d'une clé donnée (inutilisée pour l'instant)
   */
  async del(key: string): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      await this.client!.del(key);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete Redis key ${key}:`, error.message);
      return false;
    }
  }

  /**
   * Acquiert un lock distribué avec SET NX
   */
  async tryLock(key: string, ttl: number): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }
    // On génère un token pour être sur que le lock est bien relaché par celui qui l'a acquis
    const lockToken = Math.random().toString(36).slice(2);

    try {
      const result = await this.client!.set(key, lockToken, {
        PX: ttl,
        NX: true,
      });
      return result === 'OK' ? lockToken : null;
    } catch (error) {
      this.logger.error(`Failed to acquire lock ${key}:`, error.message);
      return null;
    }
  }

  /**
   * Libère un lock distribué
   */
  async releaseLock(key: string, lockToken: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      else
        return 0
      end
    `;

    try {
      await this.client!.eval(script, { keys: [key], arguments: [lockToken] });
    } catch (error) {
      this.logger.error(`Failed to release lock ${key}:`, error.message);
    }
  }

  /**
   * Supprime toutes les clés avec un pattern
   */
  async delPattern(pattern: string): Promise<number> {
    if (!this.isAvailable()) {
      return 0;
    }

    try {
      let cursor = '0';
      let total = 0;
      do {
        const res = await this.client!.scan(cursor, {
          MATCH: pattern,
          COUNT: 500,
        });
        cursor = res.cursor;
        const keys = res.keys;
        if (keys.length) total += await this.client!.del(keys);
      } while (cursor !== '0');
      return total;
    } catch (e) {
      this.logger.error(`Failed to delete pattern ${pattern}:`, e.message);
      return 0;
    }
  }
}
