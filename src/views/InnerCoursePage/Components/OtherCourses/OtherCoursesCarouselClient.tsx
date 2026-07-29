'use client'

import Link from 'next/link'
import Image from 'next/image'
import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

interface Stream {
  id: number
  slug: string
  name: string
  logo: string
}

export default function OtherCoursesCarouselClient({ streams }: { streams: Stream[] }) {
  return (
    <EmblaCarousel
      slidesToShowDesktop={7}
      slidesToShowTablet={2}
      slidesToShowMobile={1}
      showDots={false}
      loop
      autoplay
      autoplayDelay={1500}
    >
      {streams.map(stream => (
        <Link href={`/course/${stream.id}/${stream.slug}`} key={stream.id}>
          <div className='courseConCarousel'>
            <div className="card hover-card text-center d-flex mx-2">
              <div className="row flex-fill">
                <div className="col-12">
                  <Image
                    width={70}
                    height={70}
                    src={`${IMG_URL}/${stream.logo}`}
                    className="p-2 img-fluid mx-auto mt-3"
                    alt={stream.name}
                    loading="lazy"
                  />
                </div>
                <div className="col-12 text-center px-0">
                  <div className="card-body d-flex text-center justify-content-center">
                    <h6 className="card-title flex-fill text-truncate">{stream.name}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </EmblaCarousel>
  )
}
