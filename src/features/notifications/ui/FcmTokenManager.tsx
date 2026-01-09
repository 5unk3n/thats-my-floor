'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import useFcmToken from '../model/hooks/useFcmToken';

export function FcmTokenManager() {
  const { notificationPermissionStatus, requestPermission } = useFcmToken();

  useEffect(() => {
    // Only show toast if permission is default (not yet prompted)
    // and only once per session or logic could be refined.
    // Ideally we shouldn't spam the user, but for now this is the entry point.
    if (notificationPermissionStatus === 'default') {
      toast('알림을 받아보세요!', {
        description: '새로운 공연 소식을 놓치지 않으려면 알림을 허용해주세요.',
        action: {
          label: '알림 받기',
          onClick: () => requestPermission(),
        },
        duration: Infinity,
      });
    }
  }, [notificationPermissionStatus, requestPermission]);

  return null;
}
