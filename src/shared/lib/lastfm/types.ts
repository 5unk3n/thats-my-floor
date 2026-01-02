export interface LastFmImage {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
}

export interface LastFmTag {
  name: string;
  url: string;
}

export interface LastFmBio {
  links: {
    link: {
      '#text': string;
      rel: string;
      href: string;
    };
  };
  published: string;
  summary: string;
  content: string;
}

export interface LastFmArtist {
  name: string;
  mbid?: string;
  url: string;
  image: LastFmImage[];
  streamable: string;
  ontour: string;
  stats?: {
    listeners: string;
    playcount: string;
  };
  similar?: {
    artist: LastFmArtist[];
  };
  tags?: {
    tag: LastFmTag[];
  };
  bio?: LastFmBio;
}

export interface LastFmArtistSearchResponse {
  results: {
    'opensearch:Query': {
      '#text': string;
      role: string;
      startPage: string;
    };
    'opensearch:totalResults': string;
    'opensearch:startIndex': string;
    'opensearch:itemsPerPage': string;
    artistmatches: {
      artist: LastFmArtist[];
    };
  };
}

export interface LastFmArtistInfoResponse {
  artist: LastFmArtist;
}

export interface LastFmSession {
  name: string;
  key: string;
  subscriber: number;
}

export interface LastFmSessionResponse {
  session: LastFmSession;
}

export interface LastFmErrorResponse {
  error: number;
  message: string;
}
