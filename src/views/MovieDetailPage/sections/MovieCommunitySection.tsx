import { MessageCircle, Send, Sparkles, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/MovieDetailPage/MovieDetailPage.module.sass";

const comments = [
  [
    "Bắc Minh Kiếm Tiên",
    "Kiếm trận tập cuối quá mãn nhãn, từng đạo kim quang đều có thần vận!",
    "1.2K",
  ],
  ["Thanh Vân Đạo Trưởng", "Đại kết cục xứng đáng với hành trình một trăm hai mươi tập.", "864"],
  ["Lạc Vân Tiên Tử", "Âm thanh Thần Tiên 7.1 nghe như đang đứng giữa Cửu Long Sơn.", "522"],
];

export function MovieCommunitySection({ relatedMovies }: { relatedMovies: Movie[] }) {
  return (
    <section className={`${styles.community} grid gap-8 lg:grid-cols-12`}>
      <div className={`${styles.community__forum} lg:col-span-8`}>
        <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-4">
          <div>
            <span>TIÊN ĐÀI BÌNH LUẬN</span>
            <h3>Tiên Đài Luận Đạo</h3>
          </div>
          <b>
            <MessageCircle size={15} /> 2,486 bình luận
          </b>
        </div>
        <div className={styles.community__composer}>
          <span>BM</span>
          <input
            aria-label="Nội dung bình luận"
            placeholder="Chia sẻ đạo niệm về tập phim này..."
          />
          <Button aria-label="Gửi bình luận">
            <Send size={17} />
          </Button>
        </div>
        {comments.map(([name, copy, likes], index) => (
          <article key={name} className="flex gap-3">
            <strong>{index + 1}</strong>
            <div>
              <h4>{name}</h4>
              <p>{copy}</p>
              <small>
                <ThumbsUp size={13} /> {likes} • Trả lời • 12 phút trước
              </small>
            </div>
          </article>
        ))}
      </div>
      <aside className={`${styles.community__aside} flex flex-col gap-5 lg:col-span-4`}>
        <div>
          <span>CÙNG CHUNG TIÊN DUYÊN</span>
          <h3>Đạo hữu cùng xem</h3>
          {relatedMovies.slice(0, 3).map((item) => (
            <Link href={`/phim/${item.slug}`} key={item.id} className="flex gap-3">
              <div>
                <Image src={item.image} alt={`Poster ${item.title}`} fill sizes="82px" />
              </div>
              <span>
                <b>{item.title}</b>
                <small>
                  {item.episode} • ★ {item.rating}
                </small>
              </span>
            </Link>
          ))}
        </div>
        <div className={styles.community__upgrade}>
          <Sparkles />
          <h4>Khai thông thần thức 8K 120FPS</h4>
          <p>Thăng cấp Hoàng Kim để mở khóa cảnh giới nghe nhìn tối thượng.</p>
          <Button>Thăng cấp tiên vị</Button>
        </div>
      </aside>
    </section>
  );
}
