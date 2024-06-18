import React, { useState } from 'react'
import Link from 'next/link'
import Autocomplete from 'src/@core/components/mui/autocomplete';
import { useRouter } from 'next/router';
import axios1 from 'axios';
import axios from 'src/configs/axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import SearchIcon from '@mui/icons-material/Search';
let cancelToken: any;

function BannerSec({ data }: any) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


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
      const response = await axios.get('api/website/generalcourse/get', { cancelToken: cancelToken.token, params: { searchfrom: "name", searchtext: value } });

      if (response.status == 200) {
        console.log("d", response.data.data);
        setSearchResults(response.data.data);
      }

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
    <>
      <section className='bg-blue courseSec'>
        <div className="container">
          <h1 className='text-white fw-bold pt-5 mb-3'>Choose By Interest</h1>
          <div>
            <div className="row">
              <div className="col-md-7 mb-3">
                <Autocomplete
                  open={open}
                  onClose={() => setOpen(false)}
                  onInputChange={handleInputChange}
                  options={searchResults}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props}>

                      <Link href={`/course/${option.streams.id}/${option?.streams?.slug}/${option.slug}`} style={{ color: "#000", textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}>
                        {option.name}
                      </Link>


                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search for course, degree or specialization"
                      // className="form-control"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        sx: {
                          backgroundColor: 'white',
                          color: 'black',
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

                {/* <input type="search" className='form-control' placeholder='Search for course, degree or specialization' /> */}


              </div>
              {/* <div className="mb-3 col-md-2 col-6 col-lg-1 col-xl-1 d-flex justify-content-start justify-content-md-center">
                <button className='btn bg-white text-blue srchBtn'>Search</button>
              </div> */}
            </div>
          </div>
          <h2 className='text-white fw-bold pt-3 mb-3'>Trending Courses</h2>
          <div className="d-flex pb-5 gap-2 flex-wrap justify-content-between">
            <div className='d-flex gap-2 flex-wrap mb-2 mb-lg-0'>
              {data.map((val) => (
                <Link href={`/course/${val?.streams?.id}/${val?.streams?.slug}/${val.slug}`}
                  className='btn trendCrsBtn'>{val.short_name}</Link>
              ))}
            </div>
            <div className='align-content-end'>
              <GlobalEnquiryForm buttonText="Check Eligibility" className="btn bg-warning text-white" />
              {/* <button className='btn bg-warning text-white'>Check Eligibility</button> */}
            </div>
          </div>
        </div>
      </section>
      <div className='bg-white py-2'>
        <section className=" mt-2 container CourseNavigationLink linkFontSize">
          <p><Link href={"/"}>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Courses</span></p>
        </section>
      </div>
    </>
  )
}

export default BannerSec
