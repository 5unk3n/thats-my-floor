import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { UserProfileCard, UserRepository } from '@/entities/user';
import { authOptions } from '@/shared/lib/auth';
import { Card, CardContent } from '@/shared/ui/card';

export async function UserProfileFetcher() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>로그인이 필요합니다.</div>;
  }

  // Use entity query directly
  const user = await UserRepository.findUserProfile(session.user.id);

  if (!user) {
    return <div>사용자 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="space-y-6">
      <UserProfileCard user={user} />

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
