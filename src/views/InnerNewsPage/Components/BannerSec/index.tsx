import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = ({ data }) => {
    return (
        <>
            <section className='newsBannerSec'>
                <div className='position-relative'>
                    <div>
                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image}`} width={1400} height={400} alt='banner-img' className='position-relative ' />
                    </div>
                    {/* <div className='position-absolute w-100 h-100' style={{ top: '1px' }}>
                        <div className="container h-100">
                            <div className="d-flex justify-content-center h-100">
                                <div className="align-content-center h-100">
                                    <h1 className='fw-bold text-white'>Latest Education News</h1>
                                    <div className="row">
                                        <div className="col-md-12 mb-3 mx-auto">
                                            <input type="search" className='form-control' placeholder='Search' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><Link href="/news" className='text-black'> News <i className='bi bi-chevron-right'></i></Link> <span className='text-blue'>{data.meta_title}</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec