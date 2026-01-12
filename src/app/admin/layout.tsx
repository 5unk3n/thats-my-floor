import { Suspense } from 'react';

import AuthChecker from '@/features/auth/ui/AuthChecker';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuthChecker>{children}</AuthChecker>
    </Suspense>
  );
}
