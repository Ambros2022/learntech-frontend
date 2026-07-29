'use client'

import Image from 'next/image'
import Link from 'next/link'
import EmblaTabCarousel from 'src/components/ui/Embla/EmblaTabCarousel'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL ?? '').replace(/\/+$/, '')

interface GeneralCourse {
  id: number
  short_name: string
  slug: string
  streams: { id: number; slug: string; logo: string }
}

export default function PopularCoursesCarouselClient({ courses }: { courses: GeneralCourse[] }) {
  return (
    <EmblaTabCarousel
      slidesToShowDesktop={6}
      slidesToShowTablet={4}
      slidesToShowMobile={1}
      showDots={false}
      loop
      autoplay
      autoplayDelay={2000}
    >
      {courses.map(course => (
        <Link key={course.id} href={`/course/${course.streams.id}/${course.streams.slug}/${course.slug}`}>
          <div className='courseConCarousel'>
            <div className="card hover-card text-center d-flex mx-2">
              <div className="row flex-fill">
                <div className="col-12">
                  <Image
                    width={70}
                    height={70}
                    src={`${IMG_URL}/${course.streams.logo}`}
                    className="p-2 img-fluid mx-auto mt-3"
                    alt={course.short_name}
                    loading="lazy"
                  />
                </div>
                <div className="col-12 text-center px-0">
                  <div className="card-body d-flex text-center justify-content-center">
                    <h6 className="card-title flex-fill text-truncate">{course.short_name}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </EmblaTabCarousel>
  )
}
