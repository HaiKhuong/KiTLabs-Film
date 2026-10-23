import { HomePage } from "@/views/HomePage/HomePage";
import { createMetadata } from "@/lib/seo/createMetadata";

export const metadata = createMetadata({
  title: "Phim tiên hiệp 4K tuyển chọn tại Tiên Giới Kỹ Thuật Số",
  description:
    "Khám phá đạo tàng phim tiên hiệp, huyền huyễn và kiếm đạo tuyển chọn, chất lượng 4K HDR cùng phụ đề Việt cập nhật mỗi ngày.",
  path: "/",
  imageAlt: "Tiên Giới Kỹ Thuật Số - đạo tàng phim tiên hiệp 4K",
});

export default function Page() {
  return <HomePage />;
}
