'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BANKS = [
  { src: '/images/icons/uco.png', alt: 'UCO Bank' },
  { src: '/images/icons/canara-bank.png', alt: 'Canara Bank' },
  { src: '/images/icons/bandhanbank.png', alt: 'Bandhan Bank' },
  { src: '/images/icons/rbl.png', alt: 'RBL Bank' },
  { src: '/images/icons/hdfc.png', alt: 'HDFC Bank' },
]

// Duplicate slides to ensure seamless infinite looping when 5 slides are shown on desktop
const DUPLICATED_BANKS = [...BANKS, ...BANKS, ...BANKS]

export default function BankCarouselClient() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
      watchDrag: true,
      watchResize: true,
      duration: 30, // Snappy transitions
    },
    [
      Autoplay({
        delay: 1500, // Move 1 tab, stop for 1.2 seconds, and move again
        stopOnInteraction: false, // Resume autoplay after user clicks navigation arrows
        stopOnMouseEnter: true, // Pause autoplay when mouse hovers over carousel
      }),
    ]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="bank-carousel-container position-relative">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container d-flex">
            {DUPLICATED_BANKS.map((bank, index) => (
              <div key={index} className="embla__slide">
                <div className="bank-card">
                  <div className="bank-logo-wrapper">
                    <Image
                      src={bank.src}
                      width={150}
                      height={60}
                      alt={bank.alt}
                      loading="lazy"
                      style={{ objectFit: 'contain', width: '100%', height: '100%', maxHeight: '55px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styled raw blue chevron navigation arrows with comfortable spacing */}
      <button className="nav-arrow prev-arrow" onClick={scrollPrev} aria-label="Previous slide">
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>
      <button className="nav-arrow next-arrow" onClick={scrollNext} aria-label="Next slide">
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>

      <style dangerouslySetInnerHTML={{
        __html: `
        .bank-carousel-container {
          overflow: hidden;
          max-width: 100%;
          background-color: #f8fafc;
          border-radius: 16px;
          padding: 18px 0;
        }
        .bank-carousel-container .embla {
          position: relative;
          padding: 0 60px; /* Safe space to prevent cards touching arrows */
        }
        @media (min-width: 992px) {
          .bank-carousel-container .embla {
            padding: 0 64px; /* Spacious gutter on desktop */
          }
        }
        .bank-carousel-container .embla__viewport {
          overflow: hidden;
          width: 100%;
        }
        .bank-carousel-container .embla__container {
          margin-left: 0; /* Removed margin offsets to ensure perfect symmetry on both sides */
        }
        .bank-carousel-container .embla__slide {
          flex: 0 0 100%; /* Mobile: exactly 1 card */
          padding: 0 10px; /* Symmetric spacing to separate slides when dragging */
          min-width: 0;
        }
        @media (min-width: 768px) {
          .bank-carousel-container .embla__slide {
            flex: 0 0 33.333%; /* Tablet: exactly 3 cards */
            padding: 0 10px; /* Symmetric spacing */
          }
        }
        @media (min-width: 992px) {
          .bank-carousel-container .embla__slide {
            flex: 0 0 20%; /* Desktop: exactly 5 cards */
            padding: 0 12px; /* Symmetric spacing */
          }
        }
        .bank-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .bank-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }
        .bank-logo-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background: transparent !important;
          border: none !important;
          color: #274896;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: none !important;
          transition: transform 0.2s ease, color 0.2s ease;
          padding: 0;
        }
        .nav-arrow:hover {
          color: #1e3a8a;
          transform: translateY(-50%) scale(1.1);
        }
        .nav-arrow:active {
          transform: translateY(-50%) scale(0.9);
        }
        .prev-arrow {
          left: 16px; /* Positioned nicely with comfortable spacing from the cards */
        }
        .next-arrow {
          right: 16px;
        }
      `}} />
    </div>
  )
}
