import Image from 'next/image'
import BannerSearchClient from './BannerSearchClient'
import BannerEnquiryFormClient from './BannerEnquiryFormClient'
import { LazyBannerCarousel } from 'src/app/components/ClientWrappers'
import styles from './Banner.module.css'

interface Banner {
  image: string
  link: string
  alt?: string
}

export default function BannerSection({ banners }: { banners: Banner[] }) {
  const firstBanner = banners?.[0]

  return (
    <section className={`bannerCon bg-formClr ${styles.section}`}>

      {/* imageArea: relative on mobile (gives flow height), absolute on desktop */}
      <div className={styles.imageArea}>
        {/* Server-rendered first image — in HTML immediately, drives LCP score */}
        {firstBanner?.image && (
          <a href={firstBanner.link || '#'} className={`HomebannerLink ${styles.imgLink}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${firstBanner.image}`}
              alt={firstBanner.alt || 'Learntech education banner'}
              fill
              priority
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </a>
        )}

        {/* Client carousel mounts after hydration, seamlessly replaces static image */}
        <LazyBannerCarousel banners={banners} />
      </div>

      {/* Overlay: search section (left) + enquiry form (right) */}
      <div className="bannerFormSec">
        <div className="container-fluid">
          <div className="container">
            <div className="row">

              <div className="col-md-6 col-lg-6 mb-5 d-flex">
                <div className="searchSec align-content-center" style={{ zIndex: 50 }}>
                  <div className="outlineSec">
                    <h3 className="fw-bold text-blue mb-3 searchnewh3">
                      Unlock a World of Academic Opportunities
                    </h3>
                    <BannerSearchClient />
                  </div>
                </div>
              </div>

              <div className="col-md-5 col-lg-5 ps-xl-5 ps-lg-5 ms-auto mb-5" style={{ zIndex: 40 }}>
                <div className="searchForm">
                  <h2 className="pb-3 fw-bold text-center text-blue">
                    Start Your Journey with Expert Guidance!
                  </h2>
                  <BannerEnquiryFormClient />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
