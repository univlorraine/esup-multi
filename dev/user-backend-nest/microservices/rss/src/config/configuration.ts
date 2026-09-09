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

import * as infosJsonData from '../infos.json';
import { KeepAliveOptions, RssConfiguration } from './configuration.interface';

const DEFAULT_FEED_TIMEOUT_MS = 15000;
const DEFAULT_RETRY_COUNT = 1;
const DEFAULT_RETRY_DELAY_MS = 1000;
const DEFAULT_STALE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const DEFAULT_CACHE_TTL_MS = 300;

const applyIfNotBlank = (param: string, applyFn: (value: string) => void) => {
  if (param && param.trim().length > 0) {
    applyFn(param);
  }
};

const intOrDefault = (param: string, defaultValue: number): number => {
  const parsed = parseInt(param);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Proxy sortant à utiliser pour joindre le flux.
 */
const resolveProxyUrl = (): string =>
  process.env.RSS_SERVICE_HTTPS_PROXY ||
  process.env.HTTPS_PROXY ||
  process.env.https_proxy ||
  process.env.HTTP_PROXY ||
  process.env.http_proxy ||
  '';

export default (): RssConfiguration => {
  const keepAliveOptions: KeepAliveOptions = {};

  applyIfNotBlank(
    process.env.RSS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE,
    (value) => (keepAliveOptions['keepAlive'] = value === 'true'),
  );

  applyIfNotBlank(
    process.env.RSS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS,
    (value) => (keepAliveOptions['keepAliveMsecs'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RSS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT,
    (value) => (keepAliveOptions['freeSocketTimeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RSS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT,
    (value) => (keepAliveOptions['timeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RSS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS,
    (value) => (keepAliveOptions['maxSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RSS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS,
    (value) => (keepAliveOptions['maxFreeSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RSS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL,
    (value) => (keepAliveOptions['socketActiveTTL'] = parseInt(value)),
  );

  return {
    feed: {
      url: process.env.RSS_SERVICE_FEED_URL,
      timeoutMs: intOrDefault(
        process.env.RSS_SERVICE_FEED_TIMEOUT_MS,
        DEFAULT_FEED_TIMEOUT_MS,
      ),
      retryCount: intOrDefault(
        process.env.RSS_SERVICE_FEED_RETRY_COUNT,
        DEFAULT_RETRY_COUNT,
      ),
      retryDelayMs: intOrDefault(
        process.env.RSS_SERVICE_FEED_RETRY_DELAY_MS,
        DEFAULT_RETRY_DELAY_MS,
      ),
      userAgent:
        process.env.RSS_SERVICE_FEED_USER_AGENT ||
        `${infosJsonData.name}/${infosJsonData.version}`,
      staleMaxAgeMs: intOrDefault(
        process.env.RSS_SERVICE_FEED_STALE_MAX_AGE_MS,
        DEFAULT_STALE_MAX_AGE_MS,
      ),
    },
    allowedHtmlTags: process.env.RSS_SERVICE_ALLOWED_HTML_TAGS
      ? process.env.RSS_SERVICE_ALLOWED_HTML_TAGS.split(',')
      : [],
    cacheTtl: intOrDefault(
      process.env.RSS_SERVICE_CACHE_TTL_MS,
      DEFAULT_CACHE_TTL_MS,
    ),
    keepAliveOptions,
    proxyUrl: resolveProxyUrl(),
  };
};
