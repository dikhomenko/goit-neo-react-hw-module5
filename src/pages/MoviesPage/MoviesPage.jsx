import { useState, useEffect } from "react";
import { searchMovies } from "../../utilities/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      searchMovies(query).then((results) => {
        setMovies(results);
        setHasSearched(true);
      });
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSearchParams({ query });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder="Enter movie title"
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>
      {hasSearched && movies.length === 0 && (
        <p>No movies found. Try a different search query.</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
