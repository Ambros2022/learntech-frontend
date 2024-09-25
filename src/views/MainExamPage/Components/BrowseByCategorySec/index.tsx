import React, { useCallback, useEffect, useState } from 'react';
import CategoryCarousel from './CategoryCarousel'; // Adjust the import path as necessary
import NewsList from '../newsList';
import NewsListAbroad from '../newsListAbroad';
import ExamCard from '../ExamCardList';
import axios from 'src/configs/axios';
import SideContactUsForm from 'src/@core/components/popup/SideContactUsForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios1 from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const BrowsebyCategorySec = ({ countryData, streams }) => {
    const [scholarshipsData, setScholarshipsData] = useState<any>([]);  // Use any type for tabs
    const [totalScholarships, setTotalScholarships] = useState(0);
    const [items, setItems] = useState<{ id: string; title: string }[]>([]);
    const [examsData, setExamsData] = useState({});
    const [newsData, setNewsData] = useState([]);
    const [newsDataAbroad, setNewsDataAbroad] = useState([]);
    const isMountedRef = useIsMountedRef();
    const [searchText, setSearchText] = useState('');
    const [formData, setFormData] = useState({
        level_of_study: '',
        types_of_exam: '',
        stream_id: '',
        country_id: '',
        deadline: ''
    });
    const perPage = 9; // Number of items per page

    let cancelToken: any;

    interface SearchResult {
        id: number;
        name: string;
    }

    const [activeTab, setActiveTab] = useState('');
    // const [currentExams, setCurrentExams] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const examsPerPage = 9;
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const handleClearAll = () => {
        setFormData({
            level_of_study: '',
            types_of_exam: '',
            stream_id: '',
            country_id: '',
            deadline: ''
        });
    };

    const handleSelectChange = (e) => {
        setSearchText("");
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const getScholarship = useCallback(async (country_id, level_of_study, types_of_exam, stream_id) => {
        setIsLoading(true);
        try {
            const params = {
                country_id: country_id !== '' ? country_id : undefined,
                level_of_study: level_of_study !== '' ? level_of_study : undefined,
                types_of_exam: types_of_exam !== '' ? types_of_exam : undefined,
                stream_id: stream_id !== '' ? stream_id : undefined,
                searchfrom: 'name', // Specify the field to search against
                searchtext: searchText, // Include searchtext parameter
                page: currentPage,  // Use currentPage for pagination
                size: perPage
            };

            let url = 'api/website/exams/get';
            // if (countryId !== '204') {
            //     url += `?country_id=${countryId}`;
            // }

            const response = await axios.get(url, { params });
            console.log(response)
            setScholarshipsData(response.data.data); // Ensure the structure of response.data fits your expected scholarship data format
            setTotalScholarships(response.data.data.length);
            // setTotalPages(response.data.data.totalPages);
            setTotalPages(Math.ceil(response.data.totalItems / perPage));
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isMountedRef, formData, searchText, perPage, currentPage]);



    useEffect(() => {
        getScholarship(formData.country_id, formData.level_of_study, formData.types_of_exam, formData.stream_id,);
    }, [formData.country_id, formData.level_of_study, formData.types_of_exam, formData.stream_id, getScholarship, searchText, currentPage]);



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

            const response = await axios.get('api/website/scholarships/get', {
                cancelToken: cancelToken.token,
                params: { searchfrom: 'name', searchtext: value },
            });

            const suggestions = response.data.data.map((item: { id: number; name: string }) => ({
                name: item.name,
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
    const getCategoriesData = useCallback(async () => {
        try {
            const response = await axios.get('api/website/stream/get?page=1&size=50');
            if (response.data.status === 1) {
                const categories = response.data.data.map(category => ({
                    id: category.id,
                    title: category.name
                }));
                // Add "All" category
                setItems([{ id: 'all', title: 'All Exams' }, ...categories]);
                setActiveTab('all'); // Set "All" tab as active initially
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, [isMountedRef]);

    const getExamsData = useCallback(async (id, page = 1) => {
        try {
            const roleparams = { page, size: examsPerPage };
            const url = id === 'all' ? 'api/website/exams/get' : `api/website/exams/get?stream_id=${id}`;
            const response = await axios.get(url, { params: roleparams });

            if (response.data.status === 1) {
                setExamsData(prevState => ({
                    ...prevState,
                    [id]: response.data.data
                }));
                setTotalPages(response.data.totalPages); // Set total pages from API response
            } else {
                console.error('Failed to fetch exams');
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }, [examsPerPage, isMountedRef]);

    const getnews = useCallback(async () => {
        try {
            const roleparams = { page: 1, size: 10000, country_id: 204 };
            const response = await axios.get('/api/website/news/get', { params: roleparams });
            setNewsData(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    const getabroadnews = useCallback(async () => {
        try {
            const roleparams = { page: 1, size: 10000 };
            const response = await axios.get('/api/website/news/get', { params: roleparams });
            setNewsDataAbroad(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getCategoriesData();
        getnews();
        getabroadnews();
    }, [getCategoriesData, getabroadnews, getnews]);

    useEffect(() => {
        if (activeTab) {
            getExamsData(activeTab, currentPage);
        }
    }, [activeTab, currentPage, getExamsData]);

    const handleTabClick = (id) => {
        setActiveTab(id);
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getExamsData(activeTab, newPage); // Fetch new data for the previous page
            return newPage;
        });
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalPages);
            getExamsData(activeTab, newPage); // Fetch new data for the next page
            return newPage;
        });
    };

    const ScholarshipCards = ({ data }) => {
        console.log("W", data);
        const startIndex = (currentPage - 1) * perPage;
        const paginatedScholarships = data.slice(startIndex, startIndex + perPage);
        return (
            <div className="row d-flex flex-fill">
                {paginatedScholarships.map((scholarship, index) => (
                    <div className="col-md-4 mb-3">
                        <a href={`/exam/${scholarship.id}/${scholarship.slug}`} >
                            <div className="card hover-card examsCardRow">
                                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${scholarship.cover_image}`} width={300} height={300} className="card-img-top" alt={scholarship.exam_title} />
                                <div className="card-body text-center">
                                    <h5 className="fw-bold text-center card-title text-truncate">{scholarship.exam_title}</h5>
                                    {/* <small className="text-blue card-text text-truncate">{formatDate(date)}</small> */}
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        );
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        getExamsData(activeTab, page); // Fetch data for the clicked page
    };

    // const currentExams = examsData[activeTab]?.slice((currentPage - 1) * examsPerPage, currentPage * examsPerPage) || [];

    const currentExams = examsData[activeTab] || [];

    const totalExams = examsData[activeTab]?.length || 0;

    return (
        <section className='bg-white'>
            <div className="container categorySecCarousel position-relative px-md-5 px-0 pt-2 pb-5">
                <h2 className='fw-bold text-blue mb-5 text-center '>List of Entrance Exams in India
                </h2>
                {/* <div className='examSecItems'> */}
                <div className="row">
                    <div className="col-lg-7 col-xl-8">
                        <CategoryCarousel items={items} handleTabClick={handleTabClick} activeTab={activeTab} />
                    </div>
                </div>
                {/* </div> */}
                <div className="tab-content" id="pills-tabContent">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
                            id={`pills-${item.id}`}
                            role="tabpanel"
                            aria-labelledby={`pills-${item.id}-tab`}
                        >
                            <div className='topCourseConCarousel pt-5'>
                                <div className="row ">
                                    <div className="col-lg-7 col-xl-8">
                                        <div className="row px-md-0 px-3">
                                            {currentExams.length > 0 ? (
                                                currentExams.map((exam, index) => (
                                                    <ExamCard key={index} id={exam.id} cover_image={exam.cover_image} title={exam.exam_title} slug={exam.slug} date={exam.created_at} />
                                                ))
                                            ) : (
                                                <div className="text-center mb-5">No data</div>
                                            )}
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination d-flex gap-3">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                                                            <span aria-hidden="true">{'<'}</span>
                                                        </button>
                                                    </li>
                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handleNextPage} aria-label="Next">
                                                            <span aria-hidden="true">{'>'}</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <div className="mb-3 rounded p-3">
                                            <h2 className='fw-bold text-blue mb-5 text-center '>Entrance Exams for Study Abroad
                                            </h2>
                                            <h4 className='text-blue fw-bold mb-3'>Filter By</h4>

                                            <div className="d-flex gap-3 flex-wrap">

                                                <div className="align-self-center flex-grow-1">
                                                    <label htmlFor="country_id" className='text-black fw-bold mb-2'>Select Country</label>
                                                    <div className="position-relative w-100">
                                                        <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                            id="country_id"
                                                            value={formData.country_id}
                                                            onChange={handleSelectChange}
                                                            style={{
                                                                appearance: 'none', // Hide the default arrow
                                                                WebkitAppearance: 'none',
                                                                MozAppearance: 'none',
                                                                background: 'transparent', // Ensure background is transparent for icon positioning
                                                                paddingRight: '2.5rem', // Add space for the icon
                                                            }}>
                                                            <option value="">Select</option>
                                                            {countryData.map(option => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                            style={{
                                                                right: '1rem', // Adjust based on padding
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                            }}></i>
                                                    </div>
                                                </div>
                                                {/* <div className="align-self-center flex-grow-1">
                                                    <label htmlFor="level_of_study" className='text-black fw-bold mb-2'>Level of study</label>
                                                    <div className="position-relative w-100">
                                                        <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                            id="level_of_study"
                                                            value={formData.level_of_study}
                                                            onChange={handleSelectChange}
                                                            style={{
                                                                appearance: 'none', // Hide the default arrow
                                                                WebkitAppearance: 'none',
                                                                MozAppearance: 'none',
                                                                background: 'transparent', // Ensure background is transparent for icon positioning
                                                                paddingRight: '2.5rem', // Add space for the icon
                                                            }}>
                                                            <option value="">Select</option>
                                                            {levelOptions.map(option => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                            style={{
                                                                right: '1rem', // Adjust based on padding
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                            }}></i>
                                                    </div>
                                                </div> */}
                                                <div className="align-self-center flex-grow-1">
                                                    <label htmlFor="level_of_study" className='text-black fw-bold mb-2'>Level of study</label>
                                                    <div className="position-relative w-100">
                                                        <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                            id="level_of_study"
                                                            value={formData.level_of_study}
                                                            onChange={handleSelectChange}
                                                            style={{
                                                                appearance: 'none', // Hide the default arrow
                                                                WebkitAppearance: 'none',
                                                                MozAppearance: 'none',
                                                                background: 'transparent', // Ensure background is transparent for icon positioning
                                                                paddingRight: '2.5rem', // Add space for the icon
                                                            }}>
                                                            <option value="">select</option>
                                                            <option value="UG">UG</option>
                                                            <option value="PG">PG</option>
                                                            <option value="professional">Professional</option>
                                                        </select>
                                                        <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                            style={{
                                                                right: '1rem', // Adjust based on padding
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                            }}></i>
                                                    </div>
                                                </div>
                                                <div className="align-self-center flex-grow-1">
                                                    <label htmlFor="types_of_exam" className='text-black fw-bold mb-2'>Type of exam</label>
                                                    <div className="position-relative w-100">
                                                        <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                            id="types_of_exam"
                                                            value={formData.types_of_exam}
                                                            onChange={handleSelectChange}
                                                            style={{
                                                                appearance: 'none', // Hide the default arrow
                                                                WebkitAppearance: 'none',
                                                                MozAppearance: 'none',
                                                                background: 'transparent', // Ensure background is transparent for icon positioning
                                                                paddingRight: '2.5rem', // Add space for the icon
                                                            }}>
                                                            <option value="">select</option>
                                                            <option value="Language_Proficiency">Language Proficiency</option>
                                                            <option value="Aptitiude_Test">Aptitiude Test</option>
                                                            <option value="Streams">Streams</option>
                                                        </select>
                                                        <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                            style={{
                                                                right: '1rem', // Adjust based on padding
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                            }}></i>
                                                    </div>
                                                </div>
                                                {
                                                    formData.types_of_exam && formData.types_of_exam === 'Streams' ? (
                                                        <div className="align-self-center">
                                                            <label htmlFor="stream_id" className='text-black fw-bold mb-2'>Select Stream</label>
                                                            <div className="position-relative w-100">
                                                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                                    id="stream_id"
                                                                    value={formData.stream_id}
                                                                    onChange={handleSelectChange}
                                                                    style={{
                                                                        appearance: 'none', // Hide the default arrow
                                                                        WebkitAppearance: 'none',
                                                                        MozAppearance: 'none',
                                                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                                                        paddingRight: '2.5rem', // Add space for the icon
                                                                    }}>
                                                                    <option value="">Select</option>
                                                                    {streams.map(option => (
                                                                        <option key={option.id} value={option.id}>{option.name}</option>
                                                                    ))}
                                                                </select>
                                                                <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                                    style={{
                                                                        right: '1rem', // Adjust based on padding
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                                    }}></i>
                                                            </div>
                                                        </div>) : ''
                                                }

                                                {/* <div className="align-self-center flex-grow-1">
                                                    <label htmlFor="types_of_exam" className='text-black fw-bold mb-2'>Type</label>
                                                    <div className="position-relative w-100">
                                                        <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                            id="types_of_exam"
                                                            value={formData.types_of_exam}
                                                            onChange={handleSelectChange}
                                                            style={{
                                                                appearance: 'none', // Hide the default arrow
                                                                WebkitAppearance: 'none',
                                                                MozAppearance: 'none',
                                                                background: 'transparent', // Ensure background is transparent for icon positioning
                                                                paddingRight: '2.5rem', // Add space for the icon
                                                            }}>
                                                            <option value="">Select</option>
                                                            {typeOptions.map(option => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                            style={{
                                                                right: '1rem', // Adjust based on padding
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                            }}></i>
                                                    </div>
                                                </div> */}
                                                {/* <div className="align-self-center flex-grow-1">
                                                    <label htmlFor="gender" className='text-black fw-bold mb-2'>Gender</label>
                                                    <div className="position-relative w-100">
                                                        <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                            id="gender"
                                                            value={formData.gender}
                                                            onChange={handleSelectChange}
                                                            style={{
                                                                appearance: 'none', // Hide the default arrow
                                                                WebkitAppearance: 'none',
                                                                MozAppearance: 'none',
                                                                background: 'transparent', // Ensure background is transparent for icon positioning
                                                                paddingRight: '2.5rem', // Add space for the icon
                                                            }}>
                                                            <option value="">select</option>
                                                            <option value="1">Male</option>
                                                            <option value="2">Female</option>
                                                            <option value="3">others</option>
                                                        </select>
                                                        <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                            style={{
                                                                right: '1rem', // Adjust based on padding
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                            }}></i>
                                                    </div>
                                                </div> */}

                                                <div className="align-self-center pt-4">
                                                    <button className='btn viewMoreCollegeBtn align-self-center' onClick={handleClearAll}>Clear All</button>
                                                </div>
                                            </div>

                                        </div>
                                        {isLoading ? (
                                            <div className="text-center">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <ScholarshipCards data={scholarshipsData} />
                                        )}                                        {/* Pagination */}
                                        <div className="row col-md-12 blogCardspage">
                                            <div className='d-flex justify-content-center'>
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination d-flex gap-3">
                                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                            <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                                                                <span aria-hidden="true">{'<'}</span>
                                                            </button>
                                                        </li>
                                                        {Array.from({ length: totalPages }, (_, index) => (
                                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                                <button className="page-link" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
                                                            </li>
                                                        ))}
                                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                            <button className="page-link" onClick={handleNextPage} aria-label="Next">
                                                                <span aria-hidden="true">{'>'}</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-xl-4">
                                        <div className='bg-skyBlue px-lg-5 px-md-3 px-3 mb-5 rounded'>
                                            <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h4>
                                            <div className='examsForm'>
                                                <SideContactUsForm />
                                            </div>
                                        </div>
                                        {newsData && newsData !== null ? (<NewsList newsItems={newsData} />) : ""}
                                        {newsDataAbroad && newsDataAbroad !== null ? (<NewsListAbroad newsItems={newsDataAbroad} />) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowsebyCategorySec;
