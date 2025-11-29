'use client';

import { useRouter, useSearchParams } from 'next/navigation';

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
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        이전
      </button>
      <span className="flex items-center px-4 text-sm font-medium">Page {page}</span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasMore}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        다음
      </button>
    </div>
  );
}
