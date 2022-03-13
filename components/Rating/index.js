import React, {useEffect, useState} from 'react';
import {clamp} from 'helpers';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo, faCircleArrowDown, faCircleArrowUp} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'components/Button';
import styles from './index.module.scss';

const min = 1;
const max = 5;
const step = 0.5;

export const Rating = ({column, rating, info, readonly}) => {
  const [internalRating, setInternalRating] = useState(rating);
  const [infoVisible, setInfoVisible] = useState(false);
  const [image, setImage] = useState(rating);

  useEffect(() => {
    if (internalRating >= 1 && internalRating <= 5) {
      let img = Math.floor(internalRating);

      if (internalRating % 1 != 0) {
        img += '_5';
      }

      setImage(img);
    }
  }, [internalRating]);

  return (
    <div className={styles.column}>
      <div
        className={styles.nameContainer}
        onMouseEnter={() => setInfoVisible(true)}
        onMouseLeave={() => setInfoVisible(false)}
      >
        <h2 className={styles.name}>
          {column}
          {!readonly && info ? <FontAwesomeIcon icon={faCircleInfo} className={styles.infoIcon} /> : null}
        </h2>
        {!readonly && info ? (
          <div className={clsx(styles.infoPanel, {[styles.hidden]: !infoVisible})}>
            <p>{info}</p>
          </div>
        ) : null}
      </div>
      <img src={`/ratings/${image}.png`} className={styles.image} role="presentation" alt="" />
      <div className={styles.spinnerContainer}>
        {readonly ? (
          <span className={styles.rating}>{internalRating}</span>
        ) : (
          <>
            <Button
              className={styles.spinner}
              onClick={() => setInternalRating((prevRating) => clamp(prevRating - step, min, max))}
              disabled={internalRating === min}
            >
              <FontAwesomeIcon icon={faCircleArrowDown} />
            </Button>
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={internalRating}
              className={styles.rating}
              onChange={(e) => setInternalRating(clamp(e.target.value, min, max))}
              onFocus={(e) => e.target.select()}
            />
            <Button
              className={styles.spinner}
              onClick={() => setInternalRating((prevRating) => clamp(prevRating + step, min, max))}
              disabled={internalRating === max}
            >
              <FontAwesomeIcon icon={faCircleArrowUp} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
