import Image from 'next/image'
import React from 'react'

const StepSection = () => {
    return (
        <section className='bg-white py-5'>
            <div className="container bg-skyBlue rounded p-3">
                <h2 className='fw-bold text-center text-blue pt-2 mb-4'>Steps to Continue with Your Application</h2>
                <div className='mb-5 d-flex justify-content-center gap-5 flex-wrap'>
                    <div className='rounded' style={{ width: '200px', height: '200px' }}>
                        <Image src='/images/icons/Filling_up_of_Application_Form.jpg' className='rounded img-fluid' width={500} height={500} alt='filling-up-of-application-form' />
                    </div>
                    <div className='rounded' style={{ width: '200px', height: '200px' }}>
                        <Image src='/images/icons/Document_Verification_Interview.jpg' className='rounded img-fluid' width={500} height={500} alt='document-verification-interview' />
                    </div>
                    <div className='rounded' style={{ width: '200px', height: '200px' }}>
                        <Image src='/images/icons/Loan_Approval.jpg' className='rounded img-fluid' width={500} height={500} alt='loan-approval' />
                    </div>
                    <div className='rounded' style={{ width: '200px', height: '200px' }}>
                        <Image src='/images/icons/Loan_Disbursal.jpg' className='rounded img-fluid' width={500} height={500} alt='loan-disbursal' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StepSection