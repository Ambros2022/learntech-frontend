import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    const handleScrollToCurrentOpening = () => {
        const currentOpeningSection = document.getElementById('currentOpeningSection');
        if (currentOpeningSection) {
            currentOpeningSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <>
            <section className='careerSec'>
                <div className='h-100'>
                    <div className="row h-100">
                        <div className="col-md-6 py-md-0 py-5 bg-skyBlue">
                            <div className="d-flex justify-content-center h-100">
                                <div className="align-content-center w-75">
                                    <h1 className='fw-bold text-blue'>WE ARE HIRING</h1>
                                    <h6 className='text-black mb-3'>Come join one of the Best Educational Service Provider Firms as rated by ISO 9001:2008 Certified.</h6>
                                    {/* <a className='btn currentOpeningBtn'>Current Openings</a> */}
                                    <button onClick={handleScrollToCurrentOpening} className='btn currentOpeningBtn'>Current Openings</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 gx-0">
                            <Image src='/images/icons/career-img.jpg' width={600} height={500} alt='career-img' />
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link> <span className='text-blue'>Career</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec