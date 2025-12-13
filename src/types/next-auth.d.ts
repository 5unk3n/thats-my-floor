import { UserRole } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    error?: string;
    user: {
      id: string;
      role?: UserRole;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    role?: UserRole;
    user?: {
      id?: string;
    };
  }
}
