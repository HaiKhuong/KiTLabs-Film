import {
  Camera,
  Maximize,
  PictureInPicture,
  Play,
  SkipForward,
  Sparkles,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/MovieDetailPage/MovieDetailPage.module.sass";

export function MoviePlayerSection({ movie }: { movie: Movie }) {
  return (
    <div className={styles.detail__stage}>
      <div
        className={`${styles.detail__breadcrumb} flex flex-wrap items-center justify-between gap-3`}
      >
        <nav className="flex flex-wrap items-center gap-2" aria-label="Đường dẫn trang">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/#dao-tang">Tu tiên chưởng môn</Link>
          <span>/</span>
          <strong>{movie.title}</strong>
        </nav>
        <span className={styles.detail__live}>
          <i /> 14,320 tiên hữu đang cùng đàm đạo
        </span>
      </div>
      <section className={styles.player} aria-label="Trình phát phim">
        <Image src={movie.backdrop} alt={`Cảnh phim ${movie.title}`} fill priority sizes="100vw" />
        <div className={styles.player__veil} />
        <div className={`${styles.player__top} flex items-center justify-between gap-3`}>
          <span>
            <i /> Tập 120: Vạn Kiếm Trảm Thiên - Ma Hoàng Nghịch Mệnh <b>4K 60FPS</b>
          </span>
          <Button aria-label="Chụp linh ảnh">
            <Camera size={17} />
          </Button>
        </div>
        <Button className={styles.player__button} aria-label={`Phát ${movie.title}`}>
          <Play fill="currentColor" size={34} />
        </Button>
        <div className={styles.player__hud}>
          <div className={`${styles.player__chapter} flex items-center justify-between`}>
            <span>
              Chương: <b>Đại chiến Cửu Long Sơn (28:45)</b>
            </span>
            <span>28:45 / 45:00</span>
          </div>
          <div className={styles.player__timeline}>
            <span />
            <i />
          </div>
          <div className={`${styles.player__controls} flex items-center justify-between gap-5`}>
            <span className="flex items-center gap-3">
              <Play size={20} fill="currentColor" />
              <SkipForward size={20} />
              <b className="hidden sm:block">Tập sau</b>
              <Volume2 className="hidden sm:block" size={19} />
            </span>
            <span className="flex items-center gap-3">
              <b>Thần Tiên 7.1</b>
              <em>
                <Sparkles size={12} /> 4K Ultra
              </em>
              <b>1.25x</b>
              <PictureInPicture className="hidden sm:block" size={18} />
              <Maximize size={19} />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
