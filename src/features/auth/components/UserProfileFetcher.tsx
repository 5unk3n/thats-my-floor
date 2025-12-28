import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import * as authRepository from '@/features/auth/server/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { authOptions } from '@/shared/lib/auth';

export async function UserProfileFetcher() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>로그인이 필요합니다.</div>;
  }

  const user = await authRepository.findUserProfile(session.user.id);

  if (!user) {
    return <div>사용자 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>내 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div>
              <p className="font-medium text-lg">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
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
  );
}
