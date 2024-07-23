import Image from 'next/image'
import React from 'react'
import useHistory from 'react-router-dom'; // Import useHistory

const CurrentOpeningSec = ({ jobData }) => {


    return (
        <section className='bg-white py-5' id="currentOpeningSection">
            <div className="container">
                <h2 className='fw-bold text-blue pb-3'>Current Openings</h2>
                <div className="row">
                    {jobData.map((job, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="card mb-3 bg-skyBlue border-0">
                                <div className="row g-0">
                                    < div className="col-md-4 d-flex justify-content-center" >
                                        <Image src='/images/icons/suitcase-lg-fill.svg' className='mt-md-0 mt-3 align-self-center img-style' width={100} height={100} alt='suitcase-logo' />
                                    </div >
                                    <div className="col-md-8">
                                        <div className="card-body text-md-start text-center">
                                            <h5 className="card-title fw-bold text-black text-truncate">{job.name}</h5>
                                            {/* <p className="card-text text-truncate"><Image src="/images/icons/Locationicon.svg" width={20} height={20} alt='logo-location' /> {job.jobpositionlocation}</p> */}
                                            {job.jobpositionlocation.map((location, idx) => (
                                                <p key={idx} className="card-text text-truncate">
                                                    <Image src="/images/icons/Locationicon.svg" width={20} height={20} alt='logo-location' /> {location['jobposition&location'].name}
                                                </p>
                                            ))}
                                            <p className="card-text text-truncate"><Image src="/images/icons/calendor-filled.png" width={20} height={20} alt='logo-location' /> {job.exp_required}</p>
                                            <div className="row">
                                                <div className='col-lg-6'>
                                                    <p className="card-text text-truncate"><Image src="/images/icons/chair-icon.png" width={20} height={20} alt='logo-location' /> {job.total_positions}</p>
                                                </div>
                                                {/* <div className='col-lg-6 text-lg-end mt-lg-0 mt-3'>
                                                    <button className='btn viewDetailBtn'>View Details</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CurrentOpeningSec

