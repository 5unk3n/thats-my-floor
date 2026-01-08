import { type Metadata } from 'next';

import { NotificationList } from '@/features/notifications';

export const metadata: Metadata = {
  title: '알림',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotificationPage() {
  return (
    <main className="container max-w-2xl mx-auto px-4 py-8">
      <NotificationList />
    </main>
  );
}
