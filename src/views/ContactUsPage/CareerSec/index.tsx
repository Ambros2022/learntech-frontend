import Image from 'next/image'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    contact: Yup.string().required('Contact Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    location: Yup.string().required('Location is required'),
    country: Yup.string().required('Preferred Country is required'),
    college: Yup.string().notRequired(), // College is optional
    message: Yup.string().notRequired(), // Message is optional
});

const CareerSec = () => {

    const collegeOptions = ['College A', 'College B', 'College C'];
    const countryOptions = ['Country A', 'Country B', 'Country C'];


    const initialValues = {
        name: '',
        contact: '',
        email: '',
        location: '',
        country: '',
        college: '',
        message: '',
    };

    const handleSubmit = (values) => {
        console.log('Form data:', values);
        // Handle form submission logic here (e.g., API call)
    };

    return (
        <section className='bg-white py-5'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-md-7 mb-md-0 mb-3">
                        <div className='bg-blue p-5 h-100 rounded'>
                            <h2 className="fw-bold text-white">Contact Career Representative</h2>
                            <h6 className='text-white mb-5'>Please fill out the form to enable our career representatives to contact you at the earliest.</h6>
                            <div className="d-flex mb-3">
                                <div className='align-self-center'>
                                    <Image src='/images/icons/phoneAbout1.png' width={30} height={30} alt='phone1' />
                                </div>
                                <div>
                                    <h6 className='ms-3 text-white'>1800-120-8696 (Tollfree)</h6>
                                    <h6 className='ms-3 text-white'>(Monday to Saturday | (9am to 6pm)</h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <Image src='/images/icons/phoneAbout2.png' width={30} height={30} alt='phone2' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'>080-22454991, 26631169</h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <Image src='/images/icons/phoneAbout3.png' width={30} height={30} alt='phone3' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'>080-22454991</h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <Image src='/images/icons/email-icon.svg' className='icon-white' width={30} height={30} alt='email' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'>info@learntechww.com</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-5 col-10 mx-auto">
                        <div className="bg-skyBlue rounded">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form className='bg-skyBlue mbbsAbroad rounded p-3'>
                                        <h4 className='text-blue fw-bold text-center mb-3'>Get in Touch with Us</h4>
                                        <div className="mb-3">
                                            <Field type="text" className='form-control' name='name' placeholder='Full Name*' />
                                            {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <Field type="text" className='form-control' name='contact' placeholder='Contact Number*' />
                                            {errors.contact && touched.contact ? <div className="text-danger">{errors.contact}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <Field type="email" className='form-control' name='email' placeholder='Email ID*' />
                                            {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <Field type="text" className='form-control' name='location' placeholder='Location*' />
                                            {errors.location && touched.location ? <div className="text-danger">{errors.location}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <Field as="select" className='form-control' name='country'>
                                                <option value="">Preferred Country*</option>
                                                {countryOptions.map((country, index) => (
                                                    <option key={index} value={country}>{country}</option>
                                                ))}
                                            </Field>
                                            {errors.country && touched.country ? <div className="text-danger">{errors.country}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <Field as="select" className='form-control' name='college'>
                                                <option value="">Preferred College</option>
                                                {collegeOptions.map((college, index) => (
                                                    <option key={index} value={college}>{college}</option>
                                                ))}
                                            </Field>
                                            {errors.college && touched.college ? <div className="text-danger">{errors.college}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <Field as="textarea" className='form-control' name='message' placeholder='Type your message' />
                                            {errors.message && touched.message ? <div className="text-danger">{errors.message}</div> : null}
                                        </div>
                                        <div className="mb-3 text-center">
                                            <button type="submit" className='btn submitBtn'>Submit</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CareerSec