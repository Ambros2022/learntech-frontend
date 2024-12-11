import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import axios1 from 'src/configs/axios';


const BannerSec = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [banners, setBanners] = useState<any[]>([]);

    const getbanner = useCallback(async () => {
        try {
            const roleparams: any = { page: 1, size: 10000 };
            const response = await axios1.get('api/website/banner/get?promo_banner=Advertise_page', { params: roleparams });
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
            <section className='AdvertiseBanner'>
                {banners?.map((banner, index) => (
               
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                        priority={true}
                        alt={`Banner ${index}`}
                        height={300}
                        width={1400}
                        className='img-fluid'
                    />
                
                ))}
              
            </section >
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link className='text-black' href='/'>Home <i className='bi bi-chevron-right me-2'></i></Link><span className='text-blue'>Advertise With Us </span>
                </div>
            </section>
        </>
    )
}

export default BannerSec