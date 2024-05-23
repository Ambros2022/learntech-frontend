import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const SignupForm: React.FC = () => {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mt-3">
      <h6 className="text-center"><small className='text-black'>Create new account</small></h6>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agree: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required'),
          email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
          phone: Yup.string()
            .required('Required'),
          password: Yup.string()
            .required('Required')
            .min(6, 'Password must be at least 6 characters'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Required'),
          agree: Yup.boolean()
            .oneOf([true], 'Must agree to terms and conditions')
            .required('Required'),
        })}
        onSubmit={(values: FormValues, { setSubmitting, resetForm }) => {
          alert("submit successfully")
          console.log('Values:', values)
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-black text-black">Name</label>
              <Field type="text" className="form-control" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-black">Email address</label>
              <Field type="email" className="form-control" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label text-black">Phone</label>
              <PhoneInput
                country={'us'}
                value={values.phone}
                onChange={(value) => setFieldValue('phone', value)}
                inputProps={{
                  name: 'phone',
                  id: 'phone',
                  className: 'form-control',
                  placeholder: '',
                }}
              />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-black">Password</label>
              <div className="input-group passwordInput">
                <Field type={showPassword ? 'text' : 'password'} className="form-control" id="password" name="password" />
                <button
                  className="btn eyeBtn"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-black">Confirm Password</label>
              <div className="input-group passwordInput">
                <Field type={showConfirmPassword ? 'text' : 'password'} className="form-control" id="confirmPassword" name="confirmPassword" />
                <button
                  className="btn eyeBtn"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-check">
              <Field type="checkbox" className="form-check-input" id="agree" name="agree" />
              <label className="form-check-label text-black" htmlFor="agree">By signing up, you will agree to our <span className='text-blue fw-bold'>Terms, Data Policy</span> and <span className='text-blue fw-bold'> Cookies Policy.</span></label>
              <ErrorMessage name="agree" component="div" className="text-danger" />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btnSignUp btn-block">Sign Up</button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mb-3">
        <p className="fake-legend"><span>OR</span>
        </p>
      </div>
      <div className='text-black mb-3 text-center'>
        <small>Sign up with social media</small>
      </div>
      <div className='text-black mb-3 text-center'>
        <small>Already have an account? <span className='text-blue fw-bold'>Sign In</span></small>
      </div>

    </div>
  );
};

export default SignupForm;
