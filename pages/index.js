import {useEffect, useState} from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
import Rating from '../components/rating';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [gameName, setGameName] = useState('Game Name');
  const [coverFile, setCoverFile] = useState();
  const [downloadingImage, setDownloadingImage] = useState(false);

  useEffect(() => {
    if (downloadingImage) {
      html2canvas(document.getElementById('image-root')).then(canvas => {
        setDownloadingImage(false);

        let link = document.createElement('a');

        link.download = `${gameName}-ratings.jpg`;
        link.target = '_blank';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  }, [downloadingImage]);

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
        <div id='image-root'>
          <label htmlFor='cover-upload' className={clsx(styles.coverUpload, {[styles.downloading]: downloadingImage})}>
            {coverFile ?
              <img src={URL.createObjectURL(coverFile)} alt={`${gameName} cover art`} /> :
              <span className={clsx(styles.label, {hidden: downloadingImage})}>Choose a cover image</span>}

            {!downloadingImage ? <input id='cover-upload' type='file' accept="image/*" onChange={e => setCoverFile(e.target.files[0])} /> : null}
          </label>

          <div className={styles.ratingsContainer}>
            {downloadingImage ?
              <h1 className={styles.gameName}>{gameName}</h1> :
              <input type='text' className={styles.gameName} defaultValue={gameName} onChange={e => setGameName(e.target.value)} />}
            <div className={styles.ratingsColumns}>
              <Rating column={'Gameplay'} rating={1} readonly={downloadingImage} />
              <Rating column={'Narrative'} rating={2} readonly={downloadingImage} />
              <Rating column={'Graphics'} rating={3} readonly={downloadingImage} />
              <Rating column={'X-Factor'} rating={4} readonly={downloadingImage} />
              <Rating column={'Overall'} rating={5} readonly={downloadingImage} />
            </div>
          </div>
        </div>

        {!downloadingImage && <button type='button' onClick={() => setDownloadingImage(true)}>Download</button>}
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
