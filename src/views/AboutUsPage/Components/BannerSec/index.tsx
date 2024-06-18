import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='scholarshipSec'>
                <div className='position-relative scholarShipImg'>
                    <Image src='/images/icons/Banner BG.png' width={1400} height={300} alt='banner-img' className='position-relative w-100' />
                    <div className='position-absolute w-100 h-100' style={{ top: '0px' }}>
                        <div className="container d-flex justify-content-center h-100 w-100">
                            <div className="align-content-center">
                                <div className="py-5 text-center">
                                    <h1 className='fw-bold text-white mb-3'>About Learntech Edu Solutions</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> About Us</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec