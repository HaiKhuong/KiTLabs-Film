import { movies } from "@/mocks/movies";
import type { Movie } from "@/services/movies/types";
import styles from "@/views/MovieDetailPage/MovieDetailPage.module.sass";
import { EpisodeSelectorSection } from "@/views/MovieDetailPage/sections/EpisodeSelectorSection";
import { MovieCommunitySection } from "@/views/MovieDetailPage/sections/MovieCommunitySection";
import { MovieInfoSection } from "@/views/MovieDetailPage/sections/MovieInfoSection";
import { MoviePlayerSection } from "@/views/MovieDetailPage/sections/MoviePlayerSection";
import { MovieRecommendationsSection } from "@/views/MovieDetailPage/sections/MovieRecommendationsSection";

export function MovieDetailPage({ movie }: { movie: Movie }) {
  const relatedMovies = movies.filter((item) => item.id !== movie.id);

  return (
    <div className={styles.detail}>
      <main>
        <MoviePlayerSection movie={movie} />
        <div className="mx-auto flex max-w-[1344px] flex-col gap-8 px-4 py-9 md:px-8 lg:px-12">
          <MovieInfoSection movie={movie} />
          <EpisodeSelectorSection />
          <MovieCommunitySection relatedMovies={relatedMovies} />
          <MovieRecommendationsSection movies={relatedMovies} />
        </div>
      </main>
    </div>
  );
}
