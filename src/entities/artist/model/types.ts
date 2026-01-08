export interface Artist {
  id: string | number;
  name: string;
  image?: string | null;
  imageUrl?: string | null;
  genre?: string;
  description?: string;
  lastfmArtistId?: string | null;
  mbid?: string;
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
