import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ContactForm from 'src/@core/components/popup/ContactForm'

const BannerSec = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            course: '',
            location: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().required('Phone number is required'),
            course: Yup.string().required('Course is required'),
            location: Yup.string().required('Location is required'),
            message: Yup.string()
        }),
        onSubmit: (values) => {
            console.log('Form data', values)
        }
    })

    return (
        <>
            <section className='medSec position-relative'>
                <video src="/videos/bannerMeds.webm" muted autoPlay loop>
                </video>
                <div className="position-absolute h-100 w-100" style={{ top: '0', backgroundColor: "rgb(0,0,0,0.4)" }}>
                    <div className="container h-100">
                        <div className="row d-flex h-100">
                            <div className="col-lg-8 col-md-7 col-10 mx-auto align-self-center py-3">
                                <h1 className='text-warning fw-bold text-center mb-3'>
                                    Medical <span className='text-white'>Edu Studio</span>
                                </h1>
                                <h5 className="text-white mb-3">
                                    Medical Edu Studio is an aid provided by Learntech Group that was commenced to help medical students in India, UAE, Bahrain and plenty more countries.
                                </h5>
                                <h5 className="text-white mb-3">
                                    The Medical Edu Studio services include counselling medical aspirants for course selection and assisting them with admission and post-admission care in top colleges around the world. The panel of Educationalists/ Professionals are backed by extensive experience, established connections and many more.
                                </h5>
                                <h5 className="text-white mb-3">
                                    Every student will have their career mapped after several rounds of interviews. After which, the experts will help the candidate to choose a direction based on their aptitude.
                                </h5>
                                <h5 className="text-white mb-3">
                                    Medical Edu Studio aims to be the helping hand of every medical aspirant!
                                </h5>
                            </div>
                            <div className="col-lg-4 col-md-5 col-10 mx-auto align-self-center bg-skyBlue rounded p-3">
                                <h4 className='fw-bold text-blue text-center mb-3'>Grab Your Opportunity !</h4>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder='Enter Name *'
                                            className='form-control'
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                        {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            placeholder='Enter Email *'
                                            className='form-control'
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder='Enter Phone Number *'
                                            className='form-control'
                                            name="phone"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone}
                                        />
                                        {formik.touched.phone && formik.errors.phone ? <div className="text-danger">{formik.errors.phone}</div> : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder='Enter Course *'
                                            className='form-control'
                                            name="course"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.course}
                                        />
                                        {formik.touched.course && formik.errors.course ? <div className="text-danger">{formik.errors.course}</div> : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder='Enter Location *'
                                            className='form-control'
                                            name="location"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.location}
                                        />
                                        {formik.touched.location && formik.errors.location ? <div className="text-danger">{formik.errors.location}</div> : null}
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            placeholder='Enter Message (Optional)'
                                            className='form-control'
                                            name="message"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.message}
                                        />
                                    </div>
                                    <div className="justify-content-center d-flex">
                                        <button type="submit" className='btn viewMoreClgBtn'>Reserve Now</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BannerSec
