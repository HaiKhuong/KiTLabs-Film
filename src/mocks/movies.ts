import type { Movie } from "@/services/movies/types";

const HERO =
  "https://lh3.googleusercontent.com/aida/AEtjO1WSzPV5RubrikrlZv5ofbwoiEWrXqEssXp4U-cDze_CDH8-uDrzTOl6i5lVLKrd-02hejv3uqMDBm3dAxeXd8xERn6u1y2zLEQNW_yqqXucWVHhR_LOAGSo-JdUFNnENl_4JzUXKhVuc8N7B3ITGX1YkpkANH1zbZTAUXmSOS9BqumvC3P5CN3FfBiuIp1AutbVCZyExDdyVtN1JcIjH1wDNjEqe2mWMaKtjCTQNbv-8LWCG51I3UosWNA";
const IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCDO1bl18dUufsXtb3pBw1aQNYOKn5BVua6T8d4ujecjCizdN2umGGVFUvI788aelDgLtQ5M5J51vM4rSC8Bl-aGSymRyxekQWvFdUHhmwkGsAWUqYBkmYBOcP-Lfo1W03WWbRPOE1FUhA0gLA4_e-licLhsgfdP2XEOMI4lBW6I80TGcoex8YdZh3oZSBsdsnOaTDpDS6jbdgBXUrcpJjR_x0y1UAJD0NCUfsf24QKd7z4LRElTBDR",
  "https://lh3.googleusercontent.com/aida/AEtjO1XvalYf4gIPwdsv1EVwsnB_PlaaY7yS4DMO9xDGzOC4rR0scMmHXThTtmgaDTjYVSHyPLuBJZFe09-hd_V79UhZgLyPANOVdFaHyZX7o4OMwQv3BNplz6D-YaJZSN9bBjpGH6_arncrcdnOVvmFaEE1s8YzpOMvi78N7uprXZUr5WAnsf8Fo9cgkSSs9VuEgmc81tfuv7h-cUyqBDS3KS2KTDKbfL2Qwc66Xe5fj0MjiEy2zbCRxSgQHew",
  "https://lh3.googleusercontent.com/aida/AEtjO1UZVX0qgF2TafJxM64cLTcPBdYZR2npNkQo3SbBczJyZNhag4ajyOxlaDyhv1SFMmFvGzaJwWkZ2vhwvvrFYX4W_ChRUN3o9KhC6Pimp-mL-AOHs3-IRnsVEqAGGT6qzhvREMFyhbSBDv8E2-Oj051PL4pIjUt-bb_ji-lifXlRN3H7V4mortE4-GX2vEjQrY3za_7B6jzEsguV8BxrpomX7dPsU8n7WIljbABAejFzjpLjuTZfrHLooQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Nrd3gm41GXqOvJs0-a4tTwK5Z31tf-DXIAZ0J0sfCDbFHLTTaEGL4sBECMsn8zHWoj-FdB9hsAJavWrGHaxVTTIQ4s_iKeywPIrLZk6lybbirVtlViszGRXhSjvkfzoduDo3v9J849qnNKv458hntSLrl5gYV5totq7w20LAUGxICf3X-1kFzeqGbd4m7lH2I9rTYRuqN1V36v10EYmtWNZhUbeTpl955j66G-Ai9CoE3pSmnz3y",
];

const titles = [
  "Đại Quản Gia Là Ma Hoàng",
  "Trọng Sinh Đô Thị Tu Tiên",
  "Bách Luyện Thành Thần",
  "Tiên Nghịch: Ma Đạo Khởi Nguyên",
  "Vạn Cổ Kiếm Thần",
  "Võ Thần Chúa Tể: Cửu Giới Chi Thần",
  "Phàm Nhân Tu Tiên: Tiên Giới Thiên",
  "Thôn Phệ Tinh Không: Vạn Giới Hạm",
  "Cửu Tinh Bá Thể Quyết: Luyện Thể",
  "Hoàn Mỹ Thế Giới: Hoang Thiên Đế",
  "Già Thiên: Đăng Thiên Lộ Đạp Ca Hành",
  "Đấu Phá Thương Khung: Già Nam Học Viện",
];

export const movies: Movie[] = titles.map((title, index) => ({
  id: String(index + 1),
  slug: index === 0 ? "dai-quan-gia-la-ma-hoang" : `phim-${index + 1}`,
  title,
  subtitle: index === 0 ? "The Steward Demonic Emperor" : "Thiên đạo truyền kỳ",
  description:
    "Giữa đại kiếp vạn niên, một thiếu niên mang linh mạch cổ thức tỉnh, ngự kiếm xuyên cửu thiên và viết lại vận mệnh tiên giới.",
  image: IMAGES[index % IMAGES.length],
  backdrop: index === 0 ? HERO : IMAGES[index % IMAGES.length],
  episode: index === 0 ? "Trọn bộ 120 tập" : `Đang phát tập ${72 + index * 6}`,
  quality: index % 2 ? "4K Ultra" : "4K HDR",
  views: `${29 + index * 3}.8M`,
  rating: Number((9.9 - index * 0.1).toFixed(1)),
  year: 2024,
  genres: ["Tiên hiệp", index % 2 ? "Trọng sinh" : "Kiếm đạo"],
  isHot: index < 2,
}));

export const featuredMovie: Movie = {
  ...movies[0],
  title: "Vạn Cổ Kiếm Thần: Thiên Đạo Quy Tông",
  slug: "dai-quan-gia-la-ma-hoang",
  episode: "Tập mới: 142",
  backdrop: HERO,
};
