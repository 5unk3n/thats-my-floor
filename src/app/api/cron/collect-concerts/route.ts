import { NextResponse } from 'next/server';

import * as CollectorService from '@/features/concerts/server/services/collector.service';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const newConcerts = await CollectorService.collectConcerts();
    return NextResponse.json({ success: true, count: newConcerts.length });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
