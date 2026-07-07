import React from 'react'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import { LazyNriQuotaBannerEnquiry } from 'src/app/components/ClientWrappers'

const BannerSec = () => {
    return (
        <>
            <section className='NriQuotaSec  bg-blue '>
                <div className='d-flex h-100 justify-content-center '>
                    <div >
                        <div className=" h-100 w-100 d-flex justify-content-center" style={{ top: '1px' }}>
                            <div className="align-content-center">
                                <h1 className='text-center fw-bold text-white mb-3'>Know All About NRI Quota Seats in India</h1>
                                <div className='text-center'>
                                    <LazyNriQuotaBannerEnquiry className='btn btn-success' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Breadcrumb items={[{ label: 'NRI Quota' }]} />
        </>
    )
}

export default BannerSec
