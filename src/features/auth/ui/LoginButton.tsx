'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/shared/ui/button';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Signed in as {session.user?.email}</p>
        <Button variant="destructive" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Button onClick={() => signIn('google')} className="bg-blue-500 hover:bg-blue-600">
        Sign in with Google
      </Button>
      <Button
        onClick={() => signIn('kakao')}
        className="bg-yellow-400 text-black hover:bg-yellow-500"
      >
        Sign in with Kakao
      </Button>
    </div>
  );
}
