import { PublishStatus } from '@prisma/client';
import { Metadata } from 'next';

import { runPipelineAction } from '@/features/concerts/server/actions';
import { ConcertReviewCard } from '@/features/concerts/components/admin/ConcertReviewCard';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { prisma } from '@/shared/lib/prisma';

export const metadata: Metadata = {
  title: '공연 AI 리뷰 | 관리자',
};

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  // Fetch Drafts (Collection)
  const drafts = await prisma.concert.findMany({
    where: { publishStatus: PublishStatus.DRAFT },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  // Fetch Analyzing (In Progress)
  const analyzing = await prisma.concert.findMany({
    where: {
      publishStatus: PublishStatus.ANALYZING,
    },
    orderBy: { updatedAt: 'desc' },
  });

  // Fetch Reviews (Scanning Complete)
  const reviews = await prisma.concert.findMany({
    where: { publishStatus: PublishStatus.REVIEWING },
    orderBy: { updatedAt: 'desc' },
  });

  // Fetch Published (Completed)
  const published = await prisma.concert.findMany({
    where: { publishStatus: PublishStatus.PUBLISHED },
    orderBy: { updatedAt: 'desc' },
    take: 50,
    include: { artists: { include: { artist: true } } }, // Updated include
  });

  // Fetch Rejected
  const rejected = await prisma.concert.findMany({
    where: { publishStatus: PublishStatus.REJECTED },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">공연 AI 분석 파이프라인</h1>
        <form
          action={async () => {
            'use server';
            await runPipelineAction();
          }}
        >
          <Button variant="secondary" type="submit">
            분석 작업 실행 (수동 트리거)
          </Button>
        </form>
      </div>

      <Tabs defaultValue="draft" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="draft">수집 ({drafts.length})</TabsTrigger>
          <TabsTrigger value="analyzing">분석 중 ({analyzing.length})</TabsTrigger>
          <TabsTrigger value="reviews">검토 대기 ({reviews.length})</TabsTrigger>
          <TabsTrigger value="published">발행 완료 ({published.length})</TabsTrigger>
          <TabsTrigger value="rejected">반려 ({rejected.length})</TabsTrigger>
        </TabsList>

        {/* 1. 수집 탭 */}
        <TabsContent value="draft" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {drafts.map((concert) => (
              <ConcertReviewCard key={concert.id} concert={concert} mode="draft" />
            ))}
            {drafts.length === 0 && (
              <p className="text-muted-foreground p-4">수집된 공연이 없습니다.</p>
            )}
          </div>
        </TabsContent>

        {/* 2. 분석 중 탭 */}
        <TabsContent value="analyzing" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {analyzing.map((concert) => (
              <div key={concert.id} className="p-4 border rounded shadow-sm opacity-70">
                <h3 className="font-bold">{concert.prfnm}</h3>
                <p className="text-sm text-gray-500">상태: {concert.publishStatus}</p>
              </div>
            ))}
            {analyzing.length === 0 && (
              <p className="text-muted-foreground p-4">진행 중인 작업이 없습니다.</p>
            )}
          </div>
        </TabsContent>

        {/* 3. 검토 탭 */}
        <TabsContent value="reviews" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((concert) => (
              <ConcertReviewCard key={concert.id} concert={concert} mode="review" />
            ))}
            {reviews.length === 0 && (
              <p className="text-muted-foreground p-4">검토 대기 중인 항목이 없습니다.</p>
            )}
          </div>
        </TabsContent>

        {/* 4. 발행 완료 탭 */}
        <TabsContent value="published" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {published.map((concert) => (
              <div key={concert.id} className="p-4 border rounded shadow-sm bg-green-50">
                <h3 className="font-bold text-sm">{concert.prfnm}</h3>
                <p className="text-xs text-gray-600">
                  🎤 {concert.artists.map((a) => a.artist.name).join(', ') || '알 수 없음'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {new Date(concert.prfpdfrom).toLocaleDateString()}
                </p>
              </div>
            ))}
            {published.length === 0 && (
              <p className="text-muted-foreground p-4">발행된 공연이 없습니다.</p>
            )}
          </div>
        </TabsContent>

        {/* 5. 반려 탭 */}
        <TabsContent value="rejected" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {rejected.map((concert) => (
              <div key={concert.id} className="p-4 border rounded shadow-sm bg-gray-100 opacity-60">
                <h3 className="font-bold text-sm">{concert.prfnm}</h3>
                <p className="text-xs text-gray-500">❌ 반려됨</p>
              </div>
            ))}
            {rejected.length === 0 && (
              <p className="text-muted-foreground p-4">반려된 항목이 없습니다.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
