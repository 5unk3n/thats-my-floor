const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  popularity: number;
  followers: { total: number };
  genres: string[];
}

export class SpotifyService {
  private static clientId = process.env.SPOTIFY_CLIENT_ID;
  private static clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  private static accessToken: string | null = null;
  private static tokenExpiresAt: number = 0;

  /**
   * Get valid Client Credentials Token
   */
  private static async getAccessToken(): Promise<string | null> {
    if (!this.clientId || !this.clientSecret) {
      console.warn('SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing.');
      return null;
    }

    // Return cached token if valid (with 60s buffer)
    if (this.accessToken && Date.now() < this.tokenExpiresAt - 60000) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error(`Spotify Token Error: ${response.statusText}`);
      }

      const data: SpotifyTokenResponse = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiresAt = Date.now() + data.expires_in * 1000;

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Spotify access token:', error);
      return null;
    }
  }

  /**
   * Search Artist by Query
   */
  static async searchArtist(query: string): Promise<SpotifyArtist | null> {
    const token = await this.getAccessToken();
    if (!token) return null;

    try {
      // Search for the artist
      const params = new URLSearchParams({
        q: query,
        type: 'artist',
        limit: '1', // We define "Search" here as finding the best match for a specific name
      });

      const response = await fetch(`${SPOTIFY_SEARCH_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) return null;

      const data = await response.json();
      const artists = data.artists?.items as SpotifyArtist[];

      if (artists && artists.length > 0) {
        return artists[0];
      }
      return null;
    } catch (error) {
      console.error(`Spotify Search Error for "${query}":`, error);
      return null;
    }
  }
}
