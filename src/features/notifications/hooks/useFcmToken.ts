'use client';

import { getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';

import { messaging } from '@/shared/lib/firebase/client';

export default function useFcmToken() {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission>('default');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          // Request permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === 'granted' && messaging) {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // Optional if using default
            });

            if (currentToken) {
              setToken(currentToken);
              // Register token to server
              await fetch('/api/notifications/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: currentToken, platform: 'web' }),
              });
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }
        }
      } catch (error) {
        console.error('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground push notification received:', payload);
        // Customize how you want to show the notification in foreground
        // e.g. toast, snackbar, etc.
      });
      return () => unsubscribe();
    }
  }, []);

  return { token, notificationPermissionStatus };
}
