import { PublishStatus } from '@prisma/client';
import { type Metadata } from 'next';
import { Suspense } from 'react';

import { AdminReviewListSkeleton } from '@/entities/concert/ui/skeletons/AdminReviewListSkeleton';
import { AdminReviewListFetcher, runPipelineAction } from '@/features/concerts';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

export const metadata: Metadata = {
  title: '공연 등록 관리',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminReviewsPage() {
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
          <TabsTrigger value="draft">수집</TabsTrigger>
          <TabsTrigger value="analyzing">분석 중</TabsTrigger>
          <TabsTrigger value="reviews">검토 대기</TabsTrigger>
          <TabsTrigger value="published">발행 완료</TabsTrigger>
          <TabsTrigger value="rejected">반려</TabsTrigger>
        </TabsList>

        {/* 1. 수집 탭 */}
        <TabsContent value="draft" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.DRAFT} />
          </Suspense>
        </TabsContent>

        {/* 2. 분석 중 탭 */}
        <TabsContent value="analyzing" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.ANALYZING} />
          </Suspense>
        </TabsContent>

        {/* 3. 검토 탭 */}
        <TabsContent value="reviews" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.REVIEWING} />
          </Suspense>
        </TabsContent>

        {/* 4. 발행 완료 탭 */}
        <TabsContent value="published" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.PUBLISHED} />
          </Suspense>
        </TabsContent>

        {/* 5. 반려 탭 */}
        <TabsContent value="rejected" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.REJECTED} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
