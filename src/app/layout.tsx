import Script from 'next/script'
import ClientProviders from './components/ClientProviders'
import poppins from 'src/fonts'

// Load order matters: Bootstrap first, globals.css last so our overrides always win. 
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

// --- Structured Data (module-level: defined once, not on every request) ---

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Learntech Edu Solutions Pvt. Ltd.',
  alternateName: 'Learntech Edu Solutions',
  url: BASE_URL,
  logo: `${BASE_URL}/images/icons/learntech-logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '1800 120 8696',
    contactType: 'customer service',
    contactOption: 'TollFree',
    areaServed: 'IN',
    availableLanguage: 'en',
  },
  sameAs: [
    'https://www.facebook.com/learntechedu',
    'https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/',
    'https://www.instagram.com/learntechedus',
    'https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Learntech Edu Solutions',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/colleges?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// --- GTM snippet (string constant so it's not re-created on each render) ---

const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MHML8KVC');`

const GTAG_INIT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-990332405');`

// --- SEO Metadata ---

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Study in India | Study Abroad | Learntech Edu Solutions',
  description:
    'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.',
  robots: 'index, follow',
  verification: { google: 'aiQptX_T_B2qlVcsMutbgRfaKWPDPPLANQi297oo8dA' },
  icons: {
    icon: '/images/fav-icon.webp',
    shortcut: '/images/fav-icon.webp',
    apple: [{ url: '/images/Learntech160.webp', sizes: '180x180' }],
  },
  openGraph: {
    siteName: 'Learntech Edu Solutions',
    type: 'website',
    title: 'Study in India | Study Abroad | Learntech Edu Solutions',
    description:
      'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.',
    images: [{ url: '/images/icons/learntech-logo.png', width: 1200, height: 630, alt: 'Learntech Edu Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@learntechww',
    title: 'Study in India | Study Abroad | Learntech Edu Solutions',
    description:
      'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.',
    images: ['/images/icons/learntech-logo.png'],
  },
}

// --- Root Layout ---

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NODE_ENV === 'production'

  return (
    <html lang="en" data-scroll-behavior="smooth" className={poppins.className}>
      <head>
        {/* Performance: early connection to API/image CDN */}
        <link rel="preconnect" href="https://newapi.learntechww.com" />
        <link rel="dns-prefetch" href="https://newapi.learntechww.com" />

        {/* LCP hint — must match the exact src used in Header/index.tsx */}
        <link rel="preload" as="image" href="/images/Learntech160.webp" />

        {/* Structured data */}
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
        {/* GTM noscript fallback — production only */}
        {isProd && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MHML8KVC"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <ClientProviders>{children}</ClientProviders>

        {/* Analytics — production only (prevents Meta Pixel / GTM noise in dev) */}
        {isProd && (
          <>
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }}
            />
            <Script
              id="gtag-src"
              src="https://www.googletagmanager.com/gtag/js?id=AW-990332405"
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {GTAG_INIT}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
