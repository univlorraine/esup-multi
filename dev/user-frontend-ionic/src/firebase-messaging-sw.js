importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

fetch('./assets/stubs/firebase-environment.json').then(r => r.json().then(env => {
    firebase.initializeApp(env);

    const messaging = firebase.messaging();
  }
));
