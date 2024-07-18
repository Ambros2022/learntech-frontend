import Image from 'next/image'
import Link from 'next/link'
import axios1 from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const BannerSec = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [banners, setBanners] = useState<any[]>([]);

    const getbanner = useCallback(async () => {
        try {
            const roleparams: any = { page: 1, size: 10000 };
            const response = await axios1.get('api/website/banner/get?promo_banner=Draft', { params: roleparams });
            setBanners(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setImagesLoaded(true);
        }
    }, []);

    useEffect(() => {
        getbanner();
    }, [getbanner]);
    return (
        <>
            <section className='ServiceBanner bg-white'>
                {banners?.map((banner, index) => (
                    <a href={banner.link}>
                        <Image
                            fill
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                            priority={true}
                            alt={`Banner ${index}`}
                            className="w-100"
                        />
                    </a>
                ))}
            </section>
            <section className='bg-white'>
                <div className="container py-2">
                    <Link href='/' className='text-black'>Home </Link>{'>'} Services
                </div>
            </section>
        </>
    )
}

export default BannerSec