import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='position-relative boardSec'>
                <Image src='/images/icons/Banner BG.png' height={300} width={1400} alt='banner-img' />
                <div className='position-absolute w-100 h-100' style={{ top: '0px' }}>
                    <div className="container h-100">
                        <div className="d-flex justify-content-center h-100">
                            <div className="align-content-center h-100">
                                <h1 className='fw-bold text-white'>Searching for Boards in India
                                </h1>
                                <div className="row">
                                    <div className="col-md-12 mb-3 mx-auto">
                                        <input type="search" className='form-control' placeholder='Search' />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='btn boardBtn'>Get Board Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className="container linkFontSize py-2">
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'>Board</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec