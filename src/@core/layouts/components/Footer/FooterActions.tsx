'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { LazyGlobalEnquiryForm } from 'src/app/components/ClientWrappers'

const Toster = dynamic(() => import('src/@core/components/popup/Toster'), { ssr: false })
import ApplyNowInjector from 'src/app/components/ApplyNowInjector'
export default function FooterActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > window.innerHeight / 2)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ApplyNowInjector />
      <div className='row container-fluid'>
        {/* Floating phone CTA */}
        <div className='text-md-start'>
          <a href='tel:18001208696' className='phone-icon' aria-label='Call us'>
            <Image src='/images/icons/Phone-blue.svg' width={35} height={35} alt='' aria-hidden='true' className='red-filter' />
          </a>
        </div>

        {/* Brochure download */}
        <div className='text-center pb-3'>
          <LazyGlobalEnquiryForm pagename='Brochure' title='Get Brochure' />
        </div>

        {/* Scroll-to-top + WhatsApp */}
        <div className='text-md-end'>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`arrowIcon ${showScrollTop ? 'show' : 'hide'}`}
            aria-label='Scroll to top'
          >
            <Image width={30} height={30} className='footer-arrow' src='/images/icons/left arrow.svg' alt='' aria-hidden='true' />
          </button>
          <a
            href='https://wa.me/+919036020076'
            target='_blank'
            rel='noopener noreferrer'
            className='whatsappIcon'
            aria-label='Chat on WhatsApp'
          >
            <Image width={35} height={35} className='footer-arrow' src='/images/icons/whatsapp.svg' alt='WhatsApp' />
          </a>
        </div>
      </div>
      <Toster />
    </>
  )
}
