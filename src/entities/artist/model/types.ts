export interface Artist {
  id: string | number;
  name: string;
  imageUrl?: string | null;
  mbid?: string;
  externalLinks?: {
    appleMusic?: string;
    spotify?: string;
    youtube?: string;
    melon?: string;
  };
}

export interface ArtistCandidate {
  mbid: string;
  name: string;
  matchedName: string;
  comment: string;
  imageUrl?: string | null;
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
