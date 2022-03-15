import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export function Toast({message, open = false}) {
  return (
    <div className={clsx(styles.toast, {[styles.popped]: open})}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
