import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/createMetadata";
import { movies } from "@/mocks/movies";
import { MovieDetailPage } from "@/views/MovieDetailPage/MovieDetailPage";

export function generateStaticParams() {
  return movies.map(({ slug }) => ({ slug }));
}

interface MoviePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = movies.find((item) => item.slug === slug);
  if (!movie) return {};
  return createMetadata({
    title: `${movie.title} - Xem trọn bộ phim tiên hiệp 4K`,
    description:
      `Xem ${movie.title} trọn bộ chất lượng ${movie.quality}, phụ đề Việt. ${movie.description}`.slice(
        0,
        158,
      ),
    path: `/phim/${movie.slug}`,
    imageAlt: `Poster phim ${movie.title}`,
  });
}

export default async function Page({ params }: MoviePageProps) {
  const { slug } = await params;
  const movie = movies.find((item) => item.slug === slug);
  if (!movie) notFound();
  return <MovieDetailPage movie={movie} />;
}
