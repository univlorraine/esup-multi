/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
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

import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpAgent, HttpsAgent } from 'agentkeepalive';
import { HttpsProxyAgent } from 'https-proxy-agent';
import {
  FeedOptions,
  KeepAliveOptions,
} from './config/configuration.interface';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger(KeepaliveHttpModule.name);
        const keepAliveOptions =
          configService.get<KeepAliveOptions>('keepAliveOptions');
        const proxyUrl = configService.get<string>('proxyUrl');
        const feed = configService.get<FeedOptions>('feed');

        // L'agent ne doit pas fermer la socket avant l'expiration de la
        // requête : sinon une réponse lente du serveur de flux remonte en
        // ECONNRESET au lieu du timeout attendu. Le défaut d'agentkeepalive
        // (8s) est plus court que le timeout de récupération du flux.
        const agentOptions: KeepAliveOptions = {
          timeout: feed.timeoutMs + 5000,
          ...keepAliveOptions,
        };

        logger.log(
          `Using agentkeepalive options: ${JSON.stringify(agentOptions)}`,
        );
        if (agentOptions.timeout <= feed.timeoutMs) {
          logger.warn(
            `Agent timeout (${agentOptions.timeout}ms) is not greater than the ` +
              `feed request timeout (${feed.timeoutMs}ms): slow responses will ` +
              `be cut by the agent before the request times out`,
          );
        }

        if (!proxyUrl) {
          logger.log('No outgoing proxy configured, using direct connections');
          return {
            httpAgent: new HttpAgent(agentOptions),
            httpsAgent: new HttpsAgent(agentOptions),
          };
        }

        logger.log(`Using outgoing proxy: ${proxyUrl}`);
        if (feed?.url?.startsWith('http://')) {
          logger.warn(
            'Feed url is plain http: the proxy only applies to https requests',
          );
        }

        return {
          httpAgent: new HttpAgent(agentOptions),
          httpsAgent: new HttpsProxyAgent(proxyUrl, agentOptions),
          proxy: false as const,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [HttpModule],
})
export class KeepaliveHttpModule {}
