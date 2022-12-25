import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8510e0ad31b6bb4a75e3ab4ea305febb`
        );
        if (response.data.cast.length > 0) {
          setCast(response.data.cast);
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
    <>
      <div>
        {isLoading && <p>Loading...</p>}
        {error !== null && <p>{error}</p>}
        {cast.length > 0 && (
          <ul>
            {cast.map(castItem => (
              <li key={castItem.id}>
                {castItem.profile_path !== null && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${castItem.profile_path}`}
                    alt={castItem.name}
                  />
                )}
                <p>{castItem.name}</p>
                <p>Character: {castItem.character}</p>
              </li>
            ))}
          </ul>
        )}
        {cast.length === 0 && !isLoading && (
          <p>We don't have any cast for this movie.</p>
        )}
      </div>
    </>
  );
};

export default Cast;
