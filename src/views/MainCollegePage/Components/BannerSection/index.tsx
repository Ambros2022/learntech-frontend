import React from 'react'

function BannerSection() {
    return (
        <>
            <section className='bg-blue collegeBannerCon'>
                <div className='d-flex justify-content-center h-100 w-100 container'>
                    <div className='align-content-center w-100'>
                        <h1 className='fw-bold text-white mb-3'>FIND TOP COLLEGES, COURSE ADMISSIONS, FEE STRUCTURES, AND PLACEMENT</h1>
                        <div className="row">
                            <div className="col-md-7 mb-3">
                                <input type="search" className='form-control' placeholder='Find your college' />
                            </div>
                            <div className="mb-3 col-md-2 col-6 col-lg-1 col-xl-1 d-flex justify-content-start justify-content-md-center">
                                <button className='btn bg-white text-blue srchBtn'>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BannerSection