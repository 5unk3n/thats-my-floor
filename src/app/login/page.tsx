import { LoginButton } from '@/components/auth/login-button';

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
