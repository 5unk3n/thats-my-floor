import { LoginButton } from '@/features/auth/components/login-button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Concert Notification Service</h1>
      <LoginButton />
      <div className="mt-4">
        <a href="/concerts" className="text-blue-500 hover:underline">
          공연 목록 보기
        </a>
      </div>
    </main>
  );
}
