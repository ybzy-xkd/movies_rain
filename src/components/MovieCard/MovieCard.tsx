import React, { useState } from 'react';
import { Movie, getPosterUrl } from '@/api/movies';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  viewMode?: 'list' | 'grid';
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`${styles.movieCard} ${styles[viewMode]}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={styles.posterWrapper}>
        {!imageLoaded && !imageError && (
          <div className={styles.skeleton}></div>
        )}
        {imageError ? (
          <div className={styles.placeholder}>
            <span>No Image</span>
          </div>
        ) : (
          <img
            src={getPosterUrl(movie.poster_path, 'medium')}
            alt={movie.title}
            className={`${styles.poster} ${imageLoaded ? styles.loaded : ''}`}
            onLoad={() => {
              // 延迟一点隐藏骨架屏，让过渡更自然
              setTimeout(() => setImageLoaded(true), 50);
            }}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
          <span className={styles.date}>{new Date(movie.release_date).getFullYear()}</span>
        </div>
        {viewMode === 'list' && (
          <p className={styles.overview}>{movie.overview.substring(0, 150)}...</p>
        )}
      </div>
    </div>
  );
};

