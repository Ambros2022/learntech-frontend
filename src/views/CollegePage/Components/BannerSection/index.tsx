import React from 'react'

function BannerSection() {
    return (
        <>
            <section className='bg-gray collegeBannerCon d-flex justify-content-center'>
                <h1 className='align-content-center fw-bold text-blue'>Colleges</h1>
                <div>
                    <div className="row">
                        <div className="col-md-7 mb-3">
                            <input type="search" className='form-control' placeholder='Search for course, degree or specialization' />
                        </div>
                        <div className="mb-3 col-md-2 col-6 col-lg-1 col-xl-1 d-flex justify-content-start justify-content-md-center">
                            <button className='btn bg-white text-blue srchBtn'>Search</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BannerSection