export interface SearchResult {
  concerts: SearchConcert[];
  artists: SearchArtist[];
}

export interface SearchConcert {
  id: string;
  title: string;
  posterUrl: string | null;
  startDate: Date;
  endDate: Date;
  place: string;
  status: string | null;
}

export interface SearchArtist {
  id: string;
  name: string;
  image: string | null;
}
