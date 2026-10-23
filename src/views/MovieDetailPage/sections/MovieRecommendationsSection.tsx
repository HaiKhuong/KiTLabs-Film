import Link from "next/link";
import { MovieCard } from "@/components/common/MovieCard/MovieCard";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/MovieDetailPage/MovieDetailPage.module.sass";

export function MovieRecommendationsSection({ movies }: { movies: Movie[] }) {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <span className={styles.info__kicker}>CÙNG CHUNG TIÊN DUYÊN</span>
          <h3 className={styles.detail__heading}>Có thể đạo hữu sẽ thích</h3>
        </div>
        <Link href="/#dao-tang" className={styles.detail__more}>
          Xem thêm
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {movies.slice(0, 4).map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </section>
  );
}
