export interface Movie {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backdrop: string;
  episode: string;
  quality: string;
  views: string;
  rating: number;
  year: number;
  genres: string[];
  isHot?: boolean;
}
