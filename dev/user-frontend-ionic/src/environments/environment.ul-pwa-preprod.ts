import firebasePwaEnvironment from './firebase/web/firebase-environment.pwa-production.json';

export const environment = {
  production: true,
  apiEndpoint: 'https://multi-backend.sied-preprod.paas.univ-lorraine.fr',
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  cmsPublicAssetsEndpoint: 'https://directus.sied-preprod.paas.univ-lorraine.fr/assets/',
  firebase: firebasePwaEnvironment,
  guidedTourEnabled: true
};
