import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { ArtistService } from '@/entities/artist';
import { getCachedArtistProfile } from '@/features/artists/model/services/artist-profile.service';
import { ArtistProfile } from '@/features/artists/ui/ArtistProfile';
import { authOptions } from '@/shared/lib/auth';

interface ArtistProfileFetcherProps {
  mbid: Promise<string> | string;
}

export async function ArtistProfileFetcher({ mbid: artistId }: ArtistProfileFetcherProps) {
  const id = await artistId;
  const artist = await getCachedArtistProfile(id);

  if (!artist) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  let isFollowing = false;

  if (session?.user?.id && artist.mbid) {
    isFollowing = await ArtistService.getArtistFollowStatus(session.user.id, artist.mbid);
  }

  return <ArtistProfile artist={artist} isFollowing={isFollowing} />;
}
