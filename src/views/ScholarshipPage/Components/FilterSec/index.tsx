import React, { useState } from 'react';
import TabCarousel from '../TabCarousel';
import Link from 'next/link';
import Image from 'next/image';

const FilterSec = () => {
    const scholarshipsData = [
        {
            title: 'Tata Scholarship',
            university: 'Cornell University',
            details: [
                { label: 'International Student Eligible', value: 'Yes' },
                { label: 'Amount', value: 'Variable Amount' },
                { label: 'Type', value: 'College Specific' },
                { label: 'Level of Study', value: 'Bachelor' },
                { label: 'Number of Scholarships', value: '20' }
            ],
            link: '/scholarships',
            country: 'All'
        },
        {
            title: 'India Scholarship',
            university: 'University Name',
            details: [
                { label: 'Eligibility', value: 'Criteria' },
                { label: 'Amount', value: 'Amount Details' },
                { label: 'Type', value: 'Type of Scholarship' },
                { label: 'Level of Study', value: 'Bachelor' },
                { label: 'Number of Scholarships', value: '20' }
            ],
            link: '/scholarships',
            country: 'India'
        },
        {
            title: 'UK Scholarship',
            university: 'University Name',
            details: [
                { label: 'Eligibility', value: 'Criteria' },
                { label: 'Amount', value: 'Amount Details' },
                { label: 'Type', value: 'Type of Scholarship' },
                { label: 'Level of Study', value: 'Bachelor' },
                { label: 'Number of Scholarships', value: '20' }
            ],
            link: '/scholarships',
            country: 'UK'
        },
        // Add more scholarship objects as needed for other countries
    ];

    const [activeTab, setActiveTab] = useState('All');  // State to keep track of active tab
    const [currentPage, setCurrentPage] = useState(1);  // State for current page
    const perPage = 6; // Number of items per page

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to first page when tab changes
    };

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const ScholarshipCards = ({ country }) => {
        // Filter scholarships based on active tab (country)
        const filteredScholarships = scholarshipsData.filter(scholarship => scholarship.country === country || country === 'All');

        // Pagination logic
        const indexOfLastScholarship = currentPage * perPage;
        const indexOfFirstScholarship = indexOfLastScholarship - perPage;
        const currentScholarships = filteredScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

        return (
            <div className="row d-flex flex-fill">
                {currentScholarships.map((scholarship, index) => (
                    <div className="col-md-10 col-lg-6 col-xl-6 mb-3" key={index}>
                        <div className="card bg-skyBlue p-3">
                            <h4 className='text-blue fw-bold'>{scholarship.title}</h4>
                            <h6 className='text-black fw-bold'>{scholarship.university}</h6>
                            <ul className='text-black'>
                                {scholarship.details.map((detail, idx) => (
                                    <li key={idx}>
                                        {detail.label} : {detail.value}
                                    </li>
                                ))}
                            </ul>
                            <a href={scholarship.link} className='mb-3 text-blue fw-bold btn text-start'>Read More {'>>'}</a>
                            <div className="d-flex gap-3 flex-fill scholarshipBtn">
                                <button className='btn applyNowButton'>Apply Now</button>
                                <button className='btn viewDetailBtn'>Get Alert</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Get total number of scholarships for the active tab
    const getTotalScholarships = (country) => {
        if (country === 'All') {
            return scholarshipsData.length;
        } else {
            return scholarshipsData.filter(scholarship => scholarship.country === country).length;
        }
    };

    // Logic for pagination controls
    const totalScholarships = getTotalScholarships(activeTab);
    const totalPages = Math.ceil(totalScholarships / perPage);

    return (
        <section className='bg-white py-5'>
            <div className="container">
                <div className="card mb-3 filterCardSec border-1 rounded p-3">
                    <h4 className='text-blue fw-bold mb-3'>Filter By</h4>
                    <div className="d-flex gap-3 flex-wrap">
                        {['Level of study', 'Type', 'Gender', 'Nationality', 'Deadline'].map((label) => (
                            <div className="align-self-center" key={label}>
                                <label htmlFor={label} className='text-black fw-bold mb-2'>{label}</label>
                                <input type="search" className='form-control' id={label} />
                            </div>
                        ))}
                        <div className="align-self-center mt-auto d-flex">
                            <button className='btn viewMoreCollegeBtn align-self-center'>Clear All</button>
                        </div>
                    </div>
                </div>
                <div className='position-relative countryCarouselFilter mb-5 pt-5'>
                    <TabCarousel activeTab={activeTab} onTabClick={handleTabClick} />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input type="search" className='form-control' placeholder='Search Scholarships' />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-7 col-lg-8">
                        <div className="tab-content" id="pills-tabContent">
                            {['All', 'India', 'UK', 'Canada', 'USA', 'Australia', 'Netherland', 'Germany'].map((country) => (
                                <div
                                    key={country}
                                    className={`tab-pane fade ${activeTab === country ? 'show active' : ''}`}
                                    id={country}
                                    role="tabpanel"
                                    aria-labelledby={country}
                                >
                                    <h5 className='fw-bold text-black mb-3'>{getTotalScholarships(country)} Scholarships Found</h5>
                                    <ScholarshipCards country={country} />
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="row col-md-12 blogCardspage">
                            <div className='d-flex justify-content-center'>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination d-flex gap-3">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                                                <span aria-hidden="true">{'<'}</span>
                                            </a>
                                        </li>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                                <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                                    {index + 1}
                                                </a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                                                <span aria-hidden="true">{'>'}</span>
                                            </a>
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
                                <button className='btn applyNowButton'>Talk To Experts</button>
                                <button className='btn viewDetailBtn'>Get More Info</button>
                            </div>
                        </div>
                        <div className='border p-3 rounded bg-skyBlue'>
                            <h4 className='text-blue fw-bold'>Most Popular Links</h4>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in Canada Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in USA Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in UK Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in Australia Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in France Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in Germany Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in Singapore Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in Hong Kong Colleges</Link>
                            </div>
                            <div className='d-grid'>
                                <Link href='/scholarships' className='link_btn'>Study in Sweden Colleges</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSec;
