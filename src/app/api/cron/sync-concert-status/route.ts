import { NextResponse } from 'next/server';

import { SyncService } from '@/features/concerts/server/services/sync-service';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const result = await SyncService.syncAllConcertStatus();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('[Cron] Concert status sync failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
