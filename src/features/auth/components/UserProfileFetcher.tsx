import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { getUserProfile } from '@/features/auth/server/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export async function UserProfileFetcher() {
  const response = await getUserProfile();
  const user = response.success
    ? (response.data as { name?: string | null; email?: string | null })
    : null;

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
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
