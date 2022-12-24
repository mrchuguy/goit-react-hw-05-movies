import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const [error, setError] = useState(null);
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  console.log(location);
  useEffect(() => {
    const fetchMovieById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=8510e0ad31b6bb4a75e3ab4ea305febb`
        );
        if (Object.keys(response.data).length > 0) {
          setMovieInfo(response.data);
        }
      } catch {
        setError('Oops, something went wrong. please try again later');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieById();
  }, [movieId]);

  const { poster_path, title, popularity, overview, genres } = movieInfo;
  return (
    <>
      <Link to={backLinkHref}>← Go back</Link>
      {isLoading && <p>Loading...</p>}
      {error !== null && <p>{error}</p>}
      {error === null && Object.keys(movieInfo).length > 0 && (
        <>
          <div>
            {poster_path !== null && (
              <img
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={title}
              />
            )}
            <div>
              <h2>{title}</h2>
              <ul>
                <li>User Score: {popularity}</li>
                <li>
                  <h3>Overview</h3>
                  <p>{overview}</p>
                </li>
                <li>
                  <h4>Genres</h4>
                  <p>{genres.map(genre => genre.name).join(', ')}</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to="Cast">Cast</Link>
              </li>
              <li>
                <Link to="Reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetails;
