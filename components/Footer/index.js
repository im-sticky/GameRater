import {ExternalLink} from 'components/Link';
import React from 'react';
import styles from './index.module.scss';

export const Footer = ({}) =>
  <footer className={styles.footer}>
    <small>
      <ExternalLink href='https://im-sticky.github.io/'>Alex Craig</ExternalLink> &copy; {new Date().getFullYear()}
      <span className={styles.separator}>|</span>
      Having an issue? Report it <ExternalLink href='https://github.com/im-sticky/GameRater/issues'>here</ExternalLink>
    </small>
  </footer>;
