import Image from 'next/image'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL ?? '').replace(/\/+$/, '')

export default function BannerSec({ banners }: { banners: any[] }) {
    if (!banners?.length) return null
    return (
        <section className='bg-white overflow-hidden'>
            {banners.map((banner, index) => (
                <div
                    key={banner.id ?? index}
                    className='position-relative w-100 overflow-hidden'
                    style={{ minHeight: 300 }}
                >
                    <Image
                        src={`${IMG_URL}/${banner.image}`}
                        fill
                        sizes='100vw'
                        priority={index === 0}
                        alt={banner.alt_text ?? 'Services banner'}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            ))}
        </section>
    )
}
