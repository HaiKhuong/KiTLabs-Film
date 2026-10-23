"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedMovie, fetchMovies } from "@/services/movies/moviesApi";

export const movieQueryKeys = {
  all: ["movies"] as const,
  lists: () => [...movieQueryKeys.all, "list"] as const,
  featured: () => [...movieQueryKeys.all, "featured"] as const,
};

export function useMovies() {
  return useQuery({ queryKey: movieQueryKeys.lists(), queryFn: fetchMovies });
}
export function useFeaturedMovie() {
  return useQuery({ queryKey: movieQueryKeys.featured(), queryFn: fetchFeaturedMovie });
}
