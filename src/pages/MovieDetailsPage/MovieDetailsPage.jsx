import { useEffect, useState, useRef } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../utilities/api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const locationRef = useRef(location.state?.from || "/movies");

  const handleGoBack = () => navigate(locationRef.current);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const genres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleGoBack}>
        Go Back
      </button>

      <div className={styles.detailsWrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.image}
        />

        <div className={styles.detailsContent}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.userScore}>
            <strong>User Score:</strong> {movie.vote_average}/10
          </p>
          <p className={styles.genres}>
            <strong>Genres:</strong> {genres}
          </p>
          <p className={styles.overview}>{movie.overview}</p>

          <h3>Additional Information</h3>
          <ul className={styles.additionalLinks}>
            <li>
              <Link to={`cast`} className={styles.link}>
                Cast
              </Link>
            </li>
            <li>
              <Link to={`reviews`} className={styles.link}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
