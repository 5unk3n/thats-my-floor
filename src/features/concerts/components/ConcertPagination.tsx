'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/shared/components/ui/button';

interface ConcertPaginationProps {
  hasMore: boolean;
}

export function ConcertPagination({ hasMore }: ConcertPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex justify-center gap-2">
      <Button variant="outline" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
        이전
      </Button>
      <span className="flex items-center px-4 text-sm font-medium">Page {page}</span>
      <Button variant="outline" onClick={() => handlePageChange(page + 1)} disabled={!hasMore}>
        다음
      </Button>
    </div>
  );
}
