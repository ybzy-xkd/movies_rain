import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.errorMessage}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.text}>{message || t('app.networkError')}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          {t('app.tryAgain')}
        </Button>
      )}
    </div>
  );
};

