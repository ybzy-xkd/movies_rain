import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { TabBar } from '@/components/TabBar';
import { MovieCard } from '@/components/MovieCard';
import { Loading } from '@/components/Loading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/Button';
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  searchMovies,
  Movie,
} from '@/api/movies';
import styles from './index.module.scss';

type TabType = 'nowPlaying' | 'topRated';
type ViewMode = 'list' | 'grid';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('nowPlaying');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'nowPlaying', label: t('app.nowPlaying') },
    { id: 'topRated', label: t('app.topRated') },
  ];

  const fetchMovies = useCallback(
    async (tab: TabType, pageNum: number = 1, append: boolean = false) => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (tab === 'nowPlaying') {
          response = await getNowPlayingMovies(pageNum);
        } else {
          response = await getTopRatedMovies(pageNum);
        }
        if (append) {
          setMovies((prev) => [...prev, ...response.results]);
        } else {
          setMovies(response.results);
        }
        setHasMore(pageNum < response.total_pages);
        setPage(pageNum);
      } catch (err: any) {
        setError(err.message || t('app.networkError'));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  const handleSearch = useCallback(
    async (query: string, pageNum: number = 1, append: boolean = false) => {
      if (!query.trim()) {
        setIsSearching(false);
        fetchMovies(activeTab, 1, false);
        return;
      }

      setLoading(true);
      setError(null);
      setIsSearching(true);
      try {
        const response = await searchMovies(query, pageNum);
        if (append) {
          setMovies((prev) => [...prev, ...response.results]);
        } else {
          setMovies(response.results);
        }
        setHasMore(pageNum < response.total_pages);
        setPage(pageNum);
      } catch (err: any) {
        setError(err.message || t('app.networkError'));
      } finally {
        setLoading(false);
      }
    },
    [activeTab, fetchMovies, t]
  );

  useEffect(() => {
    if (!isSearching) {
      fetchMovies(activeTab, 1, false);
    }
  }, [activeTab, fetchMovies, isSearching]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType);
    setSearchQuery('');
    setIsSearching(false);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      handleSearch(value, 1, false);
    } else {
      setIsSearching(false);
      fetchMovies(activeTab, 1, false);
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
      setIsSearching(false);
      fetchMovies(activeTab, 1, false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    if (isSearching && searchQuery.trim()) {
      handleSearch(searchQuery, nextPage, true);
    } else {
      fetchMovies(activeTab, nextPage, true);
    }
  }, [loading, hasMore, page, isSearching, searchQuery, activeTab]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          if (isSearching && searchQuery.trim()) {
            handleSearch(searchQuery, nextPage, true);
          } else {
            fetchMovies(activeTab, nextPage, true);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, page, isSearching, searchQuery, activeTab, handleSearch, fetchMovies]);

  const getPageTitle = () => {
    if (isSearching) {
      return t('app.search');
    }
    return activeTab === 'nowPlaying' ? t('app.nowPlaying') : t('app.topRated');
  };

  return (
    <div className={styles.home}>
      <Header
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        showSearch={showSearch}
        onSearchToggle={handleSearchToggle}
      />
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>{getPageTitle()}</h2>
          {!isSearching && (
            <div className={styles.headerActions}>
              <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
              <div className={styles.viewModeToggle}>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => setViewMode('list')}
                  className={styles.viewBtn}
                >
                  {t('app.listView')}
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => setViewMode('grid')}
                  className={styles.viewBtn}
                >
                  {t('app.gridView')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {loading && movies.length === 0 ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => fetchMovies(activeTab, 1, false)} />
        ) : movies.length === 0 ? (
          <div className={styles.emptyState}>
            <p>{t('app.noResults')}</p>
          </div>
        ) : (
          <>
            <div className={`${styles.moviesGrid} ${styles[viewMode]}`}>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  viewMode={viewMode}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>
            {hasMore && (
              <div ref={observerTarget} className={styles.loadMore}>
                {loading && <Loading />}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
