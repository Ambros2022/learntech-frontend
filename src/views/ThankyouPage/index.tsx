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
                            <Image src='/images/icons/thankyou-ing.png' alt='thankyou-img' width={70} height={70} />
                            <h1 className='text-blue fw-bold'>Thank you!</h1>
                            <h6 className='fw-bold text-black mb-3'>Our counsellors will get in touch with you shortly. You could also call us on 18001208696 (toll-free) for further queries.</h6>
                            <h6 className='text-black mb-3'>Stay updated with the Learntech Edu Solutions Pvt. Ltd.</h6>
                            <div className='d-flex gap-3 justify-content-center flex-wrap socialThnks'>
                                <a href="https://www.facebook.com/learntechedu" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/FacebookForm.svg" alt="facebook-icon" />Facebook </a>
                                <a href="https://www.instagram.com/learntechedus" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/instagramForm.jpg" alt="instagram-icon" />Instagram </a>
                                <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/linkedin.svg" alt="linkedIn-icon" />Linkedin </a>
                                <a href="https://twitter.com/learntechww" target='_blank'><Image width={27} height={27} className='mx-2' src="/images/icons/twitterForm.svg" alt="twitter-icon" />Twitter</a>
                            </div>
                            <Link href='/' className='mt-4 btn errBtn mb-3'>BACK TO HOME</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThankyouPage