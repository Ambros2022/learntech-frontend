import Image from 'next/image'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import styles from "src/views/AboutUsPage/aboutUsPage.module.css";

type Banner = {
  image?: string
}

type BannerSecProps = {
  banners: Banner[]
}

const BannerSec = ({ banners }: BannerSecProps) => {
  return (
    <>
      <section className={styles.aboutUsPageSec + ' position-relative d-flex justify-content-center'}>
        {banners.map((banner, index) =>
          banner.image ? (
            <Image
              key={`${banner.image}-${index}`}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
              alt="Learntech Edu Solutions about us banner"
              width={1700}
              height={300}
              priority={index === 0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'cover' }}
            />
          ) : null,
        )}

        <div
          className={'position-absolute w-100 h-100 d-flex justify-content-center ' + styles.AdvertiseBanner}
          style={{ top: '0px' }}
        >
          <div className="container d-flex justify-content-center h-100 w-100 ">
            <div className="align-content-center" >
              <div className="py-5 text-center">
                <h1
                  className="fw-bold text-white mb-3 rounded p-3"
                  style={{ backgroundColor: 'rgb(37,70,146)' }}
                >
                  About Learntech Edu Solutions
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'About Us' }]} />
    </>
  )
}

export default BannerSec
