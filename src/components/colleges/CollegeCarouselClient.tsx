'use client'

import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'
import CollegeCard, { type CollegeItem } from './CollegeCard'

export type { CollegeItem }

export default function CollegeCarouselClient({ colleges }: { colleges: CollegeItem[] }) {
  if (!colleges.length) return null

  return (
    <EmblaCarousel
      slidesToShowDesktop={4}
      slidesToShowTablet={2}
      slidesToShowMobile={1}
      autoplay
      autoplayDelay={2500}
      showDots={false}
      showArrows
      loop
    >
      {colleges.map(college => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </EmblaCarousel>
  )
}
