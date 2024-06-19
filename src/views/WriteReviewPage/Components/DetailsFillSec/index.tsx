'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, MenuItem, Button } from '@mui/material';
import CustomTextField from 'src/@core/components/mui/text-field';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import axios1 from 'src/configs/axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Rating from 'react-rating-stars-component';
import router from 'next/router'

function DetailsFillSec() {
  const [colleges, setColleges] = useState([]);
  const [schools, setSchools] = useState([]);
  const [boards, setBoards] = useState([]);
  const [course, setCourse] = useState([]);
  const [schema, setSchema] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getcolleges = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10000 };
      const response = await axios1.get('api/website/colleges/get', { params: roleparams });
      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getschools = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10000 };
      const response = await axios1.get('api/website/schools/get', { params: roleparams });
      setSchools(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getboards = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10000 };
      const response = await axios1.get('api/website/schoolboard/get', { params: roleparams });
      setBoards(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getCourses = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10000 };
      const response = await axios1.get('api/website/generalcourse/get', { params: roleparams });
      setCourse(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getcolleges();
    getCourses();
    getschools();
    getboards();
  }, [getcolleges, getCourses, getschools, getboards]);

  const collegeSchema = Yup.object().shape({
    review_type: Yup.string().required('review_type is required'),
    passing_year: Yup.string().required('passing_year is required'),
    college_id: Yup.object().required("This field is required"),
    course_type: Yup.string().required("This field is required"),
    course_id: Yup.object().required("This field is required"),




  });
  const schoolSchema = Yup.object().shape({
    review_type: Yup.string().required('review_type is required'),
    passing_year: Yup.string().required('passing_year is required'),
    school_id: Yup.object().required("This field is required"),
    grade: Yup.string().required("This field is required"),
    school_board_id: Yup.object().required("This field is required"),

  });

  const validationSchema3 = Yup.object().shape({
    name: Yup.string().required('Your Name is required'),
    userrating: Yup.number().min(1, 'Rating is required').max(5, 'Maximum rating is 5').required('Rating is required'),
    content: Yup.string().required('Your Review is required'),
  });

  const [step, setStep] = useState(1);

  const onSubmit = async (data: any) => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      const url = 'api/website/addreview/post';
      const formData = new FormData();

      formData.append('review_type', data.review_type);
      if (data.review_type === 'college') {
        formData.append('college_id', data.college_id.id);
        formData.append('course_type', data.course_type);
        formData.append('course_id', data.course_id.id);
      } else if (data.review_type === 'school') {
        formData.append('school_id', data.school_id.id);
        formData.append('school_board_id', data.school_board_id.id);
        formData.append('grade', data.grade);
      }
      
      if (localStorage.getItem('UserData')) {
        let user: any = localStorage.getItem('UserData');
        let parsed: any = JSON.parse(user);
        console.log(parsed?.id);
        formData.append('user_id', JSON.parse(parsed?.id));
      }

      formData.append('passing_year', data.passing_year);
      formData.append('name', data.name);
      formData.append('userrating', data.userrating);
      formData.append('content', data.content);


      console.log(formData);
      return
      try {
        const response = await axios1.post(url, formData);
        if (response.data.status === 1) {
          toast.success(response.data.message);
          setLoading(false);
          router.push("/thank-you");
          reset();
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      } catch (err: any) {
        console.error(err);
        setLoading(false);
        toast.error(err.message || "Please try again");
      }
    }
  };

  const defaultValues = {
    review_type: 'college',
    college_id: '',
    school_id: '',
    school_board_id: '',
    grade: '',
    course_type: '',
    course_id: '',
    passing_year: '',
    name: '',
    userrating: 0,
    content: '',
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const reviewType = watch('review_type');

  useEffect(() => {

    if (step === 2) {
      setSchema(validationSchema3);
    } else {
      if (reviewType == "college") {
        setSchema(collegeSchema);
      }
      else {
        setSchema(schoolSchema);
      }

    }
  }, [step, setSchema, reviewType]);


  return (
    <div className='container detailsFillSec'>
      <h5 className='text-center text-black pt-5 mb-4'>Please fill the below details to write a review</h5>
      <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
        <Grid container spacing={5}>
          {step === 1 && (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='review_type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      value={value}
                      label='Select review_type'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.review_type)}
                      {...(errors.review_type && { helperText: 'This field is required' })}
                    >
                      <MenuItem value='college'>College</MenuItem>
                      <MenuItem value='school'>School</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              {reviewType === 'college' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='college_id'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomAutocomplete
                          fullWidth
                          options={colleges}
                          loading={!colleges.length}
                          value={field.value}
                          onChange={(event, newValue) => field.onChange(newValue)}
                          getOptionLabel={(option: any) => option.name || ''}
                          renderInput={(params: any) => (
                            <CustomTextField
                              {...params}
                              error={Boolean(errors.college_id)}
                              {...(errors.college_id && { helperText: 'Please Select College' })}
                              label='Select College/University'
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='course_type'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          select
                          value={value}
                          label='Select Degree'
                          onChange={onChange}
                          placeholder=''
                          error={Boolean(errors.course_type)}
                          {...(errors.course_type && { helperText: 'Please Select Degree' })}
                        >
                          <MenuItem value='UG'>UG</MenuItem>
                          <MenuItem value='Diploma'>Diploma</MenuItem>
                          <MenuItem value='PG'>PG</MenuItem>
                          <MenuItem value='Doctorate'>Doctorate</MenuItem>
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='course_id'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomAutocomplete
                          fullWidth
                          options={course}
                          loading={!course.length}
                          value={field.value}
                          onChange={(event, newValue) => field.onChange(newValue)}
                          getOptionLabel={(option: any) => option.name || ''}
                          renderInput={(params: any) => (
                            <CustomTextField
                              {...params}
                              error={Boolean(errors.course_id)}
                              {...(errors.course_id && { helperText: 'Please Select Course' })}
                              label='Select Course'
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}

              {reviewType === 'school' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='school_id'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomAutocomplete
                          fullWidth
                          options={schools}
                          loading={!schools.length}
                          value={field.value}
                          onChange={(event, newValue) => field.onChange(newValue)}
                          getOptionLabel={(option: any) => option.name || ''}
                          renderInput={(params: any) => (
                            <CustomTextField
                              {...params}
                              error={Boolean(errors.school_id)}
                              {...(errors.school_id && { helperText: 'Please Select School' })}
                              label='Select School'
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='school_board_id'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomAutocomplete
                          fullWidth
                          options={boards}
                          loading={!boards.length}
                          value={field.value}
                          onChange={(event, newValue) => field.onChange(newValue)}
                          getOptionLabel={(option: any) => option.name || ''}
                          renderInput={(params: any) => (
                            <CustomTextField
                              {...params}
                              error={Boolean(errors.school_board_id)}
                              {...(errors.school_board_id && { helperText: 'Please Select Board' })}
                              label='Select Board'
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='grade'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          select
                          value={value}
                          label='Select Grade'
                          onChange={onChange}
                          placeholder=''
                          error={Boolean(errors.grade)}
                          {...(errors.grade && { helperText: 'Please Select Grade' })}
                        >
                          <MenuItem value='K'>Kindergarten</MenuItem>
                          <MenuItem value='1'>1</MenuItem>
                          <MenuItem value='2'>2</MenuItem>
                          <MenuItem value='3'>3</MenuItem>
                          <MenuItem value='4'>4</MenuItem>
                          <MenuItem value='5'>5</MenuItem>
                          <MenuItem value='6'>6</MenuItem>
                          <MenuItem value='7'>7</MenuItem>
                          <MenuItem value='8'>8</MenuItem>
                          <MenuItem value='9'>9</MenuItem>
                          <MenuItem value='10'>10</MenuItem>
                          <MenuItem value='11'>11</MenuItem>
                          <MenuItem value='12'>12</MenuItem>
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={6}>
                <Controller
                  name='passing_year'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      value={value}
                      label='Select Passing Year'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.passing_year)}
                      {...(errors.passing_year && { helperText: 'Please Select Passing Year' })}
                    >
                      <MenuItem value='2024'>2024</MenuItem>
                      <MenuItem value='2023'>2023</MenuItem>
                      <MenuItem value='2022'>2022</MenuItem>
                      <MenuItem value='2021'>2019</MenuItem>
                      <MenuItem value='2020'>2020</MenuItem>
                      <MenuItem value='2019'>2019</MenuItem>
                      <MenuItem value='2018'>2018</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
            </>
          )}

          {step === 2 && (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Name'
                      onChange={onChange}
                      placeholder='Enter Your Name'
                      error={Boolean(errors.name)}
                      {...(errors.name && { helperText: 'Please Enter Your Name' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div className="px-0 px-md-5">
                  <label htmlFor="userrating" className="text-black fw-bold form-label">
                    <small>Rating</small>
                  </label>
                  <Controller
                    name="userrating"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Rating
                        name="userrating"
                        count={5}
                        size={30}
                        value={value}
                        onChange={(newValue) => onChange(newValue)}
                      />
                    )}
                  />
                  {errors.userrating && <div className="error text-danger">Please Select  Review</div>}
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='content'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Review'
                      multiline
                      rows={3}
                      onChange={onChange}
                      placeholder='Write your review'
                      error={Boolean(errors.content)}
                      {...(errors.content && { helperText: 'Please Enter Your Review' })}
                    />
                  )}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div className="row">
              <div className="co-12 d-flex justify-content-center">
                <Button type="submit" className='submitBtn' variant="contained" color="primary">
                  {step === 1 ? "Next" : "Submit Your Review"}
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default DetailsFillSec;
