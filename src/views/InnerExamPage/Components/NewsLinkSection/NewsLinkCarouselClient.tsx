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

const btnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  padding: '0 6px',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  opacity: 0.85,
}

export default function NewsLinkCarouselClient({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 2500, stopOnInteraction: false })],
  )

  const [slidesToShow, setSlidesToShow] = useState(4)

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

  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, slidesToShow])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
      }}
    >
      {/* Prev arrow */}
      <button
        style={btnStyle}
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous news"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Embla viewport */}
      <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }} ref={emblaRef}>
        <div style={{ display: 'flex' }}>
          {items.map((item) => (
            <div
              key={item.id}
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

      {/* Next arrow */}
      <button
        style={btnStyle}
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next news"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  )
}
