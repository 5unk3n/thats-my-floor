'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  siblingCount?: number;
  className?: string;
}

export function Pagination({ total, page, limit, siblingCount = 1, className }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  // Helper to create URL for a page
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate pagination range
  const paginationRange = () => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, 'DOTS', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);

      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }
  };

  const pages = paginationRange();

  if (page === 0 || totalPages < 2) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={page <= 1}
        asChild={page > 1}
      >
        {page > 1 ? (
          <Link href={createPageUrl(page - 1)} aria-label="Go to previous page">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-hidden="true">
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {pages?.map((pageNumber, i) => {
        if (pageNumber === 'DOTS') {
          return (
            <Button
              key={`dots-${i}`}
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-default hover:bg-transparent"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }

        return (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            asChild
          >
            <Link href={createPageUrl(pageNumber)}>{pageNumber}</Link>
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={page >= totalPages}
        asChild={page < totalPages}
      >
        {page < totalPages ? (
          <Link href={createPageUrl(page + 1)} aria-label="Go to next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}
