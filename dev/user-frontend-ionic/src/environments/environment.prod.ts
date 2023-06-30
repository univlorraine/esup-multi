import firebasePwaEnvironment from './firebase/web/firebase-environment.pwa-production.json';

export const environment = {
  production: true,
  apiEndpoint: 'https://myproddomain.com/api',
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  firebase: firebasePwaEnvironment,
  guidedTourEnabled: true
};
