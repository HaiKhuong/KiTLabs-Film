"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/common/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader/SiteHeader";
import { movies } from "@/mocks/movies";
import styles from "@/components/common/SiteLayout/SiteLayout.module.sass";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className={styles.layout}>
      <SiteHeader movies={movies} overlay={pathname === "/"} />
      <div className={styles.layout__content}>{children}</div>
      <SiteFooter />
    </div>
  );
}
