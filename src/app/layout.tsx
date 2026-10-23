import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/common/SiteLayout/SiteLayout";
import { QueryProvider } from "@/providers/QueryProvider/QueryProvider";
import "@/app/globals.css";
import "@/styles/globals.sass";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiengioi.example.com"),
  title: { default: "Tiên Giới Kỹ Thuật Số", template: "%s" },
  description: "Đạo tàng phim tiên hiệp 4K dành cho người yêu điện ảnh huyền huyễn.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable} suppressHydrationWarning>
      <body>
        <QueryProvider>
          <SiteLayout>{children}</SiteLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
