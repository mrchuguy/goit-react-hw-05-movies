import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=8510e0ad31b6bb4a75e3ab4ea305febb`
        );
        if (response.data.total_results > 0) {
          setReviews(response.data.results);
        }
      } catch {
        setError('Oops, something went wrong. please try again later');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieById();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error !== null && <p>{error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li>
              <b>Author: {review.author}</b>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default Reviews;
