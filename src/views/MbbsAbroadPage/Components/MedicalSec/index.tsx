import React from 'react';
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
const MedicalSec = () => {
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
        <section className='py-5 bg-white'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-lg-8 col-xl-8">
                        <p className='text-black'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <p className="text-black">

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                        </p>
                    </div>
                    <div className="col-md-5 col-lg-4 col-10 mx-auto col-xl-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form className='bg-skyBlue mbbsAbroad rounded p-3'>
                                    <h4 className='text-blue fw-bold text-center mb-3'>Start Your Medical Journey</h4>
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
                                        <button type="submit" className='btn submitBtn'>Make me a Doctor!</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MedicalSec;
