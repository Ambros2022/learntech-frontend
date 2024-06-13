import React, { useState } from 'react';
import Image from 'next/image';
import NewsList from '../newsList';
import Link from 'next/link';

const BrowseNewsSec = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(6); // Number of news items per page

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setCurrentPage(1); // Reset current page when changing tabs
    };

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const newsItems = {
        'All': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            // Your news data here
        ],
        'Entrance Exams': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            // Your news data here
        ],
        'General News': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            // Your news data here
        ],
        'Admission Alerts': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            // Your news data here
        ],
        'Result Announcement': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            // Your news data here
        ],
    };

    const newsData = [
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 1',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 2',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 3',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 4',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 4',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 4',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        // Add more news items as needed
    ];

    const currentNews = newsItems[activeTab].slice(indexOfFirstNews, indexOfLastNews);

    return (
        <>
            <section className='py-5 bg-white browseNews'>
                <div className="container">
                    <h2 className='fw-bold text-blue text-center mb-3'>Browse News By Category</h2>
                    <div className="d-flex justify-content-center newsTabsClr gap-3 mx-5 flex-wrap flex-row">
                        {Object.keys(newsItems).map(tabName => (
                            <button key={tabName} className={`btn ${activeTab === tabName ? 'active' : ''}`} onClick={() => handleTabClick(tabName)}>{tabName}</button>
                        ))}
                    </div>
                    <div className='row mb-3 mt-5'>
                        <div className="col-lg-6 col-xl-8 col-md-7">
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade ${activeTab === activeTab ? 'show active' : ''}`} id={`pills-${activeTab}`} role="tabpanel" aria-labelledby={`pills-${activeTab}-tab`}>
                                    <div className="row">
                                        {currentNews.map(item => (
                                            <div key={item.id} className="col-8 mx-auto col-md-6 mx-md-0 mb-3">
                                                <div className="card newsImgSize">
                                                    <Image src="/images/icons/newsPageImg.jpg" width={400} height={400} className="card-img-top" alt="newsImage"></Image>
                                                    <div className="card-body">
                                                        <h5 className="fw-bold card-title">{item.title}</h5>
                                                        {/* <p className="card-text">{item.description}</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Pagination */}
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination  d-flex gap-3 justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                                <span aria-hidden="true">{'<'}</span>
                                            </a>
                                        </li>
                                        {Array.from({ length: Math.ceil(newsItems[activeTab].length / newsPerPage) }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === Math.ceil(newsItems[activeTab].length / newsPerPage) ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                                <span aria-hidden="true">{'>'}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                        <div className="col-lg-6 col-xl-4 col-md-5">
                            <div className='bg-skyBlue p-5 d-flex justify-content-center rounded'>
                                <div className="align-content-center get-news">
                                    <h4 className='text-blue fw-bold text-center mb-3'>Get Upcoming News Alerts</h4>
                                    <Image src="/images/icons/getNewsImage.png" width={200} height={200} alt='get-news-logo' className='mb-3' />
                                    <div className="d-flex justify-content-between">
                                        <button className='btn flwBtn'>Follow Us</button>
                                        <button className='btn askBtn'>Ask a Question</button>
                                    </div>
                                </div>
                            </div>
                            <NewsList newsItems={newsData} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BrowseNewsSec;
