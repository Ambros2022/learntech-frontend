import React, { useCallback, useEffect, useState } from 'react';
import TabCarousel from '../TabCarousel';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';

const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });


const FilterSec = ({ abroadData, levelOptions, typeOptions, countryData }) => {
    const [scholarshipsData, setScholarshipsData] = useState<any>([]);  // Use any type for tabs
    const isMountedRef = useIsMountedRef();
    const [activeTab, setActiveTab] = useState('all');  // State to manage active tab
    const [currentPage, setCurrentPage] = useState(1);  // State for current page
    const perPage = 9; // Number of items per page
    const [totalScholarships, setTotalScholarships] = useState(0);
    // const totalPages = Math.ceil(totalScholarships / perPage);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [formData, setFormData] = useState({
        levelOfStudy: '',
        type: '',
        gender: '',
        nationality: '',
        deadline: ''
    });



    // Function to handle input change for search text
    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClearAll = () => {
        setFormData({
            levelOfStudy: '',
            type: '',
            gender: '',
            nationality: '',
            deadline: ''
        });
    };

    const handleSelectChange = (e) => {
        setSearchText("");
        const { id, value } = e.target;
        if (id === "deadline") {
            setFormData(prevState => ({
                ...prevState,
                deadline: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const getScholarship = useCallback(async (countryId, levelId, TypeId, CountryId) => {
        try {
            const params = {
                level_id: levelId !== '' ? levelId : undefined,
                type_id: TypeId !== '' ? TypeId : undefined,
                country_id: CountryId !== '' ? CountryId : undefined,
                gender: formData.gender,
                searchfrom: 'name', // Specify the field to search against
                searchtext: searchText, // Include searchtext parameter
                page: currentPage,  // Use currentPage for pagination
                size: perPage
            };
            let startDate, endDate;
            switch (formData.deadline) {
                case "Jan - Mar":
                    startDate = 0; // January
                    endDate = 2;   // March
                    break;
                case "Apr - Jun":
                    startDate = 3; // April
                    endDate = 5;   // June
                    break;
                case "Jul - Sep":
                    startDate = 6; // July
                    endDate = 8;   // September
                    break;
                case "Oct - Dec":
                    startDate = 9; // October
                    endDate = 11;  // December
                    break;
                default:
                    startDate = 0; // Default to January if not specified
                    endDate = 2;
                    break;
            }
            let url = 'api/website/scholarships/get';
            if (countryId !== 'all') {
                url += `?country_id=${countryId}`;
            }
           
            const response = await axios.get(url, {  params: {
                ...params,
                startDate,
                endDate
            } });
            setScholarshipsData(response.data.data); // Ensure the structure of response.data fits your expected scholarship data format
            setTotalScholarships(response.data.data.length);
            // setTotalPages(response.data.data.totalPages);
            setTotalPages(Math.ceil(response.data.totalItems / perPage));
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        }
    }, [isMountedRef, formData, searchText, perPage, currentPage]);


    console.log(formData.deadline ,"formData.deadline")

    useEffect(() => {
        getScholarship(activeTab, formData.levelOfStudy, formData.type, formData.nationality);
    }, [activeTab, formData.levelOfStudy, formData.type, formData.nationality, getScholarship, searchText, currentPage]);



    const renderScholarshipDetails = (scholarship) => (
        <ul className='text-black'>

            <li>International Student Eligible: {scholarship.is_eligible === 1 ? 'Yes' : 'No'}</li>
            <li>Amount : {scholarship.amount}</li>
            <li>Type: {scholarship.scholartypes ? scholarship.scholartypes.name : 'Not specified'}</li>
            <li>Level Of Study: {scholarship.scholarlevels ? scholarship.scholarlevels.name : 'Not specified'}</li>
            <li>Total Scholarships: {scholarship.total_scholarships}</li>
        </ul>
    );

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab.id);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };



    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const ScholarshipCards = ({ }) => {
        const startIndex = (currentPage - 1) * perPage;
        const paginatedScholarships = scholarshipsData.slice(startIndex, startIndex + perPage);
        return (
            <div className="row d-flex flex-fill">
                {paginatedScholarships.map((scholarship, index) => (
                    <div className="col-md-10 col-lg-6 col-xl-6 mb-3" key={index}>
                        <div className="card bg-skyBlue p-3">
                            <h4 className='text-blue fw-bold'>{scholarship.name}</h4>
                            <h6 className='text-black fw-bold'>{scholarship.university}</h6>
                            {renderScholarshipDetails(scholarship)}
                            <Link href={`/scholarship/${scholarship.id}/${scholarship.name}`}
                                className='mb-3 text-blue fw-bold btn text-start'>Read More {'>>'}</Link>
                            <div className="d-flex gap-3 flex-fill scholarshipBtn">

                                <GlobalEnquiryForm
                                    buttonText="Apply Now"
                                    className="btn applyNowButton"
                                />
                                <Link href={`/scholarship/${scholarship.id}/${scholarship.name}`}>
                                    <button className='btn viewDetailBtn'>Get Alert</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <section className='bg-white py-5'>
            <div className="container">
                <div className="card mb-3 filterCardSec filterscholarship border-1 rounded p-3">
                    <h4 className='text-blue fw-bold mb-3'>Filter By</h4>

                    <div className="d-flex gap-3 flex-wrap">
                        <div className="align-self-center flex-grow-1">
                            <label htmlFor="levelOfStudy" className='text-black fw-bold mb-2'>Level of study</label>
                            <div style={{ position: 'relative' }}>
                                <select className='form-control text-black w-100'
                                    id="levelOfStudy"
                                    value={formData.levelOfStudy}
                                    onChange={handleSelectChange}
                                    style={{ paddingRight: '2.5rem' }}>
                                    <option value="">select</option>
                                    {levelOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i> {/* Replace with your desired icon */}
                                </div>
                            </div>
                        </div>

                        <div className="align-self-center flex-grow-1">
                            <label htmlFor="type" className='text-black fw-bold mb-2'>Type</label>
                            <div style={{ position: 'relative' }}>
                                <select className='form-control text-black w-100'
                                    id="type"
                                    value={formData.type}
                                    onChange={handleSelectChange}>
                                    <option value="">select</option>
                                    {typeOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i> {/* Replace with your desired icon */}
                                </div>
                            </div>
                        </div>
                        <div className="align-self-center flex-grow-1">
                            <label htmlFor="gender" className='text-black fw-bold mb-2'>Gender</label>
                            <div style={{ position: 'relative' }}>
                                <select className='form-control text-black w-100'
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleSelectChange}
                                    style={{ paddingRight: '2.5rem' }}>


                                    <option value="">select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="LGBT">LGBT</option>
                                </select>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i> {/* Replace with your desired icon */}
                                </div>
                            </div>
                        </div>

                        <div className="align-self-center flex-grow-1">
                            <label htmlFor="nationality" className='text-black fw-bold mb-2'>Nationality</label>
                            <div style={{ position: 'relative' }}>
                                <select className='form-control text-black w-100'
                                    id="nationality"
                                    value={formData.nationality}
                                    onChange={handleSelectChange}>
                                    <option value="">select</option>
                                    {countryData.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i> {/* Replace with your desired icon */}
                                </div>
                            </div>
                        </div>
                        <div className="align-self-center flex-grow-1">
                            <label htmlFor="deadline" className='text-black fw-bold mb-2'>Deadline</label>
                            <div style={{ position: 'relative' }}>
                                <select className='form-control text-black w-100'
                                    id="deadline"
                                    value={formData.deadline}
                                    onChange={handleSelectChange}>
                                    <option value="">select</option>
                                    <option value="Jan - Mar">Jan - Mar</option>
                                    <option value="Apr - Jun">Apr - Jun</option>
                                    <option value="Jul - Sep">Jul - Sep</option>
                                    <option value="Oct - Dec">Oct - Dec</option>
                                </select>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i> {/* Replace with your desired icon */}
                                </div>
                            </div>
                        </div>


                        <div className="align-self-center pt-4">
                            <button className='btn viewMoreCollegeBtn align-self-center' onClick={handleClearAll}>Clear All</button>
                        </div>
                    </div>

                </div>
                <div className='position-relative countryCarouselFilter mb-5 pt-5'>
                    <TabCarousel activeTab={activeTab} onTabClick={handleTabClick} />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input
                            type="search"
                            className='form-control'
                            placeholder='Search Scholarships'
                            value={searchText}
                            onChange={handleSearchInputChange}  // Handle input change for search
                        />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-7 col-lg-8">
                        <div className="tab-content" id="pills-tabContent">
                            <h5 className='fw-bold text-black mb-3'>{totalScholarships} Scholarships Found</h5>
                            <ScholarshipCards />
                        </div>
                        {/* Pagination */}
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
                    <div className="col-md-5 col-lg-4 pt-5 col-10 mx-auto">
                        <div className='border p-3 text-center rounded examAlertSec bg-skyBlue mb-3'>
                            <h4 className='text-blue fw-bold'>Get Upcoming News Alerts</h4>
                            <Image src="/images/icons/examAlert.png" alt='exam-alert-img' className='img-fluid' width={500} height={500} />
                            <h6 className='text-black mb-3'>Are you interested in scholarship?</h6>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <GlobalEnquiryForm
                                    buttonText="Talk To Experts"
                                    className="btn applyNowButton"
                                />

                                <GlobalEnquiryForm
                                    buttonText="Get More Info"
                                    className="btn viewDetailBtn"
                                />


                            </div>
                        </div>
                        <div className='border p-3 rounded bg-skyBlue'>
                            <h4 className='text-blue fw-bold'>Most Popular Links</h4>
                            {abroadData.map((link, index) => (
                                <div className='d-grid' key={index}>
                                    <Link href={`/${link.slug}`}
                                        className='link_btn'>{link.name}</Link>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSec;
