import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { FollowedArtistsFetcher } from '@/features/artists/components/FollowedArtistsFetcher';
import { FollowedArtistsSkeleton } from '@/features/artists/components/skeletons/FollowedArtistsSkeleton';
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

export default function FollowedArtistsPage() {
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

      <Suspense fallback={<FollowedArtistsSkeleton />}>
        <FollowedArtistsFetcher />
      </Suspense>
    </div>
  );
}
