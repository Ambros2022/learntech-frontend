'use client'

import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'
import SchoolCard, { type SchoolItem } from 'src/components/schools/SchoolCard'

export default function SchoolsCarouselClient({ schools }: { schools: SchoolItem[] }) {
  if (!schools.length) return null

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
      {schools.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </EmblaCarousel>
  )
}
