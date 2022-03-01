import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/rating.module.scss';

export default function Rating({column, rating}) {
  const [internalRating, setInternalRating] = useState(rating);
  const [image, setImage] = useState(rating);

  useEffect(() => {
    if (internalRating >=1 && internalRating <= 5) {
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
      {/* <Image src={`/ratings/${image}.png`} width={283} height={324} role='presentation' alt='' /> */}
      <img src={`/ratings/${image}.png`} className={styles.image} role='presentation' alt='' />
      <input type='number' defaultValue={rating} min={1} max={5} step={0.5} className={styles.rating} onChange={e => setInternalRating(e.target.value)} />
    </div>
  );
}