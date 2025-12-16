import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZES } from '@/config/api';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  budget: number;
  revenue: number;
  production_companies: Array<{ id: number; name: string; logo_path: string | null }>;
}

// Get image URL
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-poster.png';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Get poster URL
export const getPosterUrl = (path: string | null, size: keyof typeof TMDB_IMAGE_SIZES.poster = 'medium'): string => {
  return getImageUrl(path, TMDB_IMAGE_SIZES.poster[size]);
};

// Get backdrop URL
export const getBackdropUrl = (path: string | null, size: keyof typeof TMDB_IMAGE_SIZES.backdrop = 'large'): string => {
  return getImageUrl(path, TMDB_IMAGE_SIZES.backdrop[size]);
};

// API calls
export const getNowPlayingMovies = async (page: number = 1): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
  );
  return response.data;
};

export const getTopRatedMovies = async (page: number = 1): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
  );
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`
  );
  return response.data;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await axios.get<MovieDetails>(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
  );
  return response.data;
};

