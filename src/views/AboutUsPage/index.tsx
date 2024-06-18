import React from 'react'
import BannerSec from './Components/BannerSec'
import Overview from './Components/Overview'
import JourneySec from './Components/JourneySec'
import TestimonialSec from './Components/TestimonialSec'
import OurPortalSec from './Components/OurPortalsSec'
import ContactUsSec from './Components/ContactUsSec'

const AboutUsPage = () => {
  return (
    <>
        <BannerSec/>
        <Overview/>
        <JourneySec/>
        <TestimonialSec/>
        <OurPortalSec/>
        <ContactUsSec/>
    </>
  )
}

export default AboutUsPage