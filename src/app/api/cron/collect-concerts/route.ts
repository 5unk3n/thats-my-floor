import { NextResponse } from 'next/server';

import * as CollectorService from '@/features/concerts/server/services/collector.service';
import * as notificationService from '@/features/notifications/server/services/notification.service';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const newConcerts = await CollectorService.collectConcerts();

    for (const concert of newConcerts) {
      // Attempt to notify. Service checks internally if there are linked artists.
      await notificationService.notifyConcertRegistration(concert.id);
    }

    return NextResponse.json({ success: true, count: newConcerts.length });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
