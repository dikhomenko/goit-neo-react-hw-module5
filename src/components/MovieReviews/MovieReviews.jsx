import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../utilities/api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li className={styles.review} key={review.id}>
              <p>
                <strong className={styles.reviewAuthor}>{review.author}</strong>
                : {review.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
