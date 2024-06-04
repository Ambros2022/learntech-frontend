// ExpertForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios'; // Import Axios
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const TALKExpertForm = () => {
  const router = useRouter();
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const contact_numberRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // Formik setup with validation using Yup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      contact_number: '',
      course: '',
      college: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').trim(),
      email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
      contact_number: Yup.string().matches(contact_numberRegExp, 'contact_number number is not valid').required('contact_number Number is required').trim(),
      course: Yup.string().required('Course is required').trim(),
      college: Yup.string().required('College name is required').trim()
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        toast.loading('Processing');
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('current_url', window.location.href);
        formData.append('contact_number', values.contact_number);
        formData.append('course', values.course);
        formData.append('college', values.college);

        const response = await axios.post('api/website/enquiry', formData);

        if (response.status === 200) {
          toast.dismiss();
          toast.success('Thank you. We will get back to you.');
          resetForm();
          router.push('/thank-you');
        }
      } catch (error) {
        toast.error('Try again later!');
        console.error('Error submitting form:', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container w-75 m-auto">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-2">
            <label htmlFor="expertName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="expertName"
              name="name"
              aria-describedby="expertName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-danger'>{formik.errors.name}</div>
            ) : null}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-2">
            <label htmlFor="expertEmail" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="expertEmail"
              name="email"
              aria-describedby="expertEmail"
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
          <div className="mb-2">
            <label htmlFor="expertcontact_number" className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="expertcontact_number"
              name="contact_number"
              aria-describedby="expertcontact_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact_number}
            />
            {formik.touched.contact_number && formik.errors.contact_number ? (
              <div className='text-danger'>{formik.errors.contact_number}</div>
            ) : null}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="expertCollege" className="form-label">Interested Course</label>
            <input
              type="text"
              className="form-control"
              id="expertCollege"
              name="course"
              aria-describedby="expertCollege"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.course}
            />
            {formik.touched.course && formik.errors.course ? (
              <div className='text-danger'>{formik.errors.course}</div>
            ) : null}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="expertCollege" className="form-label">College Name</label>
            <input
              type="text"
              className="form-control"
              id="expertCollege"
              name="college"
              aria-describedby="expertCollege"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.college}
            />
            {formik.touched.college && formik.errors.college ? (
              <div className='text-danger'>{formik.errors.college}</div>
            ) : null}
          </div>
        </div>
      </div>
      <div className='mb-2 text-center'>
        <button type="submit" className="btn ExpertSbtBtn">Submit</button>
      </div>
    </form>
  );
};

export default TALKExpertForm;
