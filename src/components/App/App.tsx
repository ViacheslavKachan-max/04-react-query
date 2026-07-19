import { useState } from "react";
import type { ComponentType } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/tmdbApi";
import css from "./App.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: Boolean(searchQuery),
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearchSubmit} />

      <main className={css.content}>
        {searchQuery && isPending && <Loader />}

        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        {isError && (
          <ErrorMessage
            message={
              error instanceof Error ? error.message : "Failed to load movies."
            }
          />
        )}

        {!isError && movies.length > 0 && <MovieGrid movies={movies} />}

        {!isPending && !isError && searchQuery && movies.length === 0 && (
          <p className={css.hint}>No movies found for your query.</p>
        )}

        {isFetching && !isPending && (
          <p className={css.hint}>Updating movies...</p>
        )}
      </main>
    </div>
  );
}
