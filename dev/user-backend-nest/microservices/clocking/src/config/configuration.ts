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

import { KeepAliveOptions, RedisSocket, UlApi } from './configuration.interface';

const applyIfNotBlank = (param: string, applyFn: (value: string) => void) => {
  if (param && param.trim().length > 0) {
    applyFn(param);
  }
};

export default (): {
  ulApi: UlApi;
  keepAliveOptions: KeepAliveOptions;
  redisSocket: RedisSocket;
  redisPassword: string;
  cacheTtl: number;
  cacheMax: number;
} => {
  const keepAliveOptions = {};

  applyIfNotBlank(
    process.env.CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE,
    (value) => (keepAliveOptions['keepAlive'] = value === 'true'),
  );

  applyIfNotBlank(
    process.env.CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS,
    (value) => (keepAliveOptions['keepAliveMsecs'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT,
    (value) => (keepAliveOptions['freeSocketTimeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT,
    (value) => (keepAliveOptions['timeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS,
    (value) => (keepAliveOptions['maxSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS,
    (value) => (keepAliveOptions['maxFreeSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CLOCKING_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL,
    (value) => (keepAliveOptions['socketActiveTTL'] = parseInt(value)),
  );

  return {
    ulApi: {
      apiUrl: process.env.CLOCKING_SERVICE_UL_API_CLOCKING_URL,
      bearerToken: process.env.CLOCKING_SERVICE_UL_API_BEARER_TOKEN,
    },
    keepAliveOptions,
    redisSocket: {
      host: process.env.CLOCKING_SERVICE_CACHE_REDIS_HOST,
      port: parseInt(process.env.CLOCKING_SERVICE_CACHE_REDIS_PORT),
    },
    redisPassword: process.env.CLOCKING_SERVICE_CACHE_REDIS_PASSWORD,
    cacheTtl: parseInt(process.env.CLOCKING_SERVICE_CACHE_TTL_MS),
    cacheMax: parseInt(process.env.CLOCKING_SERVICE_CACHE_MAX),
  };
};
