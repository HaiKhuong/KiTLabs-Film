import { Diamond, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/HomePage/HomePage.module.sass";

const cultivators = [
  ["Bắc Minh Kiếm Tiên", "Đại Thừa Viên Mãn", "1,420 giờ"],
  ["Thanh Vân Đạo Trưởng", "Hóa Thần Tầng 9", "1,180 giờ"],
  ["Thái Hư Chân Nhân", "Nguyên Anh Đỉnh Phong", "940 giờ"],
];

export function HomeRankingSection({ movies }: { movies: Movie[] }) {
  return (
    <section
      id="linh-thach"
      className={`${styles.ranking} mx-auto grid max-w-[1440px] gap-8 px-4 py-12 md:px-8 lg:grid-cols-10 lg:px-12`}
    >
      <div className={`${styles.ranking__movies} lg:col-span-6`}>
        <div
          className={`${styles.ranking__head} flex flex-col justify-between gap-4 sm:flex-row sm:items-center`}
        >
          <div>
            <span>
              <Diamond size={16} /> LINH THẠCH BÀI HÀNG BẢNG
            </span>
            <h2>Phim được đạo hữu cống hiến nhiều nhất</h2>
          </div>
          <div className={styles.ranking__tabs}>
            <Button>Hôm nay</Button>
            <Button>Tuần này</Button>
            <Button>Toàn mùa</Button>
          </div>
        </div>
        <ol>
          {movies.slice(0, 3).map((movie, index) => (
            <li key={movie.id} className="flex items-center gap-4">
              <strong>{index + 1}</strong>
              <div className={styles.ranking__poster}>
                <Image src={movie.image} alt={`Poster ${movie.title}`} fill sizes="48px" />
              </div>
              <span className="min-w-0 flex-1">
                <b>{movie.title}</b>
                <small>
                  {3_480_000 - index * 570_000} cực phẩm linh thạch • {14.2 - index * 2.4}k lượt
                  tặng
                </small>
              </span>
              <Button>
                <Sparkles size={14} /> Tặng linh thạch
              </Button>
            </li>
          ))}
        </ol>
      </div>
      <aside className={`${styles.ranking__cultivators} lg:col-span-4`}>
        <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-3">
          <div>
            <span>TIÊN BẢNG ĐỆ NHẤT</span>
            <h2>Tiên hữu tu luyện tích cực</h2>
          </div>
          <Star color="#b8860b" />
        </div>
        <ol>
          {cultivators.map(([name, level, hours], index) => (
            <li key={name} className="flex items-center gap-3">
              <strong>#{index + 1}</strong>
              <span className="flex-1">
                <b>{name}</b>
                <small>Cảnh giới: {level}</small>
              </span>
              <em>{hours}</em>
            </li>
          ))}
        </ol>
        <div className={`${styles.ranking__offer} flex items-center justify-between gap-3`}>
          <span>
            <b>Nạp linh thạch viện trợ</b>
            <small>Mở khóa tập mới sớm 7 ngày</small>
          </span>
          <Button>Khám phá</Button>
        </div>
      </aside>
    </section>
  );
}
