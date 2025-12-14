import { Metadata } from 'next';
import Link from 'next/link';

import SpotifySyncList from '@/features/artists/components/SpotifySyncList';
import { fetchMySpotifyArtists } from '@/features/artists/server/spotify-actions';
import { Button } from '@/shared/components/ui/button';

export const metadata: Metadata = {
  title: '스포티파이 아티스트 가져오기 | 공연 알림 서비스',
  description: '스포티파이에서 팔로우한 아티스트를 동기화하여 알림을 받아보세요.',
};

export default async function SpotifySyncPage() {
  const { success, data, nextCursor, error } = await fetchMySpotifyArtists();

  if (!success || !data) {
    // Check if error is due to missing auth or scope (simple check)
    // In a real app we might redirect to login if unauthorized
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-2xl font-bold">스포티파이 연동이 필요합니다</h1>
        <p className="text-muted-foreground max-w-md">
          {error || '스포티파이 계정을 연동하고 팔로우 정보를 가져오려면 권한이 필요합니다.'}
        </p>
        <Button asChild>
          <Link href="/mypage">마이페이지로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">스포티파이 아티스트 가져오기</h1>
          <p className="text-muted-foreground">
            스포티파이에서 팔로우한 아티스트 중, 알림을 받고 싶은 아티스트를 선택해주세요.
          </p>
        </div>
      </div>

      <SpotifySyncList initialArtists={data} initialNextCursor={nextCursor} />
    </div>
  );
}
