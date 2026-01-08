import { notFound } from 'next/navigation';

import { getArtistProfile } from '@/features/artists/model/services/artist.service';
import { ArtistProfile } from '@/features/artists/ui/ArtistProfile';

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
