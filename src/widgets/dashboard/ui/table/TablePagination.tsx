"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type TablePaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
};

const TablePagination = ({
  page,
  pageSize,
  totalItems,
  itemLabel = "items",
  onPageChange,
}: TablePaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const firstItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.07] px-3 py-3 text-[10px] text-muted-foreground sm:px-4">
      <span>
        Showing {firstItem} to {lastItem} of {totalItems} {itemLabel}
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-black/[0.07] transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
              className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[10px] font-medium transition ${
                pageNumber === page
                  ? "bg-primary text-white"
                  : "border border-black/[0.07] hover:bg-muted"
              }`}
            >
              {pageNumber}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-black/[0.07] transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export { TablePagination };
