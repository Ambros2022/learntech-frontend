'use client'

import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'
import CollegeCard, { type CollegeItem } from 'src/components/colleges/CollegeCard'

export type { CollegeItem as UniversityItem }

export default function UniversityCarouselClient({ universities }: { universities: CollegeItem[] }) {
  if (!universities.length) return null

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
      slidePadding={20}
    >
      {universities.map(u => (
        <CollegeCard key={u.id} college={u} linkPrefix="university" />
      ))}
    </EmblaCarousel>
  )
}
