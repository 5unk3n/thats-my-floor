importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY', // These will need to be hardcoded or injected during build if possible, but for SW usually hardcoded or fetched from server
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
// Note: Service Workers cannot access process.env directly in standard Next.js setup without extra config.
// For now, we will use a placeholder comment instructing the user to fill this, or we can try to use a workaround.
// A common workaround is to have a route that generates this file, but that's complex.
// We will stick to the standard way: The user needs to put their config here manually or use a build script.
// However, to make it work for the user *now* if they provide env vars, we can't easily inject them.
// We will initialize with empty strings and let the user know they need to fill it, OR
// we can try to use `self.__WB_MANIFEST` if using workbox, but this is raw SW.

// Let's use a safer approach: Just initialize. If config is missing, it might fail.
// Actually, for `onBackgroundMessage`, we need initialization.

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
