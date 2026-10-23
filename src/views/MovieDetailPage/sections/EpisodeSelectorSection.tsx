import { Button } from "@/components/common/Button/Button";
import styles from "@/views/MovieDetailPage/MovieDetailPage.module.sass";

const episodes = Array.from({ length: 40 }, (_, index) => index + 81);

export function EpisodeSelectorSection() {
  return (
    <section className={`${styles.episodes} p-5 md:p-8`}>
      <div className="flex flex-col justify-between gap-2 border-b border-[#e7e2d7] pb-5 sm:flex-row sm:items-end">
        <div>
          <span>QUYỂN 3 • THIÊN HẠ VÔ SONG</span>
          <h2>Chọn tập tu luyện</h2>
        </div>
        <p>Đã phát 120 / 120 tập</p>
      </div>
      <div className="grid grid-cols-4 gap-2 pt-5 sm:grid-cols-7 md:grid-cols-10">
        {episodes.map((episode) => (
          <Button
            key={episode}
            className={episode === 120 ? styles["episodes__item--active"] : styles.episodes__item}
          >
            {episode}
            <small>{40 + (episode % 7)}p</small>
          </Button>
        ))}
      </div>
    </section>
  );
}
