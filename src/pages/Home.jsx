import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=8510e0ad31b6bb4a75e3ab4ea305febb`
        );
        if (response.data.total_results > 0) {
          setMovies(response.data.results);
        }
      } catch {
        setError('Oops, something went wrong. please try again later');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {isLoading && <p>Loading...</p>}
      {error !== null && <p>{error}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
