import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import '@/styles/globals.css';

let rawdata = require('../messages/en.json');

let langCode = "en"
let langObject = {}
langObject[langCode] = {}

langObject[langCode].translation = rawdata
i18n
  .use(initReactI18next)
  .init({
    resources: langObject,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

/*
 Next.js uses the App component to initialize pages.
 To override the default App, create the file pages/_app.js as shown below:

 export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
*/
const App = ({ Component, pageProps }) => {

  return (
    <SessionProvider session={pageProps.session}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
