import { notFound } from 'next/navigation';

import { ArtistProfile } from '@/features/artists/components/ArtistProfile';
import { getArtistProfile } from '@/features/artists/server/db';

interface ArtistProfileFetcherProps {
  artistId: Promise<string> | string;
}

export async function ArtistProfileFetcher({ artistId }: ArtistProfileFetcherProps) {
  const id = await artistId;
  const artist = await getArtistProfile(id);

  if (!artist) {
    notFound();
  }

  return <ArtistProfile artist={artist} />;
}
