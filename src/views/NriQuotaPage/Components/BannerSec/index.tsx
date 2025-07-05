import Link from 'next/link'
import React from 'react'
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

const BannerSec = () => {
    return (
        <>
            <section className='NriQuotaSec'>
                <div className='position-relative'>
                    <img src='/images/icons/BannerBG.webp' alt='Banner-img' width={1400} height={300} />
                    <div className="">
                        <div className="position-absolute h-100 w-100 d-flex justify-content-center" style={{ top: '1px' }}>
                            <div className="align-content-center">
                                <h1 className='text-center fw-bold text-white mb-3'>Know All About NRI Quota Seats in India

                                </h1>
                                <div className='text-center'>
                                    <GlobalPopupEnquiry className='btn btn-success' />
                                    {/* <button className='btn submtBtn'>Apply Now</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white linkFontSize py-3'>
                <div className="container">
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> NRI Quota</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec