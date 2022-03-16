import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export function Toast({message, open = false, error = false}) {
  return (
    <div className={clsx(styles.toast, {[styles.popped]: open})}>
      <img src={error ? '/error.png' : '/success.png'} className={styles.image} alt="" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
