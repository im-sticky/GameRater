import 'normalize.css/normalize.css';
import '../styles/globals.scss';
import {GoogleAnalytics, usePageViews} from 'nextjs-google-analytics';

function MyApp({Component, pageProps}) {
  usePageViews();

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
