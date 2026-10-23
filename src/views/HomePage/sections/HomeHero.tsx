import { BookmarkPlus, Eye, Play, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import { Tag } from "@/components/common/Tag/Tag";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/HomePage/HomePage.module.sass";

export function HomeHero({ hero, thumbnails }: { hero: Movie; thumbnails: Movie[] }) {
  return (
    <section className={`${styles.hero} flex items-center`} aria-labelledby="hero-title">
      <Image
        src={hero.backdrop}
        alt={`Khung cảnh điện ảnh của ${hero.title}`}
        fill
        priority
        sizes="100vw"
        className={styles.hero__image}
      />
      <div className={styles.hero__veil} />
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] px-4 pb-12 pt-28 md:px-8 lg:px-12 lg:pt-36">
        <div className="flex max-w-[650px] flex-col items-start gap-4">
          <div className="flex flex-wrap gap-2">
            <Tag className={styles.hero__vip}>
              <Sparkles size={14} /> Độc quyền 4K HDR
            </Tag>
            {hero.genres.map((genre) => (
              <Tag key={genre} className={styles.hero__tag}>
                {genre}
              </Tag>
            ))}
            <Tag className={styles.hero__tag}>Cơ giáp tiên hiệp</Tag>
            <Tag className={styles.hero__chapter}>Chương mới: Tập 142</Tag>
          </div>
          <div>
            <p className={styles.hero__eyebrow}>THIÊN ĐẠO ĐỘC QUYỀN • 2024</p>
            <h1 id="hero-title">{hero.title}</h1>
            <p className={styles.hero__copy}>{hero.description}</p>
          </div>
          <div className={`${styles.hero__meta} flex flex-wrap items-center gap-3`}>
            <span>
              <Star size={16} fill="currentColor" /> {hero.rating}/10
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> 120 triệu lượt ngự lãm
            </span>
            <span>•</span>
            <span>4K Ultra Vision</span>
            <span>•</span>
            <span>Dolby Atmos</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/phim/${hero.slug}`} className={styles.hero__primary}>
              <Play size={19} fill="currentColor" /> Xem ngay ({hero.episode})
            </Link>
            <Button className={styles.hero__secondary}>
              <BookmarkPlus size={18} /> Lưu đạo tàng
            </Button>
          </div>
        </div>
        <div className={`${styles.hero__thumbs} hidden items-center gap-3 lg:flex`}>
          {thumbnails.map((movie) => (
            <div key={movie.id}>
              <Image src={movie.image} alt={`Ảnh thu nhỏ ${movie.title}`} fill sizes="64px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
