import { ArtistCandidate } from '@/entities/artist';
import { Concert } from '@/entities/concert';

export interface SearchResult {
  concerts: SearchConcert[];
  artists: ArtistCandidate[];
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
