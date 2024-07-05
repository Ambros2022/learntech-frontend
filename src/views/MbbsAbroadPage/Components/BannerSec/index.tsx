import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

const BannerSec = () => {
    return (
        <>
            <section className='scholarshipSec'>
                <div className='position-relative scholarShipImg'>
                    <Image src='/images/icons/Banner BG.png' width={1400} height={300} alt='banner-img' className='position-relative w-100' />
                    <div className='position-absolute w-100 h-100' style={{ top: '0px' }}>
                        <div className="container">
                            <div className="py-5 text-center">
                                <h1 className='fw-bold text-white mb-3'>MBBS Abroad For Indian Students: Top Countries, Exams, Admission Process, Requirement</h1>
                                <GlobalPopupEnquiry className="btn btn-apply"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> MBBS Abroad</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec