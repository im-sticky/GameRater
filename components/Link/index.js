import React from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.scss';

export const Link = ({href, children, className, noUnderline = false, icon = false, ...props}) =>
  <a {...props} href={href} className={clsx(styles.link, className, {
    [styles['link--no-underline']]: noUnderline,
    [styles['link--icon']]: icon,
  })}>
    {children}
  </a>;

export const ExternalLink = ({href, children, className, noIcon = false, ...props}) =>
  <Link {...props} target='_blank' rel='nofollow noreferrer noopener' href={href} className={clsx(styles.externalLink, className)}>
    {children} {!noIcon ? <FontAwesomeIcon {...props} icon={faUpRightFromSquare} className={clsx(styles.externalLink__icon, className)} /> : null}
  </Link>;
