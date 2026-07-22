import NewsLinkSection from './Components/NewsLinkSection'
import AnalysisSection from './Components/AnalysisSection'
import BannerSection from './Components/BannerSection'
import FeaturedCollegeSection from './Components/FeaturedCollegeSection'
import StudyAbroadSection from './Components/StudyAbroadSection'
import LatestNewsSection from './Components/LatestNewsSection'
import JsonLd from 'src/app/components/JsonLd'
import AnimateOnScroll from 'src/app/components/AnimateOnScroll'
import ExpertSection from './Components/ExpertSection'
import {
  LazyExploreSection,
} from 'src/app/components/ClientWrappers'
import type { CollegeItem } from 'src/components/colleges/CollegeCarouselClient'
import type { NewsOrBlogItem } from './Components/LatestNewsSection'
import type { Stream } from 'src/@core/components/popup/ExpertEnquiryForm'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''

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

interface NewsItem {
  id: number
  slug: string
  name: string
}

interface StudyAbroadData {
  countries: { id: number; name: string }[]
  colleges: CollegeItem[]
  countryId: number | null
}

interface LatestNewsData {
  news: NewsOrBlogItem[]
  banner: { image: string } | null
}

interface HomepageProps {
  banners: Banner[]
  news: NewsItem[]
  studyAbroad: StudyAbroadData
  latestNews: LatestNewsData
  expertStreams: Stream[]
}

export default function Homepage({ banners, news, studyAbroad, latestNews, expertStreams }: HomepageProps) {
  return (
    <>

      <JsonLd schema={localBusinessSchema} id='local-business' />
      <JsonLd schema={founderSchema} id='founder' />
      <BannerSection banners={banners} />
      <NewsLinkSection items={news} />

      <AnimateOnScroll variant='fade-up'>
        <AnalysisSection />
      </AnimateOnScroll>

      {/* ── Below the fold — fully lazy, off the critical path ── */}
      <AnimateOnScroll variant='fade-up'>
        {/* @ts-expect-error async server component */}
        <FeaturedCollegeSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant='fade-up' delay={0.05}>
        {/* H1 is server-rendered for SEO; interactive tabs/cards are client-lazy */}
        <section className='exploreCon'>
          <div className='container py-4 py-md-5'>
            <h1 className='fw-bold text-blue text-center mb-4 h2sizeadded'>
              Discover Colleges, Courses and Exams that Matches with Your Aspirations
            </h1>
            <LazyExploreSection />
          </div>
        </section>
      </AnimateOnScroll>
      <AnimateOnScroll variant='fade-up' delay={0.05}>
        <StudyAbroadSection
          countries={studyAbroad.countries}
          initialColleges={studyAbroad.colleges}
          initialCountryId={studyAbroad.countryId}
        />
      </AnimateOnScroll>


      <AnimateOnScroll variant='fade-up' delay={0.05}>
        <LatestNewsSection initialNews={latestNews.news} banner={latestNews.banner} />
      </AnimateOnScroll>

      <AnimateOnScroll variant='fade-up' delay={0.05}>
        <ExpertSection streams={expertStreams} />
      </AnimateOnScroll>
    </>
  )
}
