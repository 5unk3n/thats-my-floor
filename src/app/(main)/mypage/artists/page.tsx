import { Plus } from 'lucide-react';
import Link from 'next/link';

import ArtistCard from '@/features/artists/components/ArtistCard';
import { getFollowedArtists } from '@/features/artists/server/actions';
import { ArtistSearchTrigger } from '@/features/search/components/ArtistSearchTrigger';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

export const metadata = {
  title: '팔로우한 아티스트 | 공연 알림 서비스',
  description: '내가 팔로우한 아티스트 목록입니다.',
};

export default async function FollowedArtistsPage() {
  const followedArtists = await getFollowedArtists();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">팔로우한 아티스트</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> 아티스트 추가
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>아티스트 추가 방법</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ArtistSearchTrigger variant="dropdown" />
            <DropdownMenuItem asChild>
              <Link href="/mypage/spotify-sync" className="cursor-pointer">
                🟢 스포티파이 가져오기
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {followedArtists.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
          <h3 className="text-lg font-semibold mb-2">아직 팔로우한 아티스트가 없습니다</h3>
          <p className="text-muted-foreground mb-6">
            좋아하는 아티스트를 추가하고 공연 알림을 받아보세요!
          </p>
          <div className="flex justify-center gap-4">
            <ArtistSearchTrigger variant="button" />
            <Button asChild className="bg-[#1DB954] hover:bg-[#1ed760] text-white border-0">
              <Link href="/mypage/spotify-sync">스포티파이 연동</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {followedArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} isFollowing={true} />
          ))}
        </div>
      )}
    </div>
  );
}
