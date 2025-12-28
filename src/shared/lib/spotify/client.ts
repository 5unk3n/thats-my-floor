import { SpotifyArtist, SpotifyFollowedArtistsResponse,SpotifyTokenResponse } from './types';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';

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
    const list = await this.searchArtists(query, 1);
    return list[0] || null;
  }

  /**
   * Search Artists by Query (Multi)
   */
  static async searchArtists(query: string, limit = 5): Promise<SpotifyArtist[]> {
    const token = await this.getAccessToken();
    if (!token) return [];

    try {
      // Search for the artist
      const params = new URLSearchParams({
        q: query,
        type: 'artist',
        limit: limit.toString(),
      });

      const response = await fetch(`${SPOTIFY_SEARCH_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) return [];

      const data = await response.json();
      return (data.artists?.items as SpotifyArtist[]) || [];
    } catch (error) {
      console.error(`Spotify Search Error for "${query}":`, error);
      return [];
    }
  }
  /**
   * Get User's Followed Artists
   * Requires User Access Token (Scope: user-follow-read)
   */
  static async getFollowedArtists(
    accessToken: string,
    limit = 20,
    after?: string
  ): Promise<SpotifyFollowedArtistsResponse | null> {
    try {
      const params = new URLSearchParams({
        type: 'artist',
        limit: limit.toString(),
      });

      if (after) {
        params.append('after', after);
      }

      const response = await fetch(`https://api.spotify.com/v1/me/following?${params.toString()}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        console.error(`Spotify Followed Artists Error: ${response.status} ${response.statusText}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get followed artists:', error);
      return null;
    }
  }
}
