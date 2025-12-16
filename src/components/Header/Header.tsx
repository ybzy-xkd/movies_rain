import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { SearchBar } from '../SearchBar';
import styles from './Header.module.scss';

interface HeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  onSearchToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchValue = '',
  onSearchChange,
  showSearch = false,
  onSearchToggle,
}) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('app.title')}</h1>
        <div className={styles.controls}>
          {showSearch && onSearchChange ? (
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onClose={onSearchToggle}
            />
          ) : (
            <>
              {onSearchToggle && (
                <button className={styles.searchBtn} onClick={onSearchToggle} title={t('app.search')}>
                  🔍
                </button>
              )}
              <div className={styles.languageSwitcher}>
                <button
                  className={`${styles.langBtn} ${i18n.language === 'en' ? styles.active : ''}`}
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </button>
                <button
                  className={`${styles.langBtn} ${i18n.language === 'zh-TW' ? styles.active : ''}`}
                  onClick={() => changeLanguage('zh-TW')}
                >
                  繁中
                </button>
              </div>
              <button
                className={styles.themeBtn}
                onClick={toggleTheme}
                title={theme === 'light' ? t('app.dark') : t('app.light')}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

