import Image from 'next/image'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

const BannerSec = () => {
  return (
    <>
      <section className="AdvertiseBanner">
        <Image
          src="/images/icons/handshake.webp"
          alt="Advertise with Learntech Edu Solutions"
          width={1400}
          height={300}
          priority
          sizes="100vw"
          className="img-fluid"
          style={{ width: '100%', height: 'auto' }}
        />
      </section>
      <Breadcrumb items={[{ label: 'Advertise With Us' }]} />
    </>
  )
}

export default BannerSec
