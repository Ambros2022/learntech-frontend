// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Favicon and logo */}
          <link rel="icon" type="image/webp" href="/images/fav-icon.webp" />
          <link rel="shortcut icon" href="/images/fav-icon.webp" />
          <link rel="logo" sizes="180x180" href="/images/Learntech160.webp" />
          <link rel="preload" as="image" href="/images/icons/Learntech160.webp" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-MHML8KVC'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
