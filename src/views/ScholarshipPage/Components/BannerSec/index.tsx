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
                            <div className="py-5">
                                <h1 className='fw-bold text-white mb-3'>Top Scholarships in India and Abroad</h1>
                                <h6 className='text-white mb-3'>Explore the Top Scholarships based on Levels of Study, Discipline, Region and more</h6>
                                <div className="row">
                                    <div className="col-md-8 col-xl-6 col-lg-6 col-10 mb-3 me-auto">
                                        <input type="search" className='form-control' placeholder='Search scholarship name' />
                                    </div>
                                </div>
                                <div className="text-md-end mt-md-3 mt-0">
                                    <div className="btn scholarShipBtn">Get 1 Lakh Scholarship</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Scholarships</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec