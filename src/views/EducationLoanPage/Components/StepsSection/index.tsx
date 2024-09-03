import Image from 'next/image'
import React from 'react'

const StepSection = () => {
    return (
        <section className='bg-white py-5'>
            <div className="container bg-skyBlue rounded p-5">
                <h2 className='fw-bold text-center text-blue pt-2 mb-4'>Steps to Continue with Your Application</h2>
                <div className='pt-3 d-flex justify-content-center gap-5 flex-wrap'>
                    <div className='rounded' style={{ width: '300px', height: '100%' }}>
                        <Image src='/images/icons/Filling_up_of_Application_Form.jpg' className='rounded img-fluid' width={500} height={500} alt='filling-up-of-application-form' />
                        <h5 className='fw-bold text-black my-3 text-center'>Filling up of Application Form</h5>
                    </div>
                    <span className='align-self-center'>
                        <i className='bi fw-bold fs-5 bi-arrow-right arrow-right text-black'></i>
                        <i className='bi fw-bold fs-5 bi-arrow-down arrow-down text-black'></i>
                    </span>
                    <div className='rounded' style={{ width: '300px', height: '100%' }}>
                        <Image src='/images/icons/Document_Verification_Interview.jpg' className='rounded img-fluid' width={500} height={500} alt='document-verification-interview' />
                        <h5 className='fw-bold text-black my-3 text-center'>Document Verification Interview</h5>
                    </div>
                    <span className='align-self-center'>
                        <i className='bi fw-bold fs-5 bi-arrow-right arrow-right text-black'></i>
                        <i className='bi fw-bold fs-5 bi-arrow-down arrow-down text-black'></i>
                    </span>
                    <div className='rounded' style={{ width: '300px', height: '100%' }}>
                        <Image src='/images/icons/Loan_Approval.jpg' className='rounded img-fluid' width={500} height={500} alt='loan-approval' />
                        <h5 className='fw-bold text-black my-3 text-center'>Loan Approval</h5>
                    </div>
                    <span className='align-self-center'>
                        <i className='bi fw-bold fs-5 bi-arrow-right arrow-right text-black'></i>
                        <i className='bi fw-bold fs-5 bi-arrow-down arrow-down text-black'></i>
                    </span>
                    <div className='rounded' style={{ width: '300px', height: '100%' }}>
                        <Image src='/images/icons/Loan_Disbursal.jpg' className='rounded img-fluid' width={500} height={500} alt='loan-disbursal' />
                        <h5 className='fw-bold text-black my-3 text-center'>Loan Disbursal</h5>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StepSection
