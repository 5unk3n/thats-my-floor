const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export class SpotifyClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || '';
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';

    if (!this.clientId || !this.clientSecret) {
      console.warn('Spotify API keys are missing. Please check your .env file.');
    }
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.accessToken && this.tokenExpiresAt > now) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

    try {
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error(`Failed to get Spotify token: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      // Set expiration 1 minute earlier than actual to be safe
      this.tokenExpiresAt = now + (data.expires_in - 60) * 1000;

      return this.accessToken!;
    } catch (error) {
      console.error('Failed to get Spotify access token:', error);
      throw error;
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getAccessToken();
    const url = `${SPOTIFY_API_URL}${endpoint}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    let response = await fetch(url, { ...options, headers });

    // Handle Rate Limiting (429)
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '1', 10);
      console.warn(`[SpotifyClient] Rate limit hit. Retrying after ${retryAfter}s...`);

      await new Promise((resolve) => setTimeout(resolve, (retryAfter + 1) * 1000));

      response = await fetch(url, { ...options, headers });
    }

    if (!response.ok) {
      throw new Error(`Spotify API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  public async getArtistImage(spotifyId: string): Promise<string | null> {
    try {
      const data = await this.request<{ images: { url: string }[] }>(`/artists/${spotifyId}`);
      const images = data.images;

      if (images && images.length > 0) {
        return images[0].url;
      }
      return null;
    } catch (error) {
      console.error(`Failed to fetch Spotify artist ${spotifyId}:`, error);
      return null;
    }
  }
}

export const spotifyClient = new SpotifyClient();
