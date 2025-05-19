import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
const PhoneInputField = dynamic(() => import('src/@core/components/popup/PhoneInput'), { ssr: false });
const Autocomplete = dynamic(() => import('src/@core/components/mui/autocomplete'), { ssr: false });
import Carousel from 'react-bootstrap/Carousel';
import Head from 'next/head';
import { GetStaticProps } from 'next/types';
let cancelToken: any;

interface Banner {
  image: string;
  link: string;
}

interface Props {
  banners: Banner[];
}

const phoneRegExp = /^(91\d{10}|(?!91)\d{3,})$/;

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
  contact_number: Yup.string().required("Phone Number is required"),
  course: Yup.string().required('Course is required'),
  location: Yup.string().required('Location is required'),
});

const BannerSection = ({ banners }: { banners: any[] }) => {
  console.log(banners, "banners")
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
        // toast.success('Thank you. We will get back to you.');
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
        streamID: entry?.streams?.id,
        streamSlug: entry?.streams?.slug,
        type: item.type,
      })));
      console.log(suggestions, "suggestions");
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
  const preloadImage = banners?.length ? banners[0].image : null;

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://api.learntechww.com/banners/logo1734425264066.webp"
          imageSrcSet="https://api.learntechww.com/banners/logo1734425264066.webp 1920w"
          imageSizes="100vw"
        />
      </Head>

      <section className="bannerCon bg-formClr" >



        {/* {banners?.length > 0 ? (
          <Carousel interval={1500} pause="hover" style={{ zIndex: '39' }}>
            {banners.map((banner, index) => (
              <Carousel.Item key={index}>
                <a href={banner.link}>
                  <Image
                    className="d-block w-100"
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                    alt={`Banner ${index}`}
                    width={1920}
                    height={500}
                    priority={index === 0} // preload the first image
                    style={{ width: '100%', height: 'auto' }}
                  />
                </a>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Skeleton height={500} />
        )} */}
        {banners?.length > 0 ? (
          <Carousel interval={5000} pause="hover" style={{ zIndex: '39' }}>
            {banners.map((banner, index) => (
              <Carousel.Item key={index}>
                <a
                  href={banner.link}
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    maxHeight: '600px',
                    overflow: 'hidden'
                  }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                    alt={`Banner ${index}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                  />
                </a>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Skeleton height={600} />
        )}



        <div className="bannerFormSec">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-6 mb-5 d-flex"  >
                  <div className="searchSec align-content-center" style={{ zIndex: '40' }}>
                    <div className="outlineSec">
                      <h1 className="fw-bold text-blue mb-3">Unlock a World of Academic Opportunities</h1>
                      <div className="row">
                        <div className="col-12 position-relative">
                          <Autocomplete
                            open={open}
                            onClose={() => setOpen(false)}
                            onInputChange={handleInputChange}
                            options={searchResults}
                            getOptionLabel={(option: any) => `${option.name} ${option.short_name}`} // Include both name and short_name
                            renderOption={(props: any, option: any) => {
                              const linkMap: { [key: string]: string } = {
                                collegedata: `/college/${option.id}/${option.slug}`,
                                schooldata: `/school/${option.id}/${option.slug}`,
                                examdata: `/exam/${option.id}/${option.slug}`,
                                coursesdata: `/course/${option?.streamID}/${option?.streamSlug}/${option.slug}`,

                              };

                              return (
                                <li {...props}>
                                  <Link href={linkMap[option.type] || "#"} style={{ color: "#000", textDecoration: "none", display: "block", width: "100%", height: "100%" }}>
                                    {option.name}
                                  </Link>
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                placeholder="Search for colleges, universities, exams & courses"
                                className="form-control"
                                InputProps={{
                                  ...params.InputProps,
                                  sx: {
                                    "& .MuiInputBase-input::placeholder": { color: "black" }
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
                                                params.inputProps.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
                                              }
                                            }}
                                          >
                                            <ClearIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      ) : null}
                                    </React.Fragment>
                                  )
                                }}
                              />
                            )}
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-lg-5 ps-xl-5 ps-lg-5 ms-auto mb-5" style={{ zIndex: '41' }}>
                  <div className="searchForm">
                    <h2 className="pb-3 fw-bold text-center text-blue">Start Your Journey with Expert Guidance!</h2>
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
                          <Field type="text" name="course" placeholder="Course in mind" className="form-control" />
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
    </>
  );
}

export default BannerSection;