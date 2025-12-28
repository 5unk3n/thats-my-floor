export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  popularity: number;
  followers: { total: number };
  genres: string[];
}

export interface SpotifyFollowedArtistsResponse {
  artists: {
    items: SpotifyArtist[];
    next: string | null;
    total: number;
    cursors: {
      after: string | null;
      before: string | null;
    };
  };
}
