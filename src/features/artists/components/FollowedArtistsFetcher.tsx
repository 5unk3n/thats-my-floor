import Link from 'next/link';

import ArtistCard from '@/features/artists/components/ArtistCard';
import { getFollowedArtists } from '@/features/artists/server/actions';
import { Button } from '@/shared/components/ui/button';

interface FollowedArtistsFetcherProps {
  searchTrigger: React.ReactNode;
}

export async function FollowedArtistsFetcher({ searchTrigger }: FollowedArtistsFetcherProps) {
  const response = await getFollowedArtists();
  const followedArtists =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.success && Array.isArray(response.data) ? (response.data as any[]) : [];

  if (followedArtists.length === 0) {
    return (
      <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
        <h3 className="text-lg font-semibold mb-2">아직 팔로우한 아티스트가 없습니다</h3>
        <p className="text-muted-foreground mb-6">
          좋아하는 아티스트를 추가하고 공연 알림을 받아보세요!
        </p>
        <div className="flex justify-center gap-4">
          {searchTrigger}
          <Button asChild className="bg-[#1DB954] hover:bg-[#1ed760] text-white border-0">
            <Link href="/mypage/spotify-sync">스포티파이 연동</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {followedArtists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} isFollowing={true} />
      ))}
    </div>
  );
}
