import { featuredMovie, movies } from "@/mocks/movies";

const waitForMock = () => new Promise((resolve) => setTimeout(resolve, 180));

export async function fetchMovies() {
  await waitForMock();
  return movies;
}
export async function fetchFeaturedMovie() {
  await waitForMock();
  return featuredMovie;
}
export async function fetchMovie(slug: string) {
  await waitForMock();
  return movies.find((movie) => movie.slug === slug);
}
