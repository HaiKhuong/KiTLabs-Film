import Link from "next/link";
import { Download, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import styles from "@/components/common/SiteFooter/SiteFooter.module.sass";

const footerColumns = [
  {
    title: "Đạo tàng phim",
    links: ["Bảng xếp hạng tiên môn", "Phim độc quyền VIP", "Cơ giáp & xuyên không"],
  },
  {
    title: "Tông môn hỗ trợ",
    links: ["Quy định đạo hữu", "Nạp cực phẩm linh thạch", "Chính sách bản quyền"],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div
        className={`${styles.footer__content} mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 py-10 md:grid-cols-2 lg:grid-cols-5 lg:px-12`}
      >
        <div className={`${styles.footer__brand} lg:col-span-2`}>
          <Link href="/" className="flex items-center gap-2">
            <span>
              <Sparkles size={17} />
            </span>
            <strong>TIÊN GIỚI KỸ THUẬT SỐ</strong>
          </Link>
          <p>
            Nền tảng phát trực tuyến phim tiên hiệp và điện ảnh huyền huyễn chuẩn 4K HDR hàng đầu
            vạn giới.
          </p>
          <div className="flex flex-wrap gap-2">
            <i>4K Linh Thể</i>
            <i>Dolby Thần Thức</i>
            <i>Khí Vận Độc Quyền</i>
          </div>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
            {column.links.map((label) => (
              <Link key={label} href="/#dao-tang">
                {label}
              </Link>
            ))}
          </nav>
        ))}
        <div className={styles.footer__app}>
          <h2>Lệnh bài ứng dụng</h2>
          <p>Trải nghiệm xem phim mượt mà trên mọi thiết bị.</p>
          <Button>
            <Download size={16} /> Tải ứng dụng
          </Button>
        </div>
      </div>
      <div
        className={`${styles.footer__bottom} mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-6 py-4 text-center sm:flex-row lg:px-12`}
      >
        <span>© 2026 Tiên Giới Kỹ Thuật Số</span>
        <span>Điều khoản • Bảo mật • Liên hệ chưởng môn</span>
      </div>
    </footer>
  );
}
