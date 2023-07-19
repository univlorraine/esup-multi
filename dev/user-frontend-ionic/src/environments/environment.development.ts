import firebasePwaEnvironment from './firebase/web/firebase-environment.pwa-development.json';

export const environment = {
  production: true,
  apiEndpoint: 'https://multi-development.jnesis.com',
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  cmsPublicAssetsEndpoint: 'https://multi-development.jnesis.com/assets/',
  firebase: firebasePwaEnvironment,
  guidedTourEnabled: true
};
