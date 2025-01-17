/* eslint-disable @next/next/no-sync-scripts */
// ** React Imports
import { ReactNode, useEffect } from 'react';

// ** Next Imports
import Head from 'next/head';
import { Router } from 'next/router';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// ** Loader Import
import NProgress from 'nprogress';

// ** Emotion Imports
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';

// ** Config Imports
import themeConfig from 'src/configs/themeConfig';

// ** Fake-DB Import
import 'src/@fake-db';

// ** Third Party Import
import { Toaster } from 'react-hot-toast';

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import AuthGuard from 'src/@core/components/auth/AuthGuard';
import GuestGuard from 'src/@core/components/auth/GuestGuard';

import Script from 'next/script';

// ** Spinner Import
import Spinner from 'src/@core/components/spinner';

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'; // Rename AuthProvider from your context
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast';

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';

// ** Prismjs Styles
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css';

import 'src/iconify-bundle/icons-bundle-react';

// ** Global css styles
import '../../styles/globals.css';

// ** Bootstrap css and js
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.min.js');
  }, []);

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Study in India | Study Abroad | Learntech Edu Solutions</title>
          <meta
            name='description'
            content='Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'
          />
          <meta name='keywords' content='Learntechweb' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" />
          
          <script type="application/ld+json">
            {JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Learntech Edu Solutions Pvt. Ltd.",
                "alternateName": "Learntech Edu Solutions",
                "url": `${process.env.NEXT_PUBLIC_WEB_URL}`,
                "logo": `${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png`,
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "1800 120 8696",
                  "contactType": "customer service",
                  "contactOption": "TollFree",
                  "areaServed": "IN",
                  "availableLanguage": "en"
                }
              }
            )}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(
              {
                "@context": "https://schema.org/",
                "@type": "WebSite",
                "name": "Learntech Edu Solutions",
                "url": `${process.env.NEXT_PUBLIC_WEB_URL}`,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "{search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            )}
          </script>

          <meta name="google-site-verification" content="aiQptX_T_B2qlVcsMutbgRfaKWPDPPLANQi297oo8dA" />
        </Head>
        <SessionProvider session={pageProps.session}> {/* Wrap with SessionProvider */}
          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <GoogleOAuthProvider clientId="605863392131-ftqj61h4djtrt0d0aa0dtjuo5lcbt7km.apps.googleusercontent.com">
                      <ThemeComponent settings={settings}>
                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                          {getLayout(<Component {...pageProps} />)}
                        </Guard>
                        <ReactHotToast>
                          <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                        </ReactHotToast>
                      </ThemeComponent>
                    </GoogleOAuthProvider>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </SessionProvider>
      </CacheProvider>
      <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></Script>
    </>
  );
};

export default App;
