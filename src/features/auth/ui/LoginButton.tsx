'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/shared/ui/button';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">로그인된 계정: {session.user?.email}</p>
        <Button variant="outline" onClick={() => signOut()}>
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        onClick={() => signIn('kakao', { callbackUrl: '/' })}
        className="h-11 w-full bg-[#FEE500] text-base font-medium text-[#191919] hover:bg-[#FEE500]/90"
      >
        카카오로 시작하기
      </Button>
      <Button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        variant="outline"
        className="h-11 w-full border-zinc-200 text-base font-medium text-zinc-700 hover:bg-zinc-50"
      >
        구글로 시작하기
      </Button>
    </div>
  );
}
