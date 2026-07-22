import Image from 'next/image'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''

const BannerSec = ({ data }: { data: any }) => {
  return (
    <>
      <section className="newsBannerSec">
        <div className="position-relative">
          <Image
            src={`${IMG_URL}/${data.banner_image}`}
            width={1400}
            height={400}
            alt={data?.name || 'news-banner'}
            className="position-relative w-100"
            priority
          />
        </div>
      </section>

      <Breadcrumb
        items={[
          { label: 'News', href: '/news' },
          { label: data?.name },
        ]}
      />
    </>
  )
}

export default BannerSec