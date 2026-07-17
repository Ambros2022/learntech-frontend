'use client'

import React from 'react'
import Image from 'next/image'
import SideContactUsForm from 'src/@core/components/popup/SideContactUsForm'

interface TalkToExpertsSectionProps {
  heading: string
  isH1?: boolean
  imageWidth?: number
  imageHeight?: number
  leftColClass?: string
  rightColClass?: string
  imgWrapperClass?: string
}

export default function TalkToExpertsSection({
  heading,
  isH1 = false,
  imageWidth = 700,
  imageHeight = 700,
  leftColClass = 'col-md-7 col-xl-7 col-lg-7',
  rightColClass = 'col-md-5 col-xl-5 col-lg-5 border rounded px-xl-5 px-lg-4 col-10 mx-md-0 mx-auto',
  imgWrapperClass = 'text-center h-100 d-flex justify-content-start servicesImg',
}: TalkToExpertsSectionProps) {
  const HeadingTag = isH1 ? 'h1' : 'h2'

  return (
    <section className='bg-skyBlue py-5'>
      <div className="container">
        <div className="row">
          <div className={leftColClass}>
            <div className={imgWrapperClass}>
              <Image
                src='/images/icons/ServicePage.webp'
                width={imageWidth}
                height={imageHeight}
                alt='services'
                className='align-self-center img-fluid'
                loading='lazy'
              />
            </div>
          </div>
          <div className={rightColClass}>
            <HeadingTag className='pt-3 mb-3 fw-bold text-blue text-center'>
              {heading}
            </HeadingTag>
            <SideContactUsForm />
          </div>
        </div>
      </div>
    </section>
  )
}
