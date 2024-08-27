import Image from 'next/image';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SideContactUsFormfrom from 'src/@core/components/popup/SideContactUsForm';

const ServicesSec = () => {


    return (
        <>
            <section className='bg-skyBlue py-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-xl-7 col-lg-8">
                            <div className='text-center h-100 d-flex justify-content-center servicesImg'>
                                <Image src='/images/icons/ServicePage.webp' className='img-fluid align-self-center' width={700} height={700} alt='services-img' />
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-5 col-lg-4 border rounded px-xl-5 px-lg-4 col-10 mx-md-0 mx-auto">
                            <h4 className='pt-3 mb-3 fw-bold text-blue text-center'>
                                Talk to Our Experts
                            </h4>
                            <SideContactUsFormfrom />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ServicesSec;
