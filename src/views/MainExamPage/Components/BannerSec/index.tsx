import React, { useState } from 'react'
import PopularCourses from '../UpcomingExamsSec'
import Link from 'next/link';
import { Autocomplete, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import axios1 from 'axios';
import axios from 'src/configs/axios';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';




let cancelToken: any;

interface SearchResult {
    id: number;
    exam_title: string;
  }
  

function BannerSection() {
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);



    const handleSearch = async (value: string) => {
        if (value.length < 2) {
          setSearchResults([]);
          setOpen(false); // Close the dropdown if the input is too short
          return;
        }
    
        try {
          setLoading(true);
          if (cancelToken !== undefined) {
            cancelToken.cancel('Operation canceled due to new request.');
          }
          cancelToken = axios1.CancelToken.source();
    
          const response = await axios.get('api/website/exams/get', {
            cancelToken: cancelToken.token,
            params: { searchfrom: 'exam_title', searchtext: value },
          });
    
          const suggestions = response.data.data.map((item: { id: number; exam_title: string }) => ({
            exam_title: item.exam_title,
            id: item.id,
          }));
    
          setSearchResults(suggestions);
          setOpen(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
    
      const handleInputChange = (event: any, value: string) => {
        handleSearch(value);
      };

      const handleClearInput = (params: any) => {
        setSearchResults([]);
        setOpen(false);
        if (params.inputProps.onChange) {
          const event = {
            target: {
              value: '',
            },
          } as React.ChangeEvent<HTMLInputElement>;
          params.inputProps.onChange(event);
        }
      };
    



    return (
        <>
            <section className='collegeBannerCon bg-blue examsBannerCon'>
                <div className='d-flex justify-content-center w-100 h-100'>
                    <div className='align-content-center w-100 container'>
                        <h1 className='fw-bold text-center text-white mb-3'>
                            Entrance Exams in India
                        </h1>
                        <div className="row">
                        <div className="col-7 mb-3">
                            <Autocomplete
                            open={open}
                            onClose={() => setOpen(false)}
                            onInputChange={handleInputChange}
                            options={searchResults}
                            getOptionLabel={(option: SearchResult) => option.exam_title}
                            renderOption={(props, option: SearchResult) => (
                                <li {...props}>
                                <Link
                                    href={`/exam/${option.id}/${option.exam_title}`}
                                    style={{ color: '#000', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                                >
                                    {option.exam_title}
                                </Link>
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                placeholder="Search"
                                className='form-control'
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                    ),
                                
                                    endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.inputProps.value ? (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handleClearInput(params)}>
                                            <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                    ),
                                }}
                                />
                            )}
                            
                            
                            />
                            </div>
                        </div>
                        <div className="row text-white text-md-start text-center pt-3 mb-3">
                            <h2>Upcoming Exams</h2>
                        </div>
                        <PopularCourses />
                        <div className='text-md-end text-center pt-3'>
                            <button className='btn alertExamBtn'>Get Exams Alert</button>

                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-white">
                <section className='container py-3'>
                    <Link className="text-black" href='/'>Home</Link> {'>'} <Link className='text-blue' href='/exams'>Exams</Link>
                </section>
            </div>
        </>
    )
}

export default BannerSection;