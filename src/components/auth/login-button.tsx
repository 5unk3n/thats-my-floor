'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Signed in as {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={() => signIn('google')}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn('kakao')}
        className="rounded bg-yellow-400 px-4 py-2 text-black hover:bg-yellow-500"
      >
        Sign in with Kakao
      </button>
    </div>
  );
}
