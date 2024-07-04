import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OurPortalSec = () => {
    return (
        <>
            <section className='bg-white py-5'>
                <div className="container">
                    <h2 className='fw-bold text-blue text-center'>Our Portals</h2>
                    <div className="d-flex gap-5 mt-4 flex-wrap justify-content-center">
                        <div className='bg-skyBlue rounded'>
                            <Link href='https://www.keralastudy.com/'>
                                <Image src='/images/icons/kerala_study.svg' width={200} height={200} alt='kerala_study-logo' className='img-fluid' />
                            </Link>
                        </div>
                        <div className='bg-skyBlue rounded'>
                            <Link href='https://learntechww.com/'>
                                <Image src='/images/icons/learntech.svg' width={200} height={200} alt='learntech-logo' className='img-fluid' />
                            </Link>
                        </div>
                        <div className='bg-skyBlue rounded'>
                            <Link href='https://topmbastudy.com/'>
                                <Image src='/images/icons/top_mba.svg' width={200} height={200} alt='top_mba-logo' className='img-fluid' />
                            </Link>
                        </div>
                        <div className='bg-skyBlue rounded'>
                            <Link href='https://coimbatorestudy.com/'>
                                <Image src='/images/icons/coimbatore_study.svg' width={200} height={200} alt='coimbatore_study-logo' className='img-fluid' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OurPortalSec