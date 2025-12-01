import { Setlist as PrismaSetlist, SetlistTrack as PrismaSetlistTrack } from '@prisma/client';

export type Setlist = PrismaSetlist & {
  tracks: SetlistTrack[];
};

export type SetlistTrack = PrismaSetlistTrack;

export interface CreateSetlistInput {
  concertId: string;
  artistId: string;
  date: Date;
  venue: string;
  tracks: CreateSetlistTrackInput[];
}

export interface CreateSetlistTrackInput {
  title: string;
  orderNumber: number;
  spotifyTrackId?: string;
  duration?: number;
}
