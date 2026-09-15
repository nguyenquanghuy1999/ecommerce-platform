"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { cn } from "@/src/lib/utils";
import { Product } from "@/src/types";
import { useSearchParams } from "next/navigation";

export default function CategoryPagination({
  products,
}: {
  products: Product[];
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number, shouldScroll = true) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    window.history.pushState(null, "", `?${params.toString()}`);
    if (shouldScroll) {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <Pagination>
      <PaginationContent className="cursor-pointer">
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              createPageUrl(Math.max(1, currentPage - 1), currentPage !== 1)
            }
            className={cn(
              "hover:bg-white",
              currentPage === 1 &&
                "cursor-default text-gray-500 hover:text-gray-500 active:translate-y-0!",
            )}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page} onClick={() => createPageUrl(page)}>
              <PaginationLink
                isActive={page === currentPage}
                className={cn(
                  "hover:bg-primary-light hover:text-white",
                  page === currentPage &&
                    "bg-primary hover:bg-primary text-white hover:text-white",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              createPageUrl(
                Math.min(totalPages, currentPage + 1),
                currentPage !== totalPages,
              )
            }
            className={cn(
              "hover:bg-white",
              currentPage === totalPages &&
                "cursor-default text-gray-500 hover:text-gray-500 active:translate-y-0!",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
