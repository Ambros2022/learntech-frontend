import { Breadcrumb } from 'src/app/components/Breadcrumb'

const BannerSec = ({ banners = [] }: { banners?: any[] }) => {
  return (
    <>
      <section className='teamworksec'>
        {banners?.map((banner, index) => (
          <img
            key={banner.id || index}
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
            // priority={true}
            alt={`Banner ${index}`}
            height={300}
            width={1400}
          />
        ))}
      </section>
      <Breadcrumb items={[{ label: 'Our Team' }]} />
    </>
  )
}

export default BannerSec