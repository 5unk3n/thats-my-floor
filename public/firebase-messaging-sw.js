importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDhN2k_uzO7m73eZDXsmD3rFvFZ7TvqQdI',
  authDomain: 'festification.firebaseapp.com',
  projectId: 'festification',
  storageBucket: 'festification.firebasestorage.app',
  messagingSenderId: '686163073140',
  appId: '1:686163073140:web:fbbebdd7616191b4f21921',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png', // Customize as needed
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
