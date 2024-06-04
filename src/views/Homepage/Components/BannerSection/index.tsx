import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios1 from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';


import Autocomplete from 'src/@core/components/mui/autocomplete';
let cancelToken: any;

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10,13}$/;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
  contact_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
  course: Yup.string().required('Course is required'),
  location: Yup.string().required('Location is required'),
});


function BannerSection() {
  const router = useRouter();
  const [banners, setBanners] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const getbanner = useCallback(async () => {
    try {
      const roleparams: any = { page: 1, size: 10000 };
      const response = await axios.get('api/website/banner/get?promo_banner=Draft', { params: roleparams });
      setBanners(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setImagesLoaded(true);
    }
  }, []);

  useEffect(() => {
    getbanner();
  }, [getbanner]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      toast.loading('Processing');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('contact_number', values.contact_number);
      formData.append('location', values.location);
      formData.append('course_in_mind', values.course);
      formData.append('current_url', window.location.href);
      const response = await axios.post('api/website/enquiry', formData);
      if (response.status === 200) {
        toast.dismiss();
        toast.success('Thank you. We will get back to you.');
        resetForm();
        router.push('/thank-you');
      }
    } catch (error) {
      toast.error('try again later!');
      console.error('Error submitting form:', error);
    }
  };

  const handleSearch = async (value) => {
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios1.CancelToken.source();
      const response = await axios.get('api/website/home/searchbar', { cancelToken: cancelToken.token, params: { searchfrom: "name", searchtext: value } });
      const suggestions = response.data.data.flatMap((item: { data: any[]; type: any; }) => item.data.map(entry => ({
        name: entry.name,
        slug: entry.slug,
        id: entry.id,
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
    handleSearch(value);
  };

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
              {imagesLoaded ? (
                <Image
                  fill
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                  priority={true}
                  className="w-100"
                  alt={`Banner ${index}`}
                />
              ) : (
                <Skeleton height={500} />
              )}
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
              <div className="col-md-6 col-lg-6 mb-5 d-flex" id="animation2">
                <div className="searchSec align-content-center">
                  <div className='outlineSec'>
                    <h1 className='fw-bold text-blue mb-3'>Find Colleges, Courses & Exams that are best for you</h1>
                    <div className="row">
                      <div className="col-12 position-relative">
                        <Autocomplete
                          open={open}
                          onClose={() => setOpen(false)}
                          onInputChange={handleInputChange}
                          options={searchResults}
                          getOptionLabel={(option) => option.name}
                          renderOption={(props, option) => (
                            <li {...props}>
                              {option.type === "collegedata" ? (
                                <Link href={`/college/${option.id}/${option.slug}`} style={{ color: "#000", textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}>
                                  {option.name}
                                </Link>
                              ) : (
                                <Link href={`/school/${option.id}/${option.slug}`} style={{ color: "#000", textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}>
                                  {option.name}
                                </Link>
                              )}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              placeholder="Search"
                              className="form-control"
                              InputProps={{
                                ...params.InputProps,
                                sx: {
                                  '& .MuiInputBase-input::placeholder': {
                                    color: 'black',
                                  },
                                },
                                endAdornment: (
                                  <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                    {params.inputProps.value ? (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => {
                                            if (params.inputProps.onChange) {
                                              const event = {
                                                target: {
                                                  value: ''
                                                }
                                              } as React.ChangeEvent<HTMLInputElement>;
                                              params.inputProps.onChange(event);
                                            }
                                          }}
                                        >
                                          <ClearIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    ) : null}
                                  </React.Fragment>
                                ),
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-lg-5 ps-xl-5 ps-lg-5 ms-auto mb-5" id="animation3">
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
                        <PhoneInputField name="contact_number" />
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
  );
}

export default BannerSection;
