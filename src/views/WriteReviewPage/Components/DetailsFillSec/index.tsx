import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
    //@ts-ignore
import Rating from 'react-rating-stars-component';

function DetailsFillSec() {

  const validationSchema1 = Yup.object().shape({
    college: Yup.string().required('College is required'),
    degree: Yup.string().required('Degree is required'),
    course: Yup.string().required('Course is required'),
    passingYear: Yup.string().required('Passing Year is required'),
  });

  const validationSchema2 = Yup.object().shape({
    name: Yup.string().required('Your Name is required'),
    rating: Yup.number().min(1, 'Rating is required').max(5, 'Maximum rating is 5').required('Rating is required'),
    review: Yup.string().required('Your Review is required'),
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (values, { resetForm }) => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      alert("Successfully Submitted");
      console.log("Values:", values);
      resetForm();
      setStep(1);
    }
  };

  return (
    <div className='container detailsFillSec'>
      <h5 className='text-center text-black pt-5 mb-4'>Please fill the below details to write a review</h5>
      <Formik
        initialValues={{
          college: '',
          course: '',
          degree: '',
          passingYear: '',
          name: '',
          rating: 0,
          review: '',
        }}
        validationSchema={step === 1 ? validationSchema1 : validationSchema2}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className='px-5'>
            {step === 1 && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="college" className="text-black fw-bold form-label"><small>Select College/University/School</small></label>
                      <Field as="select" name="college" id='college' className="form-select">
                        <option value="">Select College/University/School</option>
                        <option value="college1">College 1</option>
                        <option value="college2">College 2</option>
                        <option value="college3">College 3</option>
                      </Field>
                      <ErrorMessage name="college" component="div" className="error text-danger" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="degree" className="text-black fw-bold form-label"><small>Select Degree</small></label>
                      <Field as="select" name="degree" id='degree' className="form-select">
                        <option value="">Select Degree</option>
                        <option value="degree1">Degree 1</option>
                        <option value="degree1">Degree 2</option>
                        <option value="degree1">Degree 3</option>
                      </Field>
                      <ErrorMessage name="degree" component="div" className="error text-danger" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="course" className="text-black fw-bold form-label"><small>Select Course</small></label>
                      <Field as="select" name="course" id='course' className="form-select">
                        <option value="">Select Course</option>
                        <option value="course1">Course 1</option>
                        <option value="course2">Course 2</option>
                        <option value="course3">Course 3</option>
                      </Field>
                      <ErrorMessage name="course" component="div" className="error text-danger" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="passingYear" className="text-black fw-bold form-label"><small>Passing Year</small></label>
                      <Field as="select" name="passingYear" id='passingYear' className="form-select">
                        <option value="">Select your passing year</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </Field>
                      <ErrorMessage name="passingYear" component="div" className="error text-danger" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="co-12 d-flex justify-content-center">
                    <button type="submit" className="btn submitBtn">Next</button>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="text-black fw-bold form-label"><small>Your Name</small></label>
                      <Field type="text" name="name" id="name" placeholder="Enter your name" className="form-control" />
                      <ErrorMessage name="name" component="div" className="error text-danger" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="rating" className="text-black fw-bold form-label"><small>Rating</small></label>
            
                      <Rating
                          //@ts-ignore
                        name="rating"
                        count={5}
                        size={30}
                        value={values.rating}
                        onChange={(newValue: any) => setFieldValue('rating', newValue)}
                      />
                      <ErrorMessage name="rating" component="div" className="error text-danger" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="review" className="text-black fw-bold form-label"><small>Review</small></label>
                      <Field
                        as="textarea"
                        id="review"
                        name="review"
                        rows={4}
                        cols={50}
                      />
                      <ErrorMessage name="review" component="div" className="error text-danger" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="co-12 d-flex justify-content-center">
                    <button type="submit" className="btn submitBtn">Submit</button>
                  </div>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div >
  );
}

export default DetailsFillSec;
