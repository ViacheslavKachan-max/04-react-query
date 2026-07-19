import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3";
const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const client = axios.create({
  baseURL: BASE_URL,
  headers: tmdbToken ? { Authorization: `Bearer ${tmdbToken}` } : undefined,
});

export async function fetchMovies(
  query: string,
  page: number,
): Promise<MoviesResponse> {
  const trimmedQuery = query.trim();

  if (!tmdbToken && !tmdbApiKey) {
    throw new Error(
      "TMDB credentials are missing. Set VITE_TMDB_TOKEN or VITE_TMDB_API_KEY in environment variables.",
    );
  }

  if (!trimmedQuery) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const { data } = await client.get<MoviesResponse>("/search/movie", {
    params: {
      query: trimmedQuery,
      page,
      include_adult: false,
      language: "en-US",
      api_key: tmdbToken ? undefined : tmdbApiKey,
    },
  });

  return data;
}
