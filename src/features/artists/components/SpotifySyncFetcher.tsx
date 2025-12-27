import Link from 'next/link';

import SpotifySyncList from '@/features/artists/components/SpotifySyncList';
import { fetchMySpotifyArtistsAction } from '@/features/artists/server/actions';
import { Button } from '@/shared/components/ui/button';

export async function SpotifySyncFetcher() {
  const response = await fetchMySpotifyArtistsAction();

  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-2xl font-bold">스포티파이 연동이 필요합니다</h1>
        <p className="text-muted-foreground max-w-md">
          {response.error?.message ||
            '스포티파이 계정을 연동하고 팔로우 정보를 가져오려면 권한이 필요합니다.'}
        </p>
        <Button asChild>
          <Link href="/mypage">마이페이지로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { artists, nextCursor } = response.data as any;

  return <SpotifySyncList initialArtists={artists} initialNextCursor={nextCursor} />;
}
