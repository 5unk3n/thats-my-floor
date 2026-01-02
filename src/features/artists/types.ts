export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  description: string;
  lastfmArtistId: string | null;
}

export interface ParticipatingConcert {
  id: string;
  title: string;
  posterUrl: string;
  startDate: string;
  endDate: string;
  place: string;
  status: string;
}

export interface ArtistDetail extends Artist {
  concerts: ParticipatingConcert[];
}
