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
                        <div className="container">
                            <div className="py-5 text-start">
                                <h1 className='fw-bold text-white mb-3'>Contact Us</h1>
                                <h4 className='text-white'>Our team is ready to help you with any inquiries you may have. Please fill out the form below, and a member of our team will contact you shortly!</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Contact Us</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec