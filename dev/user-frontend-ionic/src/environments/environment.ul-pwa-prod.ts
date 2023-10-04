import firebasePwaEnvironment from './firebase/web/firebase-environment.pwa-production.json';

export const environment = {
  production: true,
  apiEndpoint: 'https://mobile-back.univ-lorraine.fr',
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  cmsPublicAssetsEndpoint: 'https://mobile-cms.univ-lorraine.fr/assets/',
  firebase: firebasePwaEnvironment,
  guidedTourEnabled: true
};
