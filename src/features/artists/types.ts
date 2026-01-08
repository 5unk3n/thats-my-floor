import { Artist as PrismaArtist } from '@prisma/client';

export interface Artist extends PrismaArtist {
  name: string;
  genre?: string;
  image?: string;
  lastfmArtistId?: string; // Kept for compatibility if needed, though likely replaced by mbid
}
