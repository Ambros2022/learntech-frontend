import Image from 'next/image'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='AdvertiseBanner'>
                <Image src='/images/icons/Banner BG.png' alt='Banner-img' width={1400} height={300} />
            </section >
        </>
    )
}

export default BannerSec