import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import SpotifyConnect from '@/features/artists/components/SpotifyConnect';
import NotificationSettings from '@/features/notifications/components/NotificationSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { authOptions } from '@/shared/lib/auth';

export const metadata = {
  title: '마이페이지 | 공연 알림 서비스',
  description: '내 정보와 알림 설정을 관리합니다.',
};

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">마이페이지</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>내 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-lg">{session.user.name}</p>
                  <p className="text-muted-foreground">{session.user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link href="/mypage/artists" className="block">
            <Card className="hover:bg-accent transition-colors">
              <CardContent className="p-6 flex items-center justify-between">
                <span className="font-medium">팔로우한 아티스트 관리</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>

        <div>
          <SpotifyConnect isConnected={!!session.user.accessToken} />
          <div className="h-6" />
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}
