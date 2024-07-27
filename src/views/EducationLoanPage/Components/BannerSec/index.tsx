import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

const BannerSec = () => {
    return (
        <>
            <section className='eduLoanSec position-relative'>
                <Image src='/images/icons/Banner BG.png' width={1400} height={300} alt='banner-img' />
                <div className="position-absolute h-100 w-100" style={{ top: '0px' }}>
                    <div className="container d-flex justify-content-center flex-column h-100">
                        <h1 className='text-white fw-bold text-center align-self-center'>
                            Education Loans in India and Abroad
                        </h1>
                        <h3 className='fw-bold text-white text-center align-self-center mb-3'>The Simplest Way to
                        </h3>
                        <h6 className='text-blue p-2 rounded fw-bold align-self-center mb-3' style={{display:'inline-block', backgroundColor:'white'}}>APPLY FOR EDUCATION LOAN</h6>
                        <div className='align-self-center'>
                            <GlobalPopupEnquiry className='btn btn-success2'/>
                            {/* <button >APPLY NOW</button> */}
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className='bg-skyBlue'>
                <div className="container py-3 d-flex justify-content-between flex-wrap">
                    <div className='align-self-center mb-md-0 mb-1'>


                    </div>

                </div>
            </section> */}
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link className='text-black' href='/'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Education-Loan</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec