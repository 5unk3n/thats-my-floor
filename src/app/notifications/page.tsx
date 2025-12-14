import { NotificationList } from '@/features/notifications/components/NotificationList';

export const metadata = {
  title: '알림 | 내 방구석 1열',
  description: '받은 알림 목록을 확인하세요',
};

export default function NotificationsPage() {
  return (
    <main className="container max-w-2xl mx-auto px-4 py-8">
      <NotificationList />
    </main>
  );
}
