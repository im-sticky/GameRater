import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export const Button = ({children, type = 'button', active = false, className, ...props}) => (
  <button type="button" className={clsx(styles.button, className, {[styles.active]: active})} {...props}>
    {children}
  </button>
);
