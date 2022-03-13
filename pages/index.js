import {useEffect, useState} from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
import {Rating} from 'components/Rating';
import {Button} from 'components/Button';
import styles from 'styles/Home.module.scss';
import {Footer} from 'components/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [gameName, setGameName] = useState('');
  const [coverFile, setCoverFile] = useState();
  const [downloadingImage, setDownloadingImage] = useState(false);

  useEffect(() => {
    if (downloadingImage) {
      html2canvas(document.getElementById('image-root')).then((canvas) => {
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
        <meta name="description" content="Create and share bite-sized video game rating images" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Game Rater</h1>
        <p className={styles.description}>Create and share bite-sized video game rating images</p>

        <div id="image-root">
          <label
            htmlFor="cover-upload"
            className={clsx(styles.coverUpload, {
              [styles.downloading]: downloadingImage,
            })}
          >
            {coverFile ? (
              <img src={URL.createObjectURL(coverFile)} alt={`${gameName} cover art`} />
            ) : (
              <span className={clsx(styles.label, {hidden: downloadingImage})}>
                <span className={styles.labelText}>
                  <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon} />
                  Upload a cover image (Optional)
                </span>
              </span>
            )}

            {!downloadingImage ? (
              <input id="cover-upload" type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
            ) : null}
          </label>

          <div className={styles.ratingsContainer}>
            {downloadingImage ? (
              <h2 className={styles.gameName}>{gameName}</h2>
            ) : (
              <input
                type="text"
                className={styles.gameName}
                defaultValue={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Enter a game name"
              />
            )}
            <div className={styles.ratingsColumns}>
              <Rating column={'Gameplay'} rating={1} readonly={downloadingImage} />
              <Rating column={'Narrative'} rating={2} readonly={downloadingImage} />
              <Rating column={'Graphics'} rating={3} readonly={downloadingImage} />
              <Rating
                column={'X-Factor'}
                rating={4}
                info="Uniqueness, cool concepts, or anything that does not fit in the other catagories."
                readonly={downloadingImage}
              />
              <Rating column={'Overall'} rating={5} readonly={downloadingImage} />
            </div>

            <p className={styles.attribution}>gamerater.vercel.app</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={() => setDownloadingImage(true)} disabled={downloadingImage}>
            {downloadingImage ? 'Downloading...' : 'Download image'}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
