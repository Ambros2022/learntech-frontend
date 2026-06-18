'use client'

import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'
import CollegeCard, { type CollegeItem } from 'src/components/colleges/CollegeCard'

interface Props {
  colleges: CollegeItem[]
  countrySlug: string
}

export default function AbroadCarouselClient({ colleges, countrySlug }: Props) {
  if (!colleges?.length) return null

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
        <CollegeCard key={college.id} college={college} linkPrefix={countrySlug} />
      ))}
    </EmblaCarousel>
  )
}
