'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NewsItem {
  id: number
  slug: string
  name: string
}

interface Props {
  items: NewsItem[]
}

export default function NewsLinkCarouselClient({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 2500, stopOnInteraction: false })],
  )

  const [slidesToShow, setSlidesToShow] = useState(4)

  // Responsive breakpoints
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w <= 576) setSlidesToShow(1)
      else if (w <= 991) setSlidesToShow(2)
      else setSlidesToShow(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Reinit Embla when slide count changes
  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, slidesToShow])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="react-multi-carousel-list carousel-container position-relative" style={{ width: '100%' }}>
      {/* 
        Override CSS rules to ensure absolute symmetry and correct positioning 
        across all viewports and browser zoom levels.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .newsLinkSec2 .carousel-button-group {
              left: 0 !important;
              right: 0 !important;
              width: 100% !important;
              margin: 0 auto !important;
              position: absolute !important;
              top: 30% !important;
              z-index: 20 !important;
              pointer-events: none !important; /* Allow clicking cards between arrows */
            }
            .newsLinkSec2 .fi-left,
            .newsLinkSec2 .fi-right {
              pointer-events: auto !important; /* Keep buttons clickable */
              z-index: 20 !important;
            }
            .newsLinkSec2 .fi-left {
              margin-left: -50px !important;
            }
            .newsLinkSec2 .fi-right {
              margin-right: -50px !important;
            }
            @media (max-width: 767px) {
              .news-links-embla-viewport {
                width: 240px !important;
                margin: 0 auto !important;
                overflow: hidden !important;
              }
              .news-links-embla-viewport .card {
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .newsLinkSec2 .carousel-button-group {
                width: 240px !important;
                left: 0 !important;
                right: 0 !important;
                margin: 0 auto !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
              }
              .newsLinkSec2 .fi-left {
                margin-left: -60px !important;
              }
              .newsLinkSec2 .fi-right {
                margin-right: -60px !important;
              }
            }
          `,
        }}
      />

      {/* Custom arrow button group positioned absolutely relative to .react-multi-carousel-list */}
      <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
        <span className="fi-left" onClick={scrollPrev}>
          <ChevronLeft style={{ cursor: 'pointer' }} />
        </span>
        <span className="fi-right" onClick={scrollNext}>
          <ChevronRight style={{ cursor: 'pointer' }} />
        </span>
      </div>

      {/* Embla Viewport - handles slides clipping */}
      <div className="news-links-embla-viewport" style={{ overflow: 'hidden', width: '100%' }} ref={emblaRef}>
        <div className="react-multi-carousel-track d-flex" style={{ display: 'flex' }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="react-multi-carousel-item"
              style={{
                flex: `0 0 ${100 / slidesToShow}%`,
                padding: '0 8px',
                boxSizing: 'border-box',
                minWidth: 0,
              }}
            >
              <Link
                href={`/news/${item.id}/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div className="card mx-2 cardHeight">
                  <h6
                    className="py-2 mx-auto newsLink2Clr bg-white text-blue rounded text-center"
                    style={{ maxWidth: '200px', zIndex: 40 }}
                  >
                    {item.name}
                  </h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
