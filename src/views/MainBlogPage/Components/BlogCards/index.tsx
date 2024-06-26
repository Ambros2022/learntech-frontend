import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import NewsList from '../newsList';
import ContactForm from 'src/@core/components/popup/ContactForm';
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const BlogCards = () => {
    const [newsData, setNewsData] = useState([]);
    const [cardsData, setCardsData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const isMountedRef = useIsMountedRef();

    const getNewsData = useCallback(async () => {
        try {
            const response = await axios.get('api/website/news/get');
            setNewsData(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const getBlogsData = useCallback(async (page = 1) => {
        try {
            const roleparams = { page, size: 1 }; // Hardcoding cardsPerPage to 1
            const response = await axios.get('api/website/blog/get', { params: roleparams });
            setCardsData(response.data.data);
            setTotalPages(response.data.totalPages); // Set total pages from API response
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getNewsData();
    }, [getNewsData]);

    useEffect(() => {
        getBlogsData(currentPage);
    }, [currentPage, getBlogsData]);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getBlogsData(newPage); // Fetch new data for the previous page
            return newPage;
        });
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalPages);
            getBlogsData(newPage); // Fetch new data for the next page
            return newPage;
        });
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        getBlogsData(page); // Fetch data for the clicked page
    };

    const currentCards = cardsData || [];

    return (
        <section className='bg-white py-5 blogCardspage'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-xl-8 col-md-7">
                        <div className="row">
                            {currentCards.map((card) => (
                                <div className="col-md-6 col-8 mx-md-0 mx-auto mb-3" key={card.id}>
                                    <div className="card newsImgSize position-relative">
                                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${card.banner_image}`} width={400} height={400} className="card-img-top" alt="news-img" />
                                        <span className='share-icon'>
                                            <Image src='/images/icons/icon-share.png' width={30} height={30} style={{
                                                top: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.5)'
                                            }} className='position-absolute rounded p-1' alt='share-icon' />
                                        </span>
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold text-truncate">{card.name}</h5>
                                            <p className="card-text">{card.meta_title}</p>
                                            <Link href={`/blog/${card.id}/${card.name}`} className="btn viewMoreBtn">View More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row col-md-12">
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
                    <div className="col-lg-6 col-xl-4 col-md-5">
                        <ContactForm heading={'Talk to our Experts'} />
                        <NewsList newsItems={newsData} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogCards;
