import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='eduLoanSec position-relative'>
                <Image src='/images/icons/Banner BG.png' width={1400} height={300} alt='banner-img' />
                <div className="position-absolute h-100 w-100" style={{ top: '0px' }}>
                    <div className="container d-flex justify-content-center h-100">
                        <h1 className='text-white fw-bold text-center align-self-center'>
                            Education Loans in India and Abroad
                        </h1>
                    </div>
                </div>
            </section>
            <section className='bg-skyBlue'>
                <div className="container py-3 d-flex justify-content-between flex-wrap">
                    <div className='align-self-center mb-md-0 mb-1'>
                        <h5 className='text-blue'>The Simplest Way to
                        </h5>
                        <h2 className='text-blue fw-bold'>APPLY FOR EDUCATION LOAN</h2>
                    </div>
                    <div className='align-self-center'>
                        <button className='btn applyNowButton'>APPLY NOW</button>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link className='text-black' href='/'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Education-Loan</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec