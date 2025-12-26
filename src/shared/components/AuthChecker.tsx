import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export default async function AuthChecker({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // 1. Check if user is authenticated
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/admin');
  }

  // 2. Check if user has admin role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== 'ADMIN') {
    redirect('/');
  }

  return <>{children}</>;
}
