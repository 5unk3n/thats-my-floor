import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import SpotifyProvider from 'next-auth/providers/spotify';

import { prisma } from '@/shared/lib/prisma';

async function refreshGoogleToken(token: JWT) {
  const url = 'https://oauth2.googleapis.com/token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken!,
    }),
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
    throw refreshedTokens;
  }

  return {
    ...token,
    accessToken: refreshedTokens.access_token,
    accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
  };
}

async function refreshKakaoToken(token: JWT) {
  const url = 'https://kauth.kakao.com/oauth/token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_CLIENT_ID!,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
      refresh_token: token.refreshToken!,
    }),
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
    throw refreshedTokens;
  }

  return {
    ...token,
    accessToken: refreshedTokens.access_token,
    accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
  };
}

async function refreshSpotifyToken(token: JWT) {
  const url = 'https://accounts.spotify.com/api/token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken!,
    }),
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
    throw refreshedTokens;
  }

  return {
    ...token,
    accessToken: refreshedTokens.access_token,
    accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
  };
}

async function refreshAccessToken(token: JWT) {
  try {
    switch (token.provider) {
      case 'google':
        return await refreshGoogleToken(token);
      case 'kakao':
        return await refreshKakaoToken(token);
      case 'spotify':
        return await refreshSpotifyToken(token);
      default:
        return token;
    }
  } catch (error) {
    console.error(`Error refreshing access token for ${token.provider}`, error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - Prisma Adapter type compatibility issue with NextAuth
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            'user-read-email user-read-private user-top-read playlist-modify-public playlist-modify-private streaming user-read-playback-state user-modify-playback-state user-read-currently-playing',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        // Fetch user role from DB
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_in as number) * 1000,
          refreshToken: account.refresh_token,
          provider: account.provider,
          role: dbUser?.role,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.accessTokenExpires = token.accessTokenExpires as number;
      session.user.role = token.role;
      session.error = token.error as string;

      if (token.user) {
        session.user.id = token.user.id as string;
      }

      return session;
    },
  },
};
