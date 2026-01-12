import { createHash } from 'crypto';

import {
  LastFmArtistInfoResponse,
  LastFmArtistSearchResponse,
  LastFmErrorResponse,
  LastFmSessionResponse,
  LastFmUserTopArtistsResponse,
} from './types';

const LASTFM_API_URL = 'http://ws.audioscrobbler.com/2.0/';

export class LastFmClient {
  private apiKey: string;
  private sharedSecret: string;

  constructor() {
    this.apiKey = process.env.LASTFM_API_KEY || '';
    this.sharedSecret = process.env.LASTFM_SHARED_SECRET || '';

    if (!this.apiKey || !this.sharedSecret) {
      console.warn('Last.fm API keys are missing. Please check your .env file.');
    }
  }

  /**
   * Generates the API signature required for authenticated calls.
   * Signature is an MD5 hash of "paramName+paramValue" pairs (sorted) + Shared Secret.
   */
  private generateSignature(params: Record<string, string>): string {
    const sortedKeys = Object.keys(params).sort();
    let signatureString = '';

    for (const key of sortedKeys) {
      signatureString += key + params[key];
    }

    signatureString += this.sharedSecret;

    return createHash('md5').update(signatureString).digest('hex');
  }

  /**
   * Generic method to fetch data from Last.fm API
   */
  private async fetch<T>(
    method: string,
    params: Record<string, string> = {},
    signed: boolean = false
  ): Promise<T | null> {
    try {
      const urlParams = new URLSearchParams({
        method,
        api_key: this.apiKey,
        format: 'json',
        ...params,
      });

      if (signed) {
        urlParams.append(
          'api_sig',
          this.generateSignature({
            method,
            api_key: this.apiKey,
            ...params,
          })
        );
      }

      const response = await fetch(`${LASTFM_API_URL}?${urlParams.toString()}`, {
        method: 'GET', // Last.fm uses GET for most calls including signed ones
      });

      if (!response.ok) {
        throw new Error(`Last.fm API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if ((data as LastFmErrorResponse).error) {
        throw new Error(`Last.fm API Error: ${(data as LastFmErrorResponse).message}`);
      }

      return data as T;
    } catch (error) {
      console.error(`Last.fm request failed (${method}):`, error);
      return null;
    }
  }

  /**
   * Search for an artist by name
   */
  async searchArtist(
    artist: string,
    limit: number = 5
  ): Promise<LastFmArtistSearchResponse | null> {
    return this.fetch<LastFmArtistSearchResponse>('artist.search', {
      artist,
      limit: limit.toString(),
    });
  }

  /**
   * Get detailed information about an artist by MBID or Name
   */
  async getArtistInfo(params: {
    mbid?: string;
    artist?: string;
  }): Promise<LastFmArtistInfoResponse | null> {
    const queryParams: Record<string, string> = {};
    if (params.mbid) queryParams.mbid = params.mbid;
    if (params.artist) queryParams.artist = params.artist;

    if (Object.keys(queryParams).length === 0) {
      throw new Error('Either mbid or artist name must be provided');
    }

    // Add autocorrect for better name matching
    queryParams.autocorrect = '1';

    return this.fetch<LastFmArtistInfoResponse>('artist.getInfo', queryParams);
  }

  /**
   * Exchange an authentication token for a session key
   */
  async getSession(token: string): Promise<LastFmSessionResponse | null> {
    return this.fetch<LastFmSessionResponse>('auth.getSession', { token }, true);
  }

  /**
   * Get User's Top Artists
   */
  async getUserTopArtists(
    user: string,
    limit: number = 50,
    period: 'overall' | '7day' | '1month' | '3month' | '6month' | '12month' = 'overall'
  ): Promise<LastFmUserTopArtistsResponse | null> {
    return this.fetch<LastFmUserTopArtistsResponse>('user.getTopArtists', {
      user,
      limit: limit.toString(),
      period,
    });
  }
}

export const lastFmClient = new LastFmClient();
