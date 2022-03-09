import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';

export const Rating = ({column, rating, readonly}) => {
  const [internalRating, setInternalRating] = useState(rating);
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
      <span className={styles.name}>{column}</span>
      <img src={`/ratings/${image}.png`} className={styles.image} role="presentation" alt="" />
      {readonly ? (
        <span className={styles.rating}>{internalRating}</span>
      ) : (
        <input
          type="number"
          defaultValue={internalRating}
          min={1}
          max={5}
          step={0.5}
          className={styles.rating}
          onChange={(e) => setInternalRating(e.target.value)}
        />
      )}
    </div>
  );
};
