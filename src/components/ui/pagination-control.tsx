
import React from 'react';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

export interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export function PaginationControl({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  maxVisiblePages = 5,
}: PaginationControlProps) {
  // No pagination needed if only one page
  if (totalPages <= 1) return null;

  // Calculate the range of pages to show
  const getPageRange = () => {
    // If we have fewer pages than the max visible, show all pages
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate start and end of the range
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    // Adjust if end goes beyond totalPages
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageRange = getPageRange();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}

        {/* First page and ellipsis if needed */}
        {showFirstLast && pageRange[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
            </PaginationItem>
            {pageRange[0] > 2 && (
              <PaginationItem>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            )}
          </>
        )}

        {/* Page numbers */}
        {pageRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink 
              isActive={page === currentPage} 
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Last page and ellipsis if needed */}
        {showFirstLast && pageRange[pageRange.length - 1] < totalPages && (
          <>
            {pageRange[pageRange.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next button */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
