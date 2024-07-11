import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';

interface Card {
    name: string;
    video_url: any;
    id: any;
    designation: string;
}

const VideoSec = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isMountedRef = useIsMountedRef();
   
    const getBoardsData = useCallback(async (page = 1) => {
        try {
            const roleparams = { page, size: 10 }; // Hardcoding cardsPerPage to 1
            const response = await axios.get('api/website/allvideotestimonials/get', { params: roleparams });
            if (isMountedRef.current) {
                setCards(response.data.data);
                setTotalPages(response.data.totalPages); // Set total pages from API response
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getBoardsData(currentPage);
    }, [currentPage, getBoardsData]);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getBoardsData(newPage); // Fetch new data for the previous page
            return newPage;
        });
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalPages);
            getBoardsData(newPage); // Fetch new data for the next page
            return newPage;
        });
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        getBoardsData(page); // Fetch data for the clicked page
    };

    const currentCards = cards || [];

    return (
        <section className='bg-skyBlue py-5'>
            <div className="container">
                <div className="row">
                    {currentCards.map((card) => (
                        <div key={card.id} className="col-md-6 col-10 mx-auto">
                            <div className="card p-3 mb-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <iframe
                                            width="100"
                                            height="100"
                                            src={card.video_url}
                                            allowFullScreen
                                            className='w-100 h-100'
                                        ></iframe>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-2">
                                            <h5 className="text-black fw-bold">
                                                {card.name}
                                            </h5>
                                            <p className="text-black overflow-y-scroll" style={{height:'90px'}}>
                                                {card.designation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
        </section>
    );
};

export default VideoSec;
