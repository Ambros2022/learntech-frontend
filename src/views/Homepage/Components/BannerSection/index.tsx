import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'
import BannerCarouselClient from './BannerCarouselClient'
import styles from './Banner.module.css'

interface Banner {
  image: string
  link?: string
  alt?: string
}

export default function BannerSection({ banners }: { banners?: Banner[] }) {
  const firstBanner = banners?.[0]
  const firstBannerImg = firstBanner?.image
    ? firstBanner.image.startsWith('http') || firstBanner.image.startsWith('/')
      ? firstBanner.image
      : `${process.env.NEXT_PUBLIC_IMG_URL}/${firstBanner.image}`
    : null

  return (
    <section className={styles.hero}>
      {/* Preload hero banner image for fast LCP */}
      {firstBannerImg && <link rel="preload" as="image" href={firstBannerImg} />}

      {/* Background blur decorative orbs */}
      <div className={styles.heroDecor} aria-hidden="true">
        <span className={styles.c1} />
        <span className={styles.c2} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left: Heading, Subtitle & CTA */}
          <div className={`col-lg-6 ${styles.leftCol}`}>
            <h3 className={styles.heroHeading}>
              Confused which <span className={styles.accent}>College</span> is right for you?{' '}
              We&apos;ll help you <span className={styles.accent}>Decide.</span>
            </h3>

            <h4 className={styles.heroSubtext}>
              Personal counselling on admissions, courses and study abroad, from a team that has
              guided students into 500+ colleges across India.
            </h4>

            <GlobalPopupEnquiry
              className={styles.btnOutlineCounselling}
              buttonText={
                <h4>
                  Find Your College Now <i className="bi bi-arrow-right" />
                </h4>
              }
            />
          </div>

          {/* Right: Carousel visual frame */}
          <div className="col-lg-6">
            <div className={styles.heroVisual}>
              <div className={styles.accentDot} aria-hidden="true" />
              <div className={styles.carouselWrap}>
                <BannerCarouselClient banners={banners} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
