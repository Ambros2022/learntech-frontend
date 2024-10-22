import Image from 'next/image'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import EducationLoanPage from 'src/@core/components/popup/EducationloanForm'

const DetailSec = () => {
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        mobileNumber: Yup.string().required('Mobile Number is required'),
        course: Yup.string().required('Course selection is required'),
        city: Yup.string().required('City selection is required'),
        bank: Yup.string().required('Bank selection is required'),
        notes: Yup.string().max(500, 'Notes must be 500 characters or less').required('Notes is required'),
    });

    return (
        <>
            <section className='bg-white DetailSec'>
                <div className="row g-0">
                    <div className="col-md-6">
                        <Image src='/images/icons/contactImgForm.jfif' width={500} height={500} alt='contact-form' style={{ objectFit: 'cover' }} className='w-100 h-100' />
                    </div>
                    <div className="col-md-6 bg-skyBlue px-md-5 px-2 py-5">
                        <h2 className='fw-bold text-center text-blue mb-3'>Get Comprehensive Admission & Loan Assistance</h2>
                        <EducationLoanPage/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DetailSec
