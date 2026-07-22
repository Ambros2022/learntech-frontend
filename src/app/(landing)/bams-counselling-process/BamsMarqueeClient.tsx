'use client'

import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import styles from './BamsPage.module.css'

const MARQUEE_ITEMS = [
  'NEET-UG 2026',
  'AACCC All-India Counselling',
  'KEA Karnataka Counselling',
  '4 Rounds Per Body',
  'Expert 1-on-1 Guidance',
  'Post-Admission Support'
]

const DotSvg = () => (
  <svg viewBox="0 0 6 6" width="6" height="6">
    <circle cx="3" cy="3" r="3" fill="currentColor" />
  </svg>
)

export default function BamsMarqueeClient() {
  // Duplicate items for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 1.2, stopOnInteraction: false, stopOnMouseEnter: true })
  ])

  return (
    <div className={styles.marqueeSection} ref={emblaRef}>
      <div className={styles.marqueeTrack}>
        {items.map((text, i) => (
          <span key={i} className={styles.mItem}>
            <DotSvg />
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
