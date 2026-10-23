import { Bookmark, Download, Play, Share2, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { Tag } from "@/components/common/Tag/Tag";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/MovieDetailPage/MovieDetailPage.module.sass";

export function MovieInfoSection({ movie }: { movie: Movie }) {
  return (
    <section className={`${styles.info} grid gap-8 p-5 md:p-8 lg:grid-cols-[280px_1fr]`}>
      <div className="flex flex-col gap-3">
        <div className={styles.info__poster}>
          <Image
            src={movie.image}
            alt={`Áp phích chính thức của ${movie.title}`}
            fill
            sizes="280px"
          />
          <b>ĐẠI THÀNH VIÊN MÃN</b>
          <span>{movie.quality}</span>
        </div>
        <div className={`${styles.info__stats} grid grid-cols-3`}>
          <span>
            <b>9.9</b>
            <small>85.4K đạo hữu</small>
          </span>
          <span>
            <b>#1</b>
            <small>Bảng tu tiên</small>
          </span>
          <span>
            <b>120</b>
            <small>Tập hoàn tất</small>
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-4">
        <div>
          <p className={styles.info__kicker}>THIÊN ĐẠO ĐỘC QUYỀN • NĂM PHÁT HÀNH {movie.year}</p>
          <h1>{movie.title}</h1>
          <p className={styles.info__subtitle}>{movie.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <Tag key={genre} className={styles.info__chip}>
              {genre}
            </Tag>
          ))}
          <Tag className={styles.info__chip}>Trọn bộ 120 tập</Tag>
          <Tag className={styles.info__vip}>VIP 4K</Tag>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className={styles.info__primary}>
            <Play size={18} fill="currentColor" /> Đang xem: Tập 120
          </Button>
          <Button className={styles.info__action}>
            <Star size={17} /> Đánh giá
          </Button>
          <Button className={styles.info__action}>
            <Bookmark size={17} /> Lưu phim
          </Button>
          <Button className={styles.info__icon} aria-label="Chia sẻ phim">
            <Share2 size={18} />
          </Button>
          <Button className={styles.info__icon} aria-label="Tải phim">
            <Download size={18} />
          </Button>
        </div>
        <div className={styles.info__synopsis}>
          <strong>Cương yếu nội dung</strong>
          <p>
            {movie.description} Trải qua nghịch cảnh và những trận chiến rung chuyển tam giới, chàng
            từng bước tìm lại chân tướng đã bị vùi lấp.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <dt>Đạo diễn</dt>
            <dd>Chen Yu</dd>
          </div>
          <div>
            <dt>Chủ diễn</dt>
            <dd>Yang Yang, Lạc Vân Hải</dd>
          </div>
          <div>
            <dt>Thể loại</dt>
            <dd>Tiên hiệp, huyền huyễn</dd>
          </div>
          <div>
            <dt>Sản xuất</dt>
            <dd>Xianxia Studios</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
