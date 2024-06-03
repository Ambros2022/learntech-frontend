import Image from 'next/image'
import React from 'react'

const CurrentOpeningSec = () => {
    return (
        <section className='bg-white py-5'>
            <div className="container">
                <h2 className='fw-bold text-blue pb-3'>Current Openings</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <Image src="/images/icons/Management.svg" width={70} height={70} className="self-align-center img-fluid rounded-start" alt="seo-img" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-black text-truncate">SEO Analyst</h5>
                                        <p className="card-text text-truncate"><Image src="/images/icons/location Icon.svg" width={20} height={20} alt='logo-location' /> Mangalore, Karnataka</p>
                                        <p className="card-text text-truncate"><Image src="/images/icons/calendor-filled.png" width={20} height={20} alt='logo-location' /> 0-4 years</p>
                                        <p className="card-text text-truncate">03</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CurrentOpeningSec