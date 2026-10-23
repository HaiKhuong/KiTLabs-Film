import { Bookmark, Eye, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/services/movies/types";
import styles from "@/components/common/MovieCard/MovieCard.module.sass";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className={styles.card}>
      <Link
        href={`/phim/${movie.slug}`}
        className={styles.card__media}
        aria-label={`Xem ${movie.title}`}
      >
        <Image
          src={movie.image}
          alt={`Poster phim ${movie.title}`}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 25vw"
        />
        <span className={styles.card__shade} />
        <span className={styles.card__badge}>{movie.isHot ? "HOT" : "MỚI"}</span>
        <span className={styles.card__episodeBadge}>{movie.episode.replace("Đang phát ", "")}</span>
        <span className={styles.card__quality}>{movie.quality}</span>
        <span className={styles.card__bookmark}>
          <Bookmark size={17} />
        </span>
        <span className={styles.card__play}>
          <Play fill="currentColor" />
        </span>
        <span className={styles.card__views}>
          <Eye size={13} /> {movie.views}
        </span>
      </Link>
      <div className="flex flex-col gap-1.5 pt-4">
        <h3 className={styles.card__title}>
          <Link href={`/phim/${movie.slug}`}>{movie.title}</Link>
        </h3>
        <div className="flex items-center justify-between gap-3">
          <span className={styles.card__episode}>{movie.episode}</span>
          <strong className={styles.card__rating}>★ {movie.rating}</strong>
        </div>
      </div>
    </article>
  );
}
