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

function generateImage() {
  return html2canvas(document.getElementById('image-root'));
}

export default function Home() {
  const [canCopy, setCanCopy] = useState(true);
  const [gameName, setGameName] = useState('');
  const [coverFile, setCoverFile] = useState();
  const [{downloading, generating, copying}, setState] = useState({
    downloading: false,
    generating: false,
    copying: false,
  });

  useEffect(() => {
    setCanCopy(!!window.navigator.clipboard && !!window.ClipboardItem);
  }, []);

  useEffect(() => {
    generateImage().then((canvas) => {
      if (downloading) {
        const link = document.createElement('a');

        link.download = `${gameName}-ratings.jpg`;
        link.target = '_blank';
        link.href = canvas.toDataURL();
        link.click();
      } else if (copying) {
        try {
          canvas.toBlob((blob) => {
            navigator.clipboard.write([
              new ClipboardItem({
                'image/png': new Promise(async (resolve) => resolve(blob)),
              }),
            ]);
          });
        } catch (error) {
          console.error(error);
        }
      }

      setState({
        downloading: false,
        generating: false,
        copying: false,
      });
    });
  }, [generating]);

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
              [styles.downloading]: generating,
            })}
          >
            {coverFile ? (
              <img src={URL.createObjectURL(coverFile)} alt={`${gameName} cover art`} />
            ) : (
              <span className={clsx(styles.label, {hidden: generating})}>
                <span className={styles.labelText}>
                  <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon} />
                  Upload a cover image (Optional)
                </span>
              </span>
            )}

            {!generating ? (
              <input id="cover-upload" type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
            ) : null}
          </label>

          <div className={styles.ratingsContainer}>
            {generating ? (
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
              <Rating column={'Gameplay'} rating={1} readonly={generating} />
              <Rating column={'Narrative'} rating={2} readonly={generating} />
              <Rating column={'Graphics'} rating={3} readonly={generating} />
              <Rating
                column={'X-Factor'}
                rating={4}
                info="Uniqueness, cool concepts, atmosphere."
                readonly={generating}
              />
              <Rating column={'Overall'} rating={5} readonly={generating} />
            </div>

            <p className={styles.attribution}>gamerater.vercel.app</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            onClick={() =>
              setState({
                downloading: true,
                generating: true,
                copying: false,
              })
            }
            disabled={generating}
          >
            {downloading ? 'Downloading...' : 'Download image'}
          </Button>

          {canCopy ? (
            <Button
              onClick={() =>
                setState({
                  downloading: false,
                  generating: true,
                  copying: true,
                })
              }
              disabled={generating}
            >
              {downloading ? 'Copying...' : 'Copy image'}
            </Button>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
