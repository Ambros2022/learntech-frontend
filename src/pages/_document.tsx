// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>

          <link rel='preconnect' href='https://fonts.googleapis.com'
            //@ts-ignore
            crossOrigin='true' />

          <link rel='preconnect' href='https://fonts.gstatic.com'
            //@ts-ignore
            crossOrigin='true' />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
            rel='stylesheet'
            media='print'
            //@ts-ignore
            onLoad="this.media='all'"
          />
          <link rel='logo' sizes='180x180' href='/images/Learntech200.webp' />
          <link rel='shortcut icon' href='/images/fav-icon.webp' />
          <link rel='icon' type='image/webp' href='/images/fav-icon.webp' />
          <Head>

            <link
              rel="preload"
              as="image"
              href="https://api.learntechww.com/banners/logo1734425264066.webp"
            />
            <link
              rel="preload"
              as="image"
              href="/_next/image/?url=https%3A%2F%2Fapi.learntechww.com%2Fbanners%2Flogo1734425264066.webp&w=1920&q=75"
            />

          </Head>

          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MHML8KVC');
              `
            }}
          />

          <script async src='https://www.googletagmanager.com/gtag/js?id=AW-990332405'></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-990332405');
      `
            }}
          />
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

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
      (
        <App
          {...props} // @ts-ignore
          emotionCache={cache}
        />
      )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
