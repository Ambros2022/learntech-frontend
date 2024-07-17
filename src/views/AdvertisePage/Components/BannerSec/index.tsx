import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='AdvertiseBanner'>
                <Image src='/images/icons/Banner BG.png' alt='Banner-img' width={1400} height={300} />
            </section >
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link  className='text-black' href='/'>Home <i className='bi bi-chevron-right me-2'></i></Link><span className='text-blue'>Advertise With Us </span>
                </div>
            </section>
        </>
    )
}

export default BannerSec