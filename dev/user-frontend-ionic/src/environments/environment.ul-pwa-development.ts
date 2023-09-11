import firebasePwaEnvironment from './firebase/web/firebase-environment.pwa-development.json';

export const environment = {
  production: true,
  apiEndpoint: 'https://multi-backend.sied-dev.paas.univ-lorraine.fr',
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  cmsPublicAssetsEndpoint: 'https://directus.sied-dev.paas.univ-lorraine.fr/assets/',
  firebase: firebasePwaEnvironment,
  guidedTourEnabled: true
};
