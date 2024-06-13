import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='ServiceBanner bg-white'>
                <Image src='/images/icons/Banner BG.png' width={1400} height={300} alt='banner-img' />
            </section>
            <section className='bg-white'>
                <div className="container py-2">
                    <Link href='/' className='text-black'>Home </Link>{'>'} <Link className='text-blue' href='/services'>Services</Link>
                </div>
            </section>
        </>
    )
}

export default BannerSec