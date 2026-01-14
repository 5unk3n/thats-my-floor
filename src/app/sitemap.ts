import { type MetadataRoute } from 'next';

import { ArtistRepository } from '@/entities/artist';
import { ConcertRepository } from '@/entities/concert';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://thatsmyfloor.com';

  // 1. Static Routes
  const routes = ['', '/concerts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // 2. Dynamic Routes: Concerts
  const concerts = await ConcertRepository.findConcertsForSitemap();
  const concertRoutes = concerts.map((concert) => ({
    url: `${baseUrl}/concerts/${concert.id}`,
    lastModified: concert.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Dynamic Routes: Artists
  const artists = await ArtistRepository.findArtistsForSitemap();
  const artistRoutes = artists.map((artist) => ({
    url: `${baseUrl}/artists/${artist.mbid}`,
    lastModified: artist.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...concertRoutes, ...artistRoutes];
}
