import {useEffect, useState, useRef} from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
import {Rating} from 'components/Rating';
import {Button} from 'components/Button';
import styles from 'styles/Home.module.scss';
import {Footer} from 'components/Footer';
import {CoverUpload} from 'components/CoverUpload';

function generateImage() {
  return html2canvas(document.getElementById('image-root'));
}

export default function Home() {
  const gameNameRef = useRef();
  const [canCopy, setCanCopy] = useState(true);
  const [gameName, setGameName] = useState('');
  const [{isDownloading, isGenerating, isCopying}, setState] = useState({
    isDownloading: false,
    isGenerating: false,
    isCopying: false,
  });

  useEffect(() => {
    setCanCopy(!!window.navigator.clipboard && !!window.ClipboardItem);

    if (gameNameRef.current) {
      gameNameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    generateImage().then((canvas) => {
      if (isDownloading) {
        const link = document.createElement('a');

        link.download = `${gameName}-ratings.jpg`;
        link.target = '_blank';
        link.href = canvas.toDataURL();
        link.click();
      } else if (isCopying) {
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
        isDownloading: false,
        isGenerating: false,
        isCopying: false,
      });
    });
  }, [isGenerating]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Game Rater</title>
        <meta name="description" content="Create and share bite-sized video game rating images" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Game Rater</h1>
        <p className={styles.description}>Create and share bite-sized video game rating images</p>

        <div id="image-root" className={clsx({[styles.generateImage]: isGenerating})}>
          <CoverUpload isGenerating={isGenerating} gameName={gameName} />

          <div className={styles.ratingsContainer}>
            {isGenerating ? (
              <h2 className={styles.gameName}>{gameName}</h2>
            ) : (
              <input
                ref={gameNameRef}
                type="text"
                className={styles.gameName}
                defaultValue={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Enter a game name"
              />
            )}
            <div className={styles.ratingsColumns}>
              <Rating column={'Gameplay'} rating={1} readonly={isGenerating} />
              <Rating column={'Narrative'} rating={2} readonly={isGenerating} />
              <Rating column={'Graphics'} rating={3} readonly={isGenerating} />
              <Rating
                column={'X-Factor'}
                rating={4}
                info="Uniqueness, new ideas, or things that set it apart."
                readonly={isGenerating}
              />
              <Rating column={'Overall'} rating={5} readonly={isGenerating} />
            </div>

            <p className={styles.attribution}>gamerater.vercel.app</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            onClick={() =>
              setState({
                isDownloading: true,
                isGenerating: true,
                isCopying: false,
              })
            }
            disabled={isGenerating}
          >
            {isDownloading ? 'Downloading...' : 'Download image'}
          </Button>

          {canCopy ? (
            <Button
              onClick={() =>
                setState({
                  isDownloading: false,
                  isGenerating: true,
                  isCopying: true,
                })
              }
              disabled={isGenerating}
            >
              {isCopying ? 'Copying...' : 'Copy image'}
            </Button>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
