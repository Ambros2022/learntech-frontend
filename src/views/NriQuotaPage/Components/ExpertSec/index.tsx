import React from 'react'
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

const ExpertSec = () => {
    return (
        <>
            <section className='bg-white pt-3 pb-5'>
                <div className="container bg-white text-center p-5" style={{backgroundSize:'cover',backgroundImage: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("/images/icons/NRI-Quota.png")', backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>
                    <h2 className='text-white fw-bold mb-3'>Are You Eligible for NRI Quota?</h2>
                    <h6 className='text-blue  rounded  p-3 mb-3' style={{ display: "inline-block", backgroundColor: "white" }}>Connect with our experts to avail admission assistance for NRI quota seats</h6><br />
                    <GlobalPopupEnquiry className='btn reqBtn' buttonText='Request a Callback' />
                </div>
            </section>
        </>
    )
}

export default ExpertSec