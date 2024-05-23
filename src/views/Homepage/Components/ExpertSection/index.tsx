import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ExpertSection() {

  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  // Formik setup with validation using Yup
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      stream: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      mobile: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, "Mobile number must be digits only")
        .min(10, 'Mobile number must be exactly 10 digits')
        .max(10, 'Mobile number must be exactly 10 digits'),
      email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
      stream: Yup.string().required('Stream is required')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form data', values);
      alert('Form submitted successfully!');
      resetForm();  // Reset the form to initial values
    },
  });

  return (
    <section className="ExpertCon" id="animation15" data-aos="fade-up">
      <div className="container py-5">
        <h3 className="fw-bold text-center">Get In Touch With Our Expert Counsellor</h3>
        <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <form onSubmit={formik.handleSubmit} className="container">
          <div className="row">
            <div className="col-md-6" id="animation16">
              <div className="mb-3 ms-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="name"
                  placeholder="Enter Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className='text-danger'>{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
            <div className="col-md-6" id="animation17">
              <div className="mb-3 me-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputMobile"
                  name="mobile"
                  placeholder="Enter Mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className='text-danger'>{formik.errors.mobile}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" id="animation18">
              <div className="mb-3 ms-md-5">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail"
                  name="email"
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-danger'>{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 me-md-5" id="animation19">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputStream"
                  name="stream"
                  placeholder="Enter Stream"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stream}
                />
                {formik.touched.stream && formik.errors.stream ? (
                  <div className='text-danger'>{formik.errors.stream}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="text-center reqBtn">
            <button type="submit" className="btn">Request for a Call Back</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ExpertSection;
