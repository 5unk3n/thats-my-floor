import { Artist } from '@/entities/artist';
import { Concert } from '@/entities/concert';

export interface SearchResult {
  concerts: SearchConcert[];
  artists: SearchArtist[];
}

export interface SearchConcert extends Omit<
  Concert,
  'startDate' | 'endDate' | 'posterUrl' | 'status'
> {
  posterUrl: string | null;
  startDate: Date;
  endDate: Date;
  status: string | null;
}

export interface SearchArtist extends Pick<Artist, 'name' | 'image'> {
  id: string;
}
