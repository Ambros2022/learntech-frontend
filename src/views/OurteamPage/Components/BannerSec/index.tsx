import Link from 'next/link'


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
      <section className='linkFontSize bg-white py-2'>
        <div className="container">
          <Link href='/' className='text-black'>
            Home <i className='bi bi-chevron-right'></i>
          </Link>
          <span className='text-blue'> Our Team</span>
        </div>
      </section>
    </>
  )
}

export default BannerSec