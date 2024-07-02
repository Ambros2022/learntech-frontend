import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import NewsList from '../newsList';
import Link from 'next/link';
import axios from 'src/configs/axios';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

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
    const [totalPages, setTotalPages] = useState(1);
    const [collegeData, setcollegeData] = useState([]);

    // const [newsPerPage] = useState(6); // Number of news items per page
    const [newsItems, setNewsItems] = useState<GroupedNewsItems>({});
    const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
    const newsPerPage = 8;
    const isMountedRef = useIsMountedRef();


    const getColleges = useCallback(async () => {
        try {
            const roleparams = { page: 1, size: 10000 };
            const response = await axios.get('api/website/colleges/get', { params: roleparams });
            setcollegeData(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    const getCategoriesData = useCallback(async () => {
        try {
            const response = await axios.get('api/website/newscategory/get');
            if (response.data.status === 1) {
                const categories = response.data.data.map(category => ({
                    id: category.id,
                    title: category.name
                }));
                // Add "All" category
                setCategories([{ id: 'all', title: 'All' }, ...categories]);
                setActiveTab('all'); // Set "All" tab as active initially
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);


    const getNewsdata = useCallback(async (id, page = 1) => {
        try {
            const roleparams = { page, size: newsPerPage };
            const url = id === 'all' ? '/api/website/news/get' : `/api/website/news/get?category_id=${id}`;
            const response = await axios.get(url, { params: roleparams });

            if (response.data.status === 1) {
                setNewsItems(prevState => ({
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
    }, [newsPerPage, isMountedRef]);

    useEffect(() => {
        if (activeTab) {
            getNewsdata(activeTab, currentPage);
        }
    }, [activeTab, currentPage, getNewsdata]);

    useEffect(() => {

        getCategoriesData()
        getColleges()

    }, [getCategoriesData, getColleges])

    

    const handleTabClick = (id) => {
        setActiveTab(id);
        setCurrentPage(1);
    };

   


    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getNewsdata(activeTab, newPage); // Fetch new data for the previous page
            return newPage;
        });
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalPages);
            getNewsdata(activeTab, newPage); // Fetch new data for the next page
            return newPage;
        });
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        getNewsdata(activeTab, page); // Fetch data for the clicked page
    };


    const currentNews = newsItems[activeTab] || [];
    return (
        <>
            <section className='py-5 bg-white browseNews'>
                <div className="container">
                    <h2 className='fw-bold text-blue text-center mb-3'>Browse News By Category</h2>
                    <div className="d-flex justify-content-center newsTabsClr gap-3 mx-0 flex-wrap flex-row">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`btn ${activeTab === category.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(category.id)}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                    <div className='row mb-3 mt-5'>
                        <div className="col-lg-8 col-xl-8 col-md-7">
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade ${activeTab === activeTab ? 'show active' : ''}`} id={`pills-${activeTab}`} role="tabpanel" aria-labelledby={`pills-${activeTab}-tab`}>
                                    <div className="row">
                                        {currentNews.map(item => (
                                            <div key={item.id} className="col-12 mx-5 col-lg-6 mx-lg-0 mb-3 d-flex ">
                                                <div className="card">
                                                    <div className='newsPageImg'>
                                                        <Image src="/images/icons/newsPageImg.jpg" width={400} height={400} className="img-fluid" alt="newsImage"></Image>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="fw-bold card-title">{item.name}</h5>
                                                    </div>
                                                    <div className='p-3'>
                                                        <Link href={`/news-1/${item.id}/${item.name}`}>
                                                            <button className='btn viewMoreCollegeBtn'>View Detail</button>
                                                        </Link>
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
                        <div className="col-lg-4 col-xl-4 col-md-5">
                            <div className='bg-skyBlue p-5 d-flex justify-content-center rounded'>
                                <div className="align-content-center get-news">
                                    <h4 className='text-blue fw-bold text-center mb-3'>Get Upcoming News Alerts</h4>
                                    <Image src="/images/icons/getNewsImage.png" width={200} height={200} alt='get-news-logo' className='mb-3' />
                                    <div className="d-flex justify-content-between">
                                    <GlobalEnquiryForm
                                        buttonText="Follow Us"
                                        className='btn flwBtn'
                                    />
                                        {/* <button className='btn flwBtn'>Follow Us</button> */}
                                        <GlobalEnquiryForm
                                        buttonText="Ask a Question"
                                        className='btn askBtn'
                                    />
                                        {/* <button className='btn askBtn'>Ask a Question</button> */}
                                    </div>
                                </div>
                            </div>
                            <NewsList newsItems={collegeData} />
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}

export default BrowseNewsSec;
