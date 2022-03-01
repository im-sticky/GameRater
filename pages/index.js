import Head from 'next/head';
import html2canvas from 'html2canvas';
import Rating from '../components/rating';
import styles from '../styles/Home.module.scss';
import { useState } from 'react';

export default function Home() {
  const [gameName, setGameName] = useState('Game Name');

  const downloadImage = () => {
    html2canvas(document.getElementById('image-root')).then(canvas => {
      let link = document.createElement('a');

      link.download = `${gameName}-ratings.jpg`;
      link.target = '_blank';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Game Rater</title>
        <meta name="description" content="Create shareable video game ratings" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#ec3e46" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ec3e46" />
      </Head>

      <main className={styles.main}>
        <div id='image-root' className={styles.ratingsContainer}>
          <input className={styles.gameName} defaultValue={gameName} onChange={e => setGameName(e.target.value)} />
          <div className={styles.ratingsColumns}>
            <Rating column={'Gameplay'} rating={1} />
            <Rating column={'Narrative'} rating={2} />
            <Rating column={'Graphics'} rating={3} />
            <Rating column={'X-Factor'} rating={4} />
            <Rating column={'Overall'} rating={5} />
          </div>
        </div>

        <button type='button' onClick={downloadImage}>Download</button>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
