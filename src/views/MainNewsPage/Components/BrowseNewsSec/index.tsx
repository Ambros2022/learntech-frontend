import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsList from '../newsList';
import Link from 'next/link';
import axios from 'src/configs/axios';

interface NewsItem {
    id: number;
    name: string;
    banner_image: string;
    meta_description: string;
    category_id: string;
}

interface GroupedNewsItems {
    [key: string]: NewsItem[];
}

const BrowseNewsSec = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(6); // Number of news items per page
    const [newsItems, setNewsItems] = useState<GroupedNewsItems>({});
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        // Fetch the news data from the API
        const fetchNews = async () => {
            try {
                const response = await axios.get('api/website/news/get');
                const data = response.data.data;

                // Group news items by category
                const groupedNews = data.reduce((acc, newsItem) => {
                    const category = newsItem.category_id;
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(newsItem);
                    return acc;
                }, {});

                // Adding 'All' category with all news items


                setNewsItems(groupedNews);
                setCategories(['All', ...Object.keys(groupedNews)]);
                groupedNews['All'] = data;
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNews();
    }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setCurrentPage(1); // Reset current page when changing tabs
    };

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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

    const currentNews = newsItems[activeTab]?.slice(indexOfFirstNews, indexOfLastNews) || [];



    return (
        <>
            <section className='py-5 bg-white browseNews'>
                <div className="container">
                    <h2 className='fw-bold text-blue text-center mb-3'>Browse News By Category</h2>
                    <div className="d-flex justify-content-center newsTabsClr gap-3 mx-5 flex-wrap flex-row">
                        {categories.map(category => (
                            <button key={category} className={`btn ${activeTab === category ? 'active' : ''}`} onClick={() => handleTabClick(category)}>{category}</button>
                        ))}
                    </div>
                    <div className='row mb-3 mt-5'>
                        <div className="col-lg-8 col-xl-8 col-md-7">
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade ${activeTab === activeTab ? 'show active' : ''}`} id={`pills-${activeTab}`} role="tabpanel" aria-labelledby={`pills-${activeTab}-tab`}>
                                    <div className="row">
                                        {currentNews.map(item => (
                                            <div key={item.id} className="col-12 mx-5 col-lg-6 mx-lg-0 mb-3 d-flex flex-fill">
                                                <div className="card">
                                                    <div className='newsPageImg'>
                                                        <Image src="/images/icons/newsPageImg.jpg" width={400} height={400} className="img-fluid" alt="newsImage"></Image>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="fw-bold card-title">{item.name}</h5>
                                                    </div>
                                                    <div className='p-3'>
                                                        <button className='btn viewMoreCollegeBtn '>View Detail</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Pagination */}
                            {/* <div className="d-flex justify-content-center">
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
                            </div> */}

                        </div>
                        <div className="col-lg-4 col-xl-4 col-md-5">
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
            </section >
        </>
    );
}

export default BrowseNewsSec;
