import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { getMovieDetails, MovieDetails, getPosterUrl, getBackdropUrl } from '@/api/movies';
import styles from './index.module.scss';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch (err: any) {
        setError(err.message || t('app.networkError'));
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, t]);

  if (loading) {
    return (
      <div className={styles.movieDetail}>
        <Header />
        <Loading />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className={styles.movieDetail}>
        <Header />
        <ErrorMessage
          message={error || t('app.error')}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className={styles.movieDetail}>
      <Header />
      <div className={styles.backdropWrapper}>
        {movie.backdrop_path && (
          <>
            {!backdropLoaded && <div className={styles.skeleton}></div>}
            <img
              src={getBackdropUrl(movie.backdrop_path, 'large')}
              alt={movie.title}
              className={`${styles.backdrop} ${backdropLoaded ? styles.loaded : ''}`}
              onLoad={() => {
                setTimeout(() => setBackdropLoaded(true), 50);
              }}
            />
          </>
        )}
        <div className={styles.backdropOverlay}></div>
      </div>

      <div className={styles.container}>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          ← {t('app.back')}
        </Button>

        <div className={styles.content}>
          <div className={styles.posterSection}>
            {!posterLoaded && (
              <div className={styles.skeleton}></div>
            )}
            <img
              src={getPosterUrl(movie.poster_path, 'large')}
              alt={movie.title}
              className={`${styles.poster} ${posterLoaded ? styles.loaded : ''}`}
              onLoad={() => {
                setTimeout(() => setPosterLoaded(true), 50);
              }}
            />
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.meta}>
              <div className={styles.rating}>
                <span className={styles.ratingValue}>
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className={styles.voteCount}>
                  ({movie.vote_count.toLocaleString()} {t('app.voteCount')})
                </span>
              </div>
              {movie.release_date && (
                <div className={styles.releaseDate}>
                  <strong>{t('app.releaseDate')}:</strong>{' '}
                  {new Date(movie.release_date).toLocaleDateString()}
                </div>
              )}
              {movie.runtime && (
                <div className={styles.runtime}>
                  <strong>Runtime:</strong> {movie.runtime} min
                </div>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className={styles.genres}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.overview}>
              <h2>{t('app.overview')}</h2>
              <p>{movie.overview || 'No overview available.'}</p>
            </div>

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className={styles.production}>
                <h3>Production Companies</h3>
                <div className={styles.companies}>
                  {movie.production_companies.map((company) => (
                    <span key={company.id} className={styles.company}>
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

