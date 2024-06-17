import Image from 'next/image'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ContactCareerSec = () => {
  const initialValues = {
    fullName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    postApplied: '',
    jobLocation: '',
    currentLocation: '',
    totalExperience: '',
    resume: null
  }

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
    dateOfBirth: Yup.string().required('Date Of Birth is required'),
    postApplied: Yup.string().required('Post Applied is required'),
    jobLocation: Yup.string().required('Job Location is required'),
    currentLocation: Yup.string().required('Current Location is required'),
    totalExperience: Yup.string().required('Total Experience is required'),
    resume: Yup.mixed().required('Resume is required')
  })

  const onSubmit = (values, { setSubmitting }) => {
    console.log('Form data', values)
    setSubmitting(false)
  }

  return (
    <>
      <section className='bg-white'>
        <div className='container'>
          <div className='row py-5'>
            <div className='col-md-5 bg-blue rounded py-3'>
              <h2 className='fw-bold text-white'>Contact Career Representative</h2>
              <p className='text-white'>
                Please fill out the form to enable our career representatives to contact you at the earliest.
              </p>
              <p className='text-white'>To know more about this exciting opportunity, Connect with us</p>
              <div className='d-flex mb-3'>
                <div className='social-clr'>
                  <Image
                    src='/images/icons/email-icon.svg'
                    className='icon-white'
                    width={30}
                    height={30}
                    alt='email-icon'
                  />
                </div>
                <div className='align-content-center ms-2'>
                  <p className='text-white m-0'>pooja@learntechww.com</p>
                </div>
              </div>
              <div className='d-flex mb-3'>
                <div className='social-clr'>
                  <Image
                    src='/images/icons/Phone-blue.svg'
                    className='icon-white'
                    width={30}
                    height={30}
                    alt='email-icon'
                  />
                </div>
                <div className='align-content-center ms-2'>
                  <p className='text-white m-0'>+91 9036020016</p>
                  <p className='text-white m-0'>+91 9090165050</p>
                </div>
              </div>
              <div className='d-flex'>
                <div className='social-clr'>
                  <Image src='/images/icons/whatsapp-2.svg' width={30} height={30} alt='email-icon' />
                </div>
                <div className='align-content-center ms-2'>
                  <p className='text-white m-0'>+91 9036020016</p>
                </div>
              </div>
            </div>
            <div className='col-md-7 bg-white py-3 px-5'>
              <h2 className='text-center fw-bold text-blue'>Start Your Medical Journey</h2>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ setFieldValue, isSubmitting }) => (
                  <Form className='mt-3'>
                    <div className='row mb-md-3 careerContact'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <Field type='text' name='fullName' className='form-control' placeholder='Full Name*' />
                          <ErrorMessage name='fullName' component='div' className='text-danger' />
                        </div>
                      </div>
                      <div className='col-md-6 careerContact'>
                        <div className='mb-3'>
                          <Field type='email' name='email' className='form-control' placeholder='Email Id' />
                          <ErrorMessage name='email' component='div' className='text-danger' />
                        </div>
                      </div>
                    </div>
                    <div className='row mb-md-3 careerContact'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <Field type='tel' name='mobileNumber' className='form-control' placeholder='Mobile Number' />
                          <ErrorMessage name='mobileNumber' component='div' className='text-danger' />
                        </div>
                      </div>
                      <div className='col-md-6 careerContact'>
                        <div className='mb-3'>
                          <Field type='text' name='dateOfBirth' className='form-control' placeholder='Date Of Birth' />
                          <ErrorMessage name='dateOfBirth' component='div' className='text-danger' />
                        </div>
                      </div>
                    </div>
                    <div className='row mb-md-3 careerContact'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <Field type='text' name='postApplied' className='form-control' placeholder='Post Applied' />
                          <ErrorMessage name='postApplied' component='div' className='text-danger' />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <Field type='text' name='jobLocation' className='form-control' placeholder='Job Location' />
                          <ErrorMessage name='jobLocation' component='div' className='text-danger' />
                        </div>
                      </div>
                    </div>
                    <div className='row mb-md-3 careerContact'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <Field
                            type='text'
                            name='currentLocation'
                            className='form-control'
                            placeholder='Current Location'
                          />
                          <ErrorMessage name='currentLocation' component='div' className='text-danger' />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <Field
                            type='text'
                            name='totalExperience'
                            className='form-control'
                            placeholder='Total Experience in Years'
                          />
                          <ErrorMessage name='totalExperience' component='div' className='text-danger' />
                        </div>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-12'>
                        <input
                          type='file'
                          id='file'
                          className='fileInput'
                          onChange={event => {
                            setFieldValue('resume', event.currentTarget.files[0])
                          }}
                        />
                        <label htmlFor='file' className='fileLabel'>
                          Upload Resume
                        </label>
                        <ErrorMessage name='resume' component='div' className='text-danger' />
                      </div>
                    </div>
                    <div className='text-center'>
                      <button type='submit' className='btn submitBtn' disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactCareerSec
