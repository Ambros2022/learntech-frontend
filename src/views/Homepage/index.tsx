import NewsLinkSection from './Components/NewsLinkSection'
import AnalysisSection from './Components/AnalysisSection'
import BannerSection from './Components/BannerSection'
import JsonLd from 'src/app/components/JsonLd'
import AnimateOnScroll from 'src/app/components/AnimateOnScroll'
import {
  LazyFeaturedCollegeSection,
  LazyExploreSection,
  LazyStudyAbroadSection,
  LazyLatestNewsSection,
  LazyExpertSection,
} from 'src/app/components/ClientWrappers'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const IMG_URL  = process.env.NEXT_PUBLIC_IMG_URL  || ''

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Learntech Edu Solutions Pvt. Ltd.',
  image: `${BASE_URL}/_next/image/?url=%2Fimages%2Ficons%2Flearntech-logo.png&w=256&q=75`,
  '@id': `${BASE_URL}/#organization`,
  url: `${BASE_URL}/`,
  telephone: '1800 120 8696',
  address: {
    '@type': 'PostalAddress',
    streetAddress: "#80 (4), 'D' Main Rd, East End, 9th Block, Jayanagar",
    addressLocality: 'Bangalore',
    postalCode: '560041',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 12.9204609, longitude: 77.5920295 },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '19:00',
  },
  sameAs: [
    'https://www.facebook.com/learntechedu',
    'https://twitter.com/learntechww',
    'https://www.instagram.com/learntechedus',
    'https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w',
    'https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/',
  ],
}

const founderSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Person',
  name: 'Mansoor Ali',
  url: `${BASE_URL}/about-us`,
  image: `${BASE_URL}/_next/image/?url=%2Fimages%2Ficons%2FMansoorAli.jpeg&w=640&q=75`,
  jobTitle: 'Founder, Chairman and Managing Director',
  worksFor: { '@type': 'Organization', name: 'Learntech Edu Solutions Pvt. Ltd.' },
}

interface Banner {
  image: string
  link: string
  alt?: string
}

interface HomepageProps {
  banners: Banner[]
}

export default function Homepage({ banners }: HomepageProps) {
  return (
    <>

      <JsonLd schema={localBusinessSchema} id='local-business' />
      <JsonLd schema={founderSchema} id='founder' />
      <BannerSection banners={banners} />

      <NewsLinkSection />

      {/* <AnimateOnScroll variant='fade-up'>
        <AnalysisSection />
      </AnimateOnScroll> */}

      {/* ── Below the fold — fully lazy, off the critical path ── */}
      {/* <AnimateOnScroll variant='fade-up'>
        <LazyFeaturedCollegeSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant='fade-up' delay={0.05}>
        <LazyExploreSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant='fade-up' delay={0.05}>
        <LazyStudyAbroadSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant='fade-up' delay={0.05}>
        <LazyLatestNewsSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant='fade-up' delay={0.05}>
        <LazyExpertSection />
      </AnimateOnScroll> */}
    </>
  )
}
