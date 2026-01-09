import { notFound } from 'next/navigation';

import { getCachedArtistProfile } from '@/features/artists/model/services/artist-profile.service';
import { ArtistProfile } from '@/features/artists/ui/ArtistProfile';

interface ArtistProfileFetcherProps {
  artistId: Promise<string> | string;
}

export async function ArtistProfileFetcher({ artistId }: ArtistProfileFetcherProps) {
  const id = await artistId;
  const artist = await getCachedArtistProfile(id);

  if (!artist) {
    notFound();
  }

  return <ArtistProfile artist={artist} />;
}
