import ArtistCard from '@/features/artists/components/ArtistCard';
import { getFollowedArtists } from '@/features/artists/server/actions';

export const metadata = {
  title: '팔로우한 아티스트 | 공연 알림 서비스',
  description: '내가 팔로우한 아티스트 목록입니다.',
};

export default async function FollowedArtistsPage() {
  const followedArtists = await getFollowedArtists();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">팔로우한 아티스트</h1>

      {followedArtists.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>아직 팔로우한 아티스트가 없습니다.</p>
          <p className="mt-2">좋아하는 아티스트를 찾아보세요!</p>
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
