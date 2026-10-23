import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import styles from "@/components/common/Pagination/Pagination.module.sass";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = [1, 2, 3, totalPages].filter(
    (page, index, items) => page <= totalPages && items.indexOf(page) === index,
  );
  return (
    <nav className={styles.pagination} aria-label="Phân trang">
      <Button disabled={currentPage === 1} onClick={() => onPageChange?.(currentPage - 1)}>
        <ChevronLeft size={15} /> Trước
      </Button>
      {pages.map((page, index) => (
        <span key={page} className={styles.pagination__group}>
          {index === pages.length - 1 && page > 4 && <i>…</i>}
          <Button
            aria-current={page === currentPage ? "page" : undefined}
            className={
              page === currentPage ? styles["pagination__page--active"] : styles.pagination__page
            }
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </Button>
        </span>
      ))}
      <Button disabled={currentPage === totalPages} onClick={() => onPageChange?.(currentPage + 1)}>
        Sau <ChevronRight size={15} />
      </Button>
    </nav>
  );
}
