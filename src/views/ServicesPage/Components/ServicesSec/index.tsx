import React from 'react'
import { LazyTalkToExpertsSection } from 'src/app/components/ClientWrappers'

export default function ServicesSec() {
  return (
    <LazyTalkToExpertsSection
      heading="Interested in Our Services?"
      isH1={true}
      imageWidth={600}
      imageHeight={600}
      leftColClass="col-md-6 col-xl-7 col-lg-7 col-10 mx-auto"
      rightColClass="service col-md-6 col-xl-5 col-10 mx-auto h-100 col-lg-5 border rounded px-xl-5 px-lg-4 col-10 mx-md-0 me-auto pb-3"
      imgWrapperClass="d-flex justify-content-start servicesImg"
    />
  )
}
