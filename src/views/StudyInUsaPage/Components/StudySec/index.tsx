import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const StudySec = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      contactNumber: '',
      email: '',
      location: '',
      preferredCourse: '',
      preferredCollege: '',
      message: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      contactNumber: Yup.string().required('Contact Number is required'),
      email: Yup.string().email('Invalid email address').required('Email ID is required'),
      location: Yup.string().required('Location is required'),
      preferredCourse: Yup.string().required('Preferred Course is required'),
      preferredCollege: Yup.string(),
      message: Yup.string()
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <>
      <section className='bg-white studySec'>
        <div className='container pt-3 pb-5'>
          <h4 className='fw-bold text-blue mb-3'>Study In USA</h4>
          <div className="row pt-3 pb-2">
            <div className="col-md-6 col-lg-7 col-xl-7 text-black order-2 order-md-1">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="col-md-6 col-lg-5 col-xl-5 order-1 order-md-2 mb-md-0 mb-3">
              <form onSubmit={formik.handleSubmit} className='bg-skyBlue px-5 pt-5 pb-3'>
                <div className='text-center mb-3'>
                  <h3 className='fw-bold text-blue'>Book Your Tickets</h3>
                  <small>Your career needs a RIGHT PILOT. Let us pilot your career to success</small>
                </div>
                <div className="mb-3">
                  <input
                    type='text'
                    placeholder='Full Name*'
                    className='form-control'
                    id='BookName'
                    name='fullName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-danger">{formik.errors.fullName}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <input
                    type='text'
                    placeholder='Contact Number*'
                    className='form-control'
                    id='ContactNumber'
                    name='contactNumber'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactNumber}
                  />
                  {formik.touched.contactNumber && formik.errors.contactNumber ? (
                    <div className="text-danger">{formik.errors.contactNumber}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <input
                    type='email'
                    placeholder='Email ID*'
                    className='form-control'
                    id='Email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <input
                    placeholder='Location*'
                    className='form-control'
                    id='Location'
                    name='location'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                  />
                  {formik.touched.location && formik.errors.location ? (
                    <div className="text-danger">{formik.errors.location}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <input
                    placeholder='Preferred Course*'
                    className='form-control'
                    id='PreferredCourse'
                    name='preferredCourse'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.preferredCourse}
                  />
                  {formik.touched.preferredCourse && formik.errors.preferredCourse ? (
                    <div className="text-danger">{formik.errors.preferredCourse}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <input
                    placeholder='Preferred College'
                    className='form-control'
                    id='PreferredCollege'
                    name='preferredCollege'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.preferredCollege}
                  />
                </div>
                <div className="mb-3">
                  <input
                    placeholder='Message'
                    className='form-control'
                    id='Message'
                    name='message'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />
                </div>
                <div className="mb-3 d-grid">
                  <button type='submit' className='btn onBrdBtn'>Get Onboard Now!</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudySec;
