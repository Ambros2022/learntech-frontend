import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='bg-skyBlue disclaimerCon w-100 py-5'>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <h1 className='text-blue px-md-0 px-5 fw-bold'>Learntech Edu Solutions Pvt. Ltd.</h1>
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