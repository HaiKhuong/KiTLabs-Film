import { ImageResponse } from "next/og";

export const alt = "Tiên Giới Kỹ Thuật Số - Đạo tàng phim 4K";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg,#10131d,#303426)",
        color: "#ffe088",
        display: "flex",
        flexDirection: "column",
        fontSize: 72,
        height: "100%",
        justifyContent: "center",
        letterSpacing: -2,
        textAlign: "center",
        width: "100%",
      }}
    >
      <span style={{ fontSize: 24, letterSpacing: 7 }}>VẠN GIỚI TRỰC THAO</span>
      <strong style={{ marginTop: 20 }}>TIÊN GIỚI KỸ THUẬT SỐ</strong>
      <span style={{ color: "#fff", fontSize: 30, marginTop: 20 }}>Đạo tàng phim tiên hiệp 4K</span>
    </div>,
    size,
  );
}
