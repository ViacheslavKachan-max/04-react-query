import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w342";
const FALLBACK_POSTER =
  "https://via.placeholder.com/342x513?text=No+Poster+Available";

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : FALLBACK_POSTER;

  return (
    <li>
      <button
        type="button"
        className={css.card}
        onClick={() => onSelect(movie)}
      >
        <img
          className={css.image}
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
        />
        <h2 className={css.title}>{movie.title}</h2>
      </button>
    </li>
  );
}
