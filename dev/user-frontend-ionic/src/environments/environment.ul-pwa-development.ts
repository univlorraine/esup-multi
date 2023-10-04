import firebasePwaEnvironment from './firebase/web/firebase-environment.pwa-development.json';

export const environment = {
  production: true,
  apiEndpoint: 'https://mobile-back-dev.univ-lorraine.fr',
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  cmsPublicAssetsEndpoint: 'https://mobile-cms-dev.univ-lorraine.fr/assets/',
  firebase: firebasePwaEnvironment,
  guidedTourEnabled: true
};
