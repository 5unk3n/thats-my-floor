import { PublishStatus } from '@prisma/client';
import { type Metadata } from 'next';
import { Suspense } from 'react';

import { AdminReviewListSkeleton } from '@/entities/concert';
import { AdminReviewListFetcher, runPipelineAction } from '@/features/concerts';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export const metadata: Metadata = {
  title: '공연 등록 관리',
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminReviewsPageProps {
  searchParams: Promise<{
    tab?: string;
    page?: string;
  }>;
}

export default async function AdminReviewsPage(props: AdminReviewsPageProps) {
  const searchParams = await props.searchParams;
  const currentTab = searchParams.tab || 'draft';
  const currentPage = Number(searchParams.page) || 1;

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

      <Tabs defaultValue={currentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="draft" asChild>
            <a href="?tab=draft&page=1">수집</a>
          </TabsTrigger>
          <TabsTrigger value="analyzing" asChild>
            <a href="?tab=analyzing&page=1">분석 중</a>
          </TabsTrigger>
          <TabsTrigger value="reviews" asChild>
            <a href="?tab=reviews&page=1">검토 대기</a>
          </TabsTrigger>
          <TabsTrigger value="published" asChild>
            <a href="?tab=published&page=1">발행 완료</a>
          </TabsTrigger>
          <TabsTrigger value="rejected" asChild>
            <a href="?tab=rejected&page=1">반려</a>
          </TabsTrigger>
        </TabsList>

        {/* 1. 수집 탭 */}
        <TabsContent value="draft" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.DRAFT} page={currentPage} />
          </Suspense>
        </TabsContent>

        {/* 2. 분석 중 탭 */}
        <TabsContent value="analyzing" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.ANALYZING} page={currentPage} />
          </Suspense>
        </TabsContent>

        {/* 3. 검토 탭 */}
        <TabsContent value="reviews" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.REVIEWING} page={currentPage} />
          </Suspense>
        </TabsContent>

        {/* 4. 발행 완료 탭 */}
        <TabsContent value="published" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.PUBLISHED} page={currentPage} />
          </Suspense>
        </TabsContent>

        {/* 5. 반려 탭 */}
        <TabsContent value="rejected" className="space-y-4 mt-4">
          <Suspense fallback={<AdminReviewListSkeleton />}>
            <AdminReviewListFetcher status={PublishStatus.REJECTED} page={currentPage} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
