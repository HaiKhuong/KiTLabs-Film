import { createApiClient } from "@/lib/api/createApiClient";

export const movieClient = createApiClient(process.env.NEXT_PUBLIC_MOVIE_API_BASE_URL);
