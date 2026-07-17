import BannerSec from './Components/BannerSec'
import ContactUsSec from './Components/ContactUsSec'
import JourneySec from './Components/JourneySec'
import OurPortalSec from './Components/OurPortalsSec'
import Overview from './Components/Overview'
import TestimonialSec, { Testimonial } from './Components/TestimonialSec'

type AboutUsPageProps = {
  banners: any[]
  testimonials: Testimonial[]
}

const AboutUsPage = ({ banners, testimonials }: AboutUsPageProps) => {
  return (
    <>
      <BannerSec banners={banners} />
      <Overview />
      <JourneySec />
      <TestimonialSec testimonials={testimonials} />
      <OurPortalSec />
      <ContactUsSec />
    </>
  )
}

export default AboutUsPage
