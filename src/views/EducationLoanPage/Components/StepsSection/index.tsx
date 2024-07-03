import React from 'react'

const StepSection = () => {
    return (
        <section className='bg-white py-5'>
            <div className="container bg-skyBlue rounded p-3">
                <h2 className='fw-bold text-center text-blue pt-2 mb-4'>Steps to Continue with Your Application</h2>
                <div className='d-flex justify-content-center gap-3 flex-wrap'>
                    <div className='bg-blue rounded' style={{ width: '200px', height: '200px' }}>

                    </div>
                    <div className='bg-blue rounded' style={{ width: '200px', height: '200px' }}>

                    </div>
                    <div className='bg-blue rounded' style={{ width: '200px', height: '200px' }}>

                    </div>
                    <div className='bg-blue rounded' style={{ width: '200px', height: '200px' }}>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default StepSection