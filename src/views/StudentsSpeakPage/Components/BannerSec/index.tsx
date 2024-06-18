import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='newsBannerSec'>
                <div className='position-relative'>
                    <div>
                        <Image src='/images/icons/Banner BG.png' width={1400} height={400} alt='banner-img' className='position-relative w-100' />
                    </div>
                    <div className='position-absolute w-100 h-100' style={{ top: '1px' }}>
                        <div className="container h-100">
                            <div className="d-flex justify-content-center h-100">
                                <div className="align-content-center h-100">
                                    <h1 className='fw-bold text-white text-center'>Success Stories of Learntech Edu Solutions Pvt. Ltd.
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-8 col-10 mb-3 mx-auto">
                                            <input type="search" className='form-control' placeholder='Search' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-skyBlue'>
                <div className='container py-3 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Students' Speak</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec