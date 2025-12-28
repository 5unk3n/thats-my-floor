import Link from 'next/link';
import { getServerSession } from 'next-auth';

import SpotifySyncList from '@/features/artists/components/SpotifySyncList';
import { fetchMySpotifyArtists } from '@/features/artists/server/services/spotify-sync.service';
import { Button } from '@/shared/components/ui/button';
import { authOptions } from '@/shared/lib/auth';

export async function SpotifySyncFetcher() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken || !session?.user?.id) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-2xl font-bold">스포티파이 연동이 필요합니다</h1>
        <p className="text-muted-foreground max-w-md">
          스포티파이 계정을 연동하고 팔로우 정보를 가져오려면 권한이 필요합니다.
        </p>
        <Button asChild>
          <Link href="/mypage">마이페이지로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  const response = await fetchMySpotifyArtists(session.user.accessToken, session.user.id);

  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-2xl font-bold">데이터를 불러올 수 없습니다</h1>
        <p className="text-muted-foreground max-w-md">
          {response.error || '알 수 없는 오류가 발생했습니다.'}
        </p>
        <Button asChild>
          <Link href="/mypage">마이페이지로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  return <SpotifySyncList initialArtists={response.data} initialNextCursor={response.nextCursor} />;
}
