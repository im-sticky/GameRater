import {useEffect, useState, useRef} from 'react';
import Head from 'next/head';
import Script from 'next/script';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
import {Rating} from 'components/Rating';
import {Button} from 'components/Button';
import styles from 'styles/Home.module.scss';
import {Footer} from 'components/Footer';
import {CoverUpload} from 'components/CoverUpload';
import {Toast} from 'components/Toast';

function generateImage() {
  return html2canvas(document.getElementById('image-root'));
}

export default function Home() {
  const title = 'Game Rater';
  const description = 'Create bite-sized video game ratings and share them online with friends and followers';
  const gameNameRef = useRef();
  const [canCopy, setCanCopy] = useState(true);
  const [gameName, setGameName] = useState('');
  const [{isDownloading, isGenerating, isCopying, toastMessage, toastOpen, toastError}, setState] = useState({
    isDownloading: false,
    isGenerating: false,
    isCopying: false,
    toastMessage: null,
    toastOpen: false,
    toastError: false,
  });

  useEffect(() => {
    setCanCopy(!!window.navigator.clipboard && !!window.ClipboardItem);

    if (gameNameRef.current) {
      gameNameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isGenerating) {
      return;
    }

    generateImage().then((canvas) => {
      let toastMessage,
        toastError = false;

      if (isDownloading) {
        const link = document.createElement('a');

        link.download = `${gameName}-ratings.png`;
        link.target = '_blank';
        link.href = canvas.toDataURL();
        link.click();
        toastMessage = 'Downloading image!';
      } else if (isCopying) {
        try {
          canvas.toBlob((blob) => {
            navigator.clipboard.write([
              new ClipboardItem({
                'image/png': new Promise(async (resolve) => resolve(blob)),
              }),
            ]);
          });
          toastMessage = 'Copied image!';
        } catch (error) {
          console.error(error);
          toastMessage = 'Erroring copying image';
          toastError = true;
        }
      }

      setState((prevState) => ({
        ...prevState,
        isDownloading: false,
        isGenerating: false,
        isCopying: false,
        toastMessage,
        toastError,
        toastOpen: true,
      }));
    });
  }, [isGenerating]);

  useEffect(() => {
    if (toastOpen) {
      setTimeout(
        () =>
          setState((prevState) => ({
            ...prevState,
            toastOpen: false,
            toastError: false,
          })),
        2500
      );
    }
  }, [toastOpen]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://gamerater.vercel.app/ratings/5.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div id="image-root" className={clsx(styles.imageRoot, {[styles.generateImage]: isGenerating})}>
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
              setState((prevState) => ({
                ...prevState,
                isDownloading: true,
                isGenerating: true,
              }))
            }
            disabled={isGenerating}
          >
            {isDownloading ? 'Downloading...' : 'Download image'}
          </Button>

          {canCopy ? (
            <Button
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  isGenerating: true,
                  isCopying: true,
                }))
              }
              disabled={isGenerating}
            >
              {isCopying ? 'Copying...' : 'Copy image'}
            </Button>
          ) : null}
        </div>

        <Toast message={toastMessage} open={toastOpen} error={toastError} />
      </main>

      <Footer />

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-R6CHDCP9CM"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-R6CHDCP9CM');
        `}
      </Script>
    </div>
  );
}
