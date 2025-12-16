import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClose }) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIcon}>🔍</div>
      <input
        ref={inputRef}
        type="text"
        placeholder={t('app.searchPlaceholder')}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
      {value && (
        <button className={styles.clearBtn} onClick={() => onChange('')} title="Clear">
          ✕
        </button>
      )}
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose} title="Close">
          ✕
        </button>
      )}
    </div>
  );
};


