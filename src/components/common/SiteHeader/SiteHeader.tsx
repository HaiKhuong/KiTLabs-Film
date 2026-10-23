"use client";

import { CircleUserRound, LockKeyhole, Menu, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/common/Button/Button";
import type { Movie } from "@/services/movies/types";
import { useSidebar } from "@/stores/sidebarStore";
import { useTheme } from "@/stores/themeStore";
import styles from "@/components/common/SiteHeader/SiteHeader.module.sass";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Bảng xếp hạng", href: "/#bang-xep-hang" },
  { label: "Đạo tàng phim", href: "/#dao-tang" },
  { label: "Tu tiên tông môn", href: "/#tong-mon" },
  { label: "Linh thạch các", href: "/#linh-thach" },
];

export interface SiteHeaderProps {
  movies: Movie[];
  overlay?: boolean;
}

export function SiteHeader({ movies, overlay = false }: SiteHeaderProps) {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isOpen = useSidebar((state) => state.isOpen);
  const toggle = useSidebar((state) => state.toggle);
  const close = useSidebar((state) => state.close);
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase("vi");
    if (!normalizedQuery) return movies.slice(0, 6);

    return movies
      .filter((movie) =>
        [movie.title, movie.subtitle, ...movie.genres].some((value) =>
          value.toLocaleLowerCase("vi").includes(normalizedQuery),
        ),
      )
      .slice(0, 6);
  }, [movies, searchQuery]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }

      if (event.key === "Escape") setIsSearchOpen(false);
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    searchInputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSearchOpen]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const openFirstResult = () => {
    const firstResult = searchResults[0];
    if (!firstResult) return;
    closeSearch();
    router.push(`/phim/${firstResult.slug}`);
  };

  return (
    <>
      <header className={`${styles.header} ${overlay ? styles["header--overlay"] : ""}`}>
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-5 px-4 md:px-8 lg:px-12">
          <Link
            href="/"
            className={`${styles.header__brand} flex items-center gap-3`}
            aria-label="Tiên Giới Kỹ Thuật Số - Trang chủ"
          >
            <span className={styles.header__mark}>
              <Sparkles size={19} />
            </span>
            <span>
              <strong>TIÊN GIỚI KỸ THUẬT SỐ</strong>
              <small>Vạn giới trực thao</small>
            </span>
          </Link>
          <nav
            className={`${styles.header__nav} hidden items-center gap-7 xl:flex`}
            aria-label="Điều hướng chính"
          >
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              className={styles.header__theme}
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
              }
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button
              className={`${styles.header__search} flex items-center gap-2 px-3`}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Mở tìm kiếm phim"
              aria-haspopup="dialog"
            >
              <Search size={17} aria-hidden="true" />
              <span className="hidden sm:inline">Tìm phim...</span>
              <kbd className="hidden md:inline-flex">⌘ K</kbd>
            </Button>
            <Button className={`${styles.header__login} hidden items-center gap-2 px-4 sm:flex`}>
              <LockKeyhole size={14} /> Đăng nhập đạo hữu
            </Button>
            <span
              className={`${styles.header__avatar} hidden sm:grid`}
              aria-label="Tài khoản đạo hữu"
            >
              <CircleUserRound size={24} />
              <i />
            </span>
            <Button
              type="button"
              onClick={toggle}
              className={`${styles.header__menu} xl:hidden`}
              aria-label={isOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {isOpen && (
          <nav
            className={`${styles.header__drawer} flex flex-col gap-1 p-4 xl:hidden`}
            aria-label="Điều hướng di động"
          >
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      {isSearchOpen &&
        createPortal(
          <div
            className={`${styles.searchModal} flex items-start justify-center px-4 pt-[12vh]`}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeSearch();
            }}
          >
            <section
              className={styles["searchModal__panel"]}
              role="dialog"
              aria-modal="true"
              aria-labelledby="movie-search-title"
            >
              <h2 id="movie-search-title" className="sr-only">
                Tìm kiếm phim
              </h2>
              <div className={`${styles["searchModal__input"]} flex items-center gap-3 px-4`}>
                <Search size={21} aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") openFirstResult();
                  }}
                  placeholder="Tìm tên phim, thể loại..."
                  aria-label="Tìm tên phim hoặc thể loại"
                />
                <Button onClick={closeSearch} aria-label="Đóng tìm kiếm">
                  <X size={19} />
                </Button>
              </div>
              <div className={styles["searchModal__results"]}>
                <p>{searchQuery ? `Kết quả cho “${searchQuery}”` : "Phim đề xuất"}</p>
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((movie) => (
                      <li key={movie.id}>
                        <Link href={`/phim/${movie.slug}`} onClick={closeSearch}>
                          <span>
                            <strong>{movie.title}</strong>
                            <small>{movie.subtitle}</small>
                          </span>
                          <b>{movie.quality}</b>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={styles["searchModal__empty"]}>Không tìm thấy phim phù hợp.</div>
                )}
              </div>
              <footer className={`${styles["searchModal__hint"]} flex items-center gap-4 px-4`}>
                <span>
                  <kbd>↵</kbd> mở phim
                </span>
                <span>
                  <kbd>ESC</kbd> đóng
                </span>
              </footer>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
