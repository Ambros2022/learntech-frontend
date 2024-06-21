import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
  return (
    <>
        <section className='SitemapSec position-relative'>
            <Image src='/images/icons/Banner BG.png' width={1400} height={300} alt='banner-img'/>
            <div className="d-flex h-100 w-100 justify-content-center position-absolute" style={{top:'0'}}>
                <div className="container h-100 d-flex justify-content-center">
                    <h1 className="text-white text-bold text-center align-self-center">Sitemap</h1>
                </div>
            </div>
        </section>
        <section className='bg-white py-3'>
            <div className="container linkFontSize">
                <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Sitemap</span>
            </div>
        </section>
    </>
  )
}

export default BannerSec