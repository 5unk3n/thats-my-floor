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
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>
      <LoginButton />
    </div>
  );
}
