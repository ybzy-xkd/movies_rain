import React from 'react';
import styles from './Loading.module.scss';

export const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
  );
};

