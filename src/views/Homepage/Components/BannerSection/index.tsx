import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios1 from 'src/configs/axios'
import Autocomplete from 'src/@core/components/mui/autocomplete';
import { CircularProgress, TextField } from '@mui/material';

function BannerSection() {

  const [banners, setBanners] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(searchResults, "searchResults")

  const [inputValue, setInputValue] = useState('');

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
    contact_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone NUmber is required"),
    course: Yup.string().required('Course is required'),
    location: Yup.string().required('Location is required'),
    current_url: Yup.string().required('Url is required'),
  });


  //get all banners
  const getbanner = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10000;
      const response = await axios1.get('api/website/banner/get?promo_banner=Draft', { params: roleparams });

      setBanners(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log("banners", banners)

  useEffect(() => {

    getbanner();

  }, [getbanner]);



  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await axios1.post('api/website/enquiry', values);
      alert('Successfully Submitted');
      console.log('Response:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleSearch = async (value) => {
    if (value.length < 3) {
      setSearchResults([]);

      return;
    }
    try {
      setLoading(true);
      const response = await axios1.get('api/website/home/searchbar', { params: { query: value } });
      const suggestions = response.data.data.flatMap((item: { data: any[]; type: any; }) => item.data.map(entry => ({
        name: entry.name,
        slug: entry.slug,
        type: item.type,
      })));
      setSearchResults(suggestions);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
    handleSearch(value);
  };


  // console.log("banner" , banners)

  return (
    <section className="bannerCon bg-formClr" id="animation1">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          {banners.map((banner, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_API_URI}/${banner.image}`}

                priority={true}
                className="w-100"
                alt={`Banner ${index}`}
              />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="bannerFormSec">
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-7 mb-5 d-flex" id="animation2">
                <div className="searchSec align-content-center">
                  <h1 className='mb-3'>Find Colleges, Courses & Exams that are best for you</h1>
                  <div className="row">
                    <div className="col-7 col-md-8 col-lg-9 position-relative">
                      <Autocomplete
                        open={open}
                        onClose={() => setOpen(false)}
                        onInputChange={handleInputChange}
                        options={searchResults}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <a href={`/${option.type}/${option.slug}`} style={{ color: "#000" }}>
                              {option.name}
                            </a>
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Search"
                            // className="form-control"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="col-5 text-center col-md-4 col-lg-3 p-0">
                      <button className="btn searchBtn" onClick={() => handleSearch(inputValue)}>Search</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 mb-5" id="animation3">
                <div className="searchForm">
                  <h5 className="pb-3 fw-bold text-center text-blue">Let’s build a better future for you</h5>
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      contact_number: '',
                      current_url: '',
                      course: '',
                      location: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    resetForm
                  >
                    <Form>
                      <div className="mb-3">
                        <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="error text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="error text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="contact_number" placeholder="Enter Phone Number" className="form-control" />
                        <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="course" placeholder="Enter Course" className="form-control" />
                        <ErrorMessage name="course" component="div" className="error text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="location" placeholder="Enter Location" className="form-control" />
                        <ErrorMessage name="location" component="div" className="error text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="current_url" placeholder="Enter Url" className="form-control" />
                        <ErrorMessage name="current_url" component="div" className="error text-danger" />
                      </div>

                      <div className="d-grid">
                        <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Submit</button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
export default BannerSection
