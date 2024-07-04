import React from 'react'
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

const ExpertSec = () => {
    return (
        <>
            <section className='bg-white pt-3 pb-5'>
                <div className="container bg-skyBlue text-center p-5">
                    <h2 className='text-blue fw-bold mb-3'>Are You Eligible for MBBS Abroad?</h2>
                    <h6 className='text-black mb-3'>Connect with our experts to avail admission assistance for MBBS Abroad</h6>
                    <GlobalPopupEnquiry className='btn reqBtn' buttonText='Request a Callback'/>
                </div>
            </section>
        </>
    )
}

export default ExpertSec