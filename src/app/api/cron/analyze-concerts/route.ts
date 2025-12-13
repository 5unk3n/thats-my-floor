import { NextResponse } from 'next/server';

import { AnalysisService } from '@/features/concerts/server/services/analysis.service';

/**
 * Cron endpoint for running the concert-artist analysis pipeline.
 * This should be called periodically to process concerts in ANALYZING_REQUEST status.
 *
 * Expected to be triggered by external cron service (e.g., cron-job.org, GitHub Actions, etc.)
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const results = await AnalysisService.runAnalysisPipeline(undefined, 5);

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    console.log(`[Cron] Analysis pipeline completed: ${successCount} success, ${failCount} failed`);

    return NextResponse.json({
      success: true,
      processed: results.length,
      successCount,
      failCount,
    });
  } catch (error) {
    console.error('Analysis pipeline cron job failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
