import Script from 'next/script'
import ClientProviders from './components/ClientProviders'

import 'react-perfect-scrollbar/dist/css/styles.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata = {
  title: 'Study in India | Study Abroad | Learntech Edu Solutions',
  description: 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.',
  robots: 'index, follow',
  verification: { google: 'aiQptX_T_B2qlVcsMutbgRfaKWPDPPLANQi297oo8dA' },
  openGraph: {
    siteName: 'Learntech Edu Solutions',
    type: 'website',
    title: 'Study in India | Study Abroad | Learntech Edu Solutions',
    description: 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.',
    images: [`${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png`],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@learntechww',
    title: 'Study in India | Study Abroad | Learntech Edu Solutions',
    description: 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.',
    images: [`${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Learntech Edu Solutions Pvt. Ltd.',
    alternateName: 'Learntech Edu Solutions',
    url: baseUrl,
    logo: `${baseUrl}/images/icons/learntech-logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '1800 120 8696',
      contactType: 'customer service',
      contactOption: 'TollFree',
      areaServed: 'IN',
      availableLanguage: 'en',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Learntech Edu Solutions',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/colleges?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/webp" href="/images/fav-icon.webp" />
        <link rel="shortcut icon" href="/images/fav-icon.webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Learntech160.webp" />
        <link rel="preload" as="image" href="/images/icons/Learntech160.webp" />
        <link rel="preconnect" href="https://newapi.learntechww.com" />
        <link rel="dns-prefetch" href="https://newapi.learntechww.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHML8KVC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ClientProviders>{children}</ClientProviders>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MHML8KVC');`,
          }}
        />
        <Script id="googletagmanager" src="https://www.googletagmanager.com/gtag/js?id=AW-990332405" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-990332405');`}</Script>
      </body>
    </html>
  )
}
