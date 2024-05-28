import React from 'react'

function BannerSection() {
    return (
        <>
            <section className='bg-blue collegeBannerCon'>
                <div className='d-flex justify-content-center h-100 w-100 container'>
                    <div className='align-content-center w-100'>
                        <h1 className='fw-bold text-white mb-3'>
                            FIND ADMISSION AT TOP SCHOOLS IN INDIA
                        </h1>
                        <div className="row">
                            <div className="col-md-9 mb-3">
                                <input type="search" className='form-control' placeholder='Find your college' />
                            </div>
                            <div className="mb-3 col-md-3 d-flex justify-content-start justify-content-md-center">
                                <button className='btn bg-white text-blue srchBtn'>Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BannerSection