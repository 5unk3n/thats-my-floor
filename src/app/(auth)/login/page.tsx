import { type Metadata } from 'next';

import { LoginButton } from '@/features/auth';

export const metadata: Metadata = {
  title: '로그인',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-10">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">로그인</h1>
          <p className="text-muted-foreground">SNS 계정으로 간편하게 시작하세요</p>
        </div>
        <LoginButton />
      </div>
    </div>
  );
}
