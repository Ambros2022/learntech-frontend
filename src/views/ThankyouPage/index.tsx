import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ThankyouPage = () => {
    return (
        <>
            <section className='bg-skyBlue thnkCon'>
                <div className="container py-5">
                    <div className="d-flex justify-content-center">
                        <div className="text-center align-content-center">
                            <Image src='/images/icons/thankyou-ing.png' alt='thankyou-img' width={200} height={200} />
                            <h1 className='text-blue fw-bold'>Thank you!</h1>
                            <h6 className='fw-bold text-black mb-3'>Our counsellors will get in touch with you shortly. You could also call us on 18001208696 (toll-free) for further queries.</h6>
                            <h6 className='text-black mb-3'>Stay updated with the Learntech Edu Solutions Pvt. Ltd.</h6>
                            <div className='row socialThnks'>
                                <div className="col-md-3 col-6 mb-3">
                                    <a href="https://www.facebook.com/learntechedu" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/FacebookForm.svg" alt="facebook-icon" />Facebook </a>
                                </div>
                                <div className="col-md-3 col-6 mb-3">
                                    <a href="https://www.instagram.com/learntechedus" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/instagramForm.jpg" alt="instagram-icon" />Instagram </a>
                                </div>
                                <div className="col-md-3 col-6 mb-3">
                                    <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/linkedin.svg" alt="linkedIn-icon" />Linkedin </a>
                                </div>
                                <div className="col-md-3 col-6 mb-3">
                                    <a href="https://twitter.com/learntechww" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/twitterForm.svg" alt="twitter-icon" />Twitter</a>
                                </div>
                            </div>
                            <Link href='/' className='mt-3 btn errBtn mb-3'>BACK TO HOME</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThankyouPage