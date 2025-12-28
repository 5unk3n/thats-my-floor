'use client';

import { getToken, onMessage } from 'firebase/messaging';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { messaging } from '@/shared/lib/firebase/client';

export default function useFcmToken() {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission>(() => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        return Notification.permission;
      }
      return 'default';
    });

  const retrieveToken = useCallback(async () => {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && messaging) {
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
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
        }
      }
    } catch (error) {
      console.error('An error occurred while retrieving token:', error);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermissionStatus(permission);

      if (permission === 'granted') {
        await retrieveToken();
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
    }
  }, [retrieveToken]);

  // Check permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        const timeout = setTimeout(() => {
          retrieveToken();
        }, 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [retrieveToken]);

  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        if (payload.notification) {
          toast(payload.notification.title, {
            description: payload.notification.body,
            action: payload.data?.url
              ? {
                  label: '확인',
                  onClick: () => (window.location.href = payload.data!.url),
                }
              : undefined,
          });
        }
      });
      return () => unsubscribe();
    }
  }, []);

  return { token, notificationPermissionStatus, requestPermission };
}
