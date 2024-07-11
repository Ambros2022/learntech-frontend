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
  const [showStep2, setShowStep2] = useState<boolean>(false); // New state for step 2 visibility

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

  const onSubmit = async (data: any) => {
    if (!showStep2) {
      setShowStep2(true);
    } else {
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
        formData.append('user_id', JSON.parse(parsed?.id));
      }

      formData.append('passing_year', data.passing_year);
      formData.append('name', data.name);
      formData.append('userrating', data.userrating);
      formData.append('content', data.content);

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
    if (showStep2) {
      setSchema(validationSchema3);
    } else {
      if (reviewType == "college") {
        setSchema(collegeSchema);
      }
      else {
        setSchema(schoolSchema);
      }
    }
  }, [showStep2, setSchema, reviewType]);

  return (
    <div className='container detailsFillSec'>
      <h5 className='text-center text-black pt-5 mb-4'>Please fill the below details to write a review</h5>
      <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
        <Grid container spacing={5}>
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
                  {...(errors.review_type && { helperText: String(errors.review_type.message) })}
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
                      {...(errors.course_type && { helperText: String(errors.course_type.message) })}
                    >
                      <MenuItem value='UG'>UG</MenuItem>
                      <MenuItem value='Diploma'>Diploma</MenuItem>
                      <MenuItem value='PG'>PG</MenuItem>
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
                          label='Select School Board'
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
                      {...(errors.grade && { helperText: String(errors.grade.message) })}
                    >
                      <MenuItem value='10'>10th</MenuItem>
                      <MenuItem value='11'>11th</MenuItem>
                      <MenuItem value='12'>12th</MenuItem>
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
                  label='Passing Year'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.passing_year)}
                  {...(errors.passing_year && { helperText: String(errors.passing_year.message) })}
                >
                  {Array.from({ length: 50 }, (_, i) => (
                    <MenuItem key={i} value={2000 + i}>
                      {2000 + i}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>
        </Grid>

        {showStep2 && (
          <>
            <Grid container spacing={5} className='pt-4'>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Your Name'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.name)}
                      {...(errors.name && { helperText: String(errors.name.message) })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='userrating'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Rating
                      count={5}
                      value={value}
                      size={24}
                      activeColor="#ffd700"
                      onChange={onChange}
                    />
                  )}
                />
                {errors.userrating && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{String(errors.userrating.message)}</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='content'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      multiline
                      rows={4}
                      value={value}
                      label='Your Review'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.content)}
                      {...(errors.content && { helperText: String(errors.content.message) })}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={5} className='pt-4'>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="secondary" fullWidth onClick={() => setShowStep2(false)}>
                  Back
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        {!showStep2 && (
          <Grid container spacing={5} className='pt-4'>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Next
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </div>
  );
}

export default DetailsFillSec;
