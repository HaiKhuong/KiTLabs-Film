import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import { MovieCard } from "@/components/common/MovieCard/MovieCard";
import { Pagination } from "@/components/common/Pagination/Pagination";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/HomePage/HomePage.module.sass";

const genres = [
  "Tất cả",
  "Tu tiên chưởng môn",
  "Kiếm đạo đỉnh phong",
  "Cơ giáp tiên hiệp",
  "Trọng sinh báo thù",
  "Xuyên không dị giới",
  "Huyền huyễn tu chân",
  "Đan đạo dị hỏa",
];

export function MovieCatalogSection({ movies }: { movies: Movie[] }) {
  return (
    <section id="dao-tang" className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 lg:px-12">
      <div
        className={`${styles.filters} flex items-center gap-2 overflow-x-auto border-b border-[#e7e2d7] pb-4`}
      >
        <div className="flex flex-1 gap-2">
          {genres.map((genre, index) => (
            <Button
              key={genre}
              className={index === 0 ? styles["filters__item--active"] : styles.filters__item}
            >
              {index === 0 && <i />}
              {genre}
            </Button>
          ))}
        </div>
        <Button className={styles.filters__sort}>
          <SlidersHorizontal size={14} /> Sắp xếp: Mới nhất <ChevronRight size={13} />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies.slice(0, 12).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={1} totalPages={12} />
    </section>
  );
}
