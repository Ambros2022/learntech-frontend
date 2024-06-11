import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='bg-skyBlue disclaimerCon w-100 position-relative'>
                <Image src='/images/icons/Banner BG.png' alt='banner-img' width={1400} height={300} />
                <div className="container h-100 position-absolute" style={{ top: '0px' }}>
                    <div className="d-flex h-100 justify-content-center">
                        <h1 className='align-self-center text-white px-md-0 px-5 fw-bold'>Learntech Edu Solutions Pvt. Ltd.</h1>
                    </div>
                </div>
            </section>
            <section className="bg-white py-2">
                <div className="container">
                    <p className=''><Link className='text-black' href="/">Home</Link> {'>'} <span className='text-blue'><Link href="/disclaimer" className="text-blue">Disclaimer</Link></span></p>
                </div>
            </section>
        </>
    )
}

export default BannerSec