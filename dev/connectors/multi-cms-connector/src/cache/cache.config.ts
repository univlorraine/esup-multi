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

export enum CacheCollection {
  LOGIN = 'login',
  CONTACT_US = 'contact-us',
  FEATURES = 'features',
  IMPORTANT_NEWS = 'important-news',
  CHANNELS = 'channels',
  SOCIAL_NETWORKS = 'social-networks',
  STATIC_PAGES = 'static-pages',
  WIDGETS = 'widgets',
}

const DEFAULT_TTL = 300000; // 5 minutes

export function getCacheTTL(collection: CacheCollection): number {
  const envKey = `CACHE_TTL_${collection.toUpperCase().replace('-', '_')}`;
  const envValue = process.env[envKey];

  if (envValue) {
    const ttl = parseInt(envValue, 10);
    if (!isNaN(ttl) && ttl > 0) {
      return ttl;
    }
  }

  // Fallback values if .env is not configured
  const fallbackConfig: Record<CacheCollection, number> = {
    [CacheCollection.LOGIN]: 86400000, // 1 day
    [CacheCollection.CONTACT_US]: 86400000, // 1 day
    [CacheCollection.FEATURES]: 3600000, // 1 hour
    [CacheCollection.IMPORTANT_NEWS]: 3600000, // 1 hour
    [CacheCollection.CHANNELS]: 86400000, // 1 day
    [CacheCollection.SOCIAL_NETWORKS]: 86400000, // 1 day
    [CacheCollection.STATIC_PAGES]: 86400000, // 1 day
    [CacheCollection.WIDGETS]: 3600000, // 1 hour
  };

  return fallbackConfig[collection] || DEFAULT_TTL;
}
