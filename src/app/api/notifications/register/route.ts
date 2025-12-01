import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { token, platform = 'web' } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Upsert device token
    const device = await prisma.userDevice.upsert({
      where: {
        fcmToken: token,
      },
      update: {
        userId: session.user.id,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        fcmToken: token,
        platform,
      },
    });

    return NextResponse.json({ success: true, device });
  } catch (error) {
    console.error('Failed to register FCM token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
