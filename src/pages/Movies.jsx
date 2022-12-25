import axios from 'axios';
import SearchForm from 'components/SearchForm';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [error, setError] = useState(null);
  const [searchMovies, setSearchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=8510e0ad31b6bb4a75e3ab4ea305febb&query=${query}`
        );
        if (response.data.total_results > 0) {
          setSearchMovies(response.data.results);
        }
      } catch {
        setError('Oops, something went wrong. please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '') {
      fetchImages();
    }
  }, [query]);

  const changeSearchParams = value => {
    setSearchParams({ query: value });
  };

  return (
    <>
      <SearchForm onSubmit={changeSearchParams} />
      {isLoading && <p>Loading...</p>}
      {error !== null && <p>{error}</p>}
      {searchMovies.length > 0 && (
        <ul>
          {searchMovies.map(movie => (
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

export default Movies;
