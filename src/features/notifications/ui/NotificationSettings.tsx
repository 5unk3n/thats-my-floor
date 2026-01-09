'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

import { getNotificationSettingsAction, updateNotificationSettingsAction } from '../api/actions';

interface SettingsState {
  ticketOpenAlert: boolean;
  concertRegistrationAlert: boolean;
  emailNotification: boolean;
}

export default function NotificationSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsState>({
    ticketOpenAlert: true,
    concertRegistrationAlert: true,
    emailNotification: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getNotificationSettingsAction();
        if (response.success && response.data) {
          setSettings({
            ticketOpenAlert: response.data.ticketOpenAlert,
            concertRegistrationAlert: response.data.concertRegistrationAlert,
            emailNotification: response.data.emailNotification,
          });
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleToggle = async (key: keyof SettingsState) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings); // Optimistic update

    try {
      const response = await updateNotificationSettingsAction({ [key]: newSettings[key] });
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update');
      }
      router.refresh();
    } catch (error) {
      console.error('Failed to update settings:', error);
      setSettings(settings); // Revert on error
    }
  };

  if (loading) {
    return <div className="p-4 text-center">설정을 불러오는 중...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>알림 설정</CardTitle>
        <CardDescription>원하는 알림을 선택하여 받아보세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ticket Open Alert - Hidden for MVP
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-1">
            <Label htmlFor="ticket-open">티켓 오픈 알림</Label>
            <p className="text-sm text-muted-foreground">
              관심 있는 공연의 티켓 오픈 시 알림을 받습니다.
            </p>
          </div>
          <Switch
            id="ticket-open"
            checked={settings.ticketOpenAlert}
            onCheckedChange={() => handleToggle('ticketOpenAlert')}
          />
        </div>
        */}

        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-1">
            <Label htmlFor="concert-registration">공연 등록 알림</Label>
            <p className="text-sm text-muted-foreground">
              팔로우한 아티스트의 새 공연이 등록되면 알림을 받습니다.
            </p>
          </div>
          <Switch
            id="concert-registration"
            checked={settings.concertRegistrationAlert}
            onCheckedChange={() => handleToggle('concertRegistrationAlert')}
          />
        </div>

        {/* Email Notification - Hidden for MVP
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-1">
            <Label htmlFor="email-notification">이메일 알림</Label>
            <p className="text-sm text-muted-foreground">중요한 소식을 이메일로도 받아봅니다.</p>
          </div>
          <Switch
            id="email-notification"
            checked={settings.emailNotification}
            onCheckedChange={() => handleToggle('emailNotification')}
          />
        </div>
        */}
      </CardContent>
    </Card>
  );
}
