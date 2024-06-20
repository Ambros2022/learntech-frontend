import Link from 'next/link'
import React from 'react'

const LinkSec = () => {
    return (
        <>
            <section className='bg-white siteMapSec py-5'>
                <div className="container">
                    <div className='py-2'>
                        <h2 className='fw-bold text-blue mb-3'>Information</h2>
                        <div className="row text-black">
                            <div className="col-md-3 col-10 mx-auto">
                                <ul>
                                    <li><Link href='/' className='text-black'>Home</Link></li>
                                    <li><Link href='/about-us' className='text-black'>About Us</Link></li>
                                    <li><Link href='/contact-us' className='text-black'>Contact Us</Link></li>
                                    <li><Link href='/exams' className='text-black'>Exams</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3 col-10 mx-auto">
                                <ul>
                                    <li><Link href='/services' className='text-black'>Services</Link></li>
                                    <li><Link href='/nri-quota' className='text-black'>NRI Quota</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3 col-10 mx-auto">
                                <ul>
                                    <li><Link href='/scholarships' className='text-black'>Scholarships</Link></li>
                                    <li><Link href='/students-speak' className='text-black'>Student's Speak</Link></li>
                                    <li><Link href='/study-in-usa' className='text-black'>Study Abroad</Link></li>
                                    <li><Link href='/boards' className='text-black'>Boards</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3 col-10 mx-auto">
                                <ul>
                                    <li><Link href='/our-team' className='text-black'>Our team</Link></li>
                                    <li><Link href='/privacy-policy' className='text-black'>Privacy Policy</Link></li>
                                    <li><Link href='/terms-and-conditions' className='text-black'>Term & Condition</Link></li>
                                    <li><Link href='/disclaimer' className='text-black'>Disclaimer</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LinkSec