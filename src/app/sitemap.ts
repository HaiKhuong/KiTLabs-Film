import type { MetadataRoute } from "next";
import { movies } from "@/mocks/movies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiengioi.example.com";
  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    ...movies.map((movie) => ({
      url: `${baseUrl}/phim/${movie.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
