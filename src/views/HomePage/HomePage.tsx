"use client";

import { useFeaturedMovie, useMovies } from "@/hooks/useMovies";
import { featuredMovie, movies as mockMovies } from "@/mocks/movies";
import styles from "@/views/HomePage/HomePage.module.sass";
import { HomeHero } from "@/views/HomePage/sections/HomeHero";
import { HomeRankingSection } from "@/views/HomePage/sections/HomeRankingSection";
import { MovieCatalogSection } from "@/views/HomePage/sections/MovieCatalogSection";

export function HomePage() {
  const { data: queriedMovies = mockMovies } = useMovies();
  const { data: hero = featuredMovie } = useFeaturedMovie();

  return (
    <div className={styles.home}>
      <main>
        <HomeHero hero={hero} thumbnails={mockMovies.slice(1, 4)} />
        <MovieCatalogSection movies={queriedMovies} />
        <HomeRankingSection movies={mockMovies} />
      </main>
    </div>
  );
}
