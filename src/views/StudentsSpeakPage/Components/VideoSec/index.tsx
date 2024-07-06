import React, { useCallback, useEffect, useState } from 'react';


const VideoSec = ({cards ,totalPages, getScholarshipData , setCurrentPage , currentPage}) => {
    

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getScholarshipData(newPage); // Fetch new data for the previous page
            return newPage;
        });
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalPages);
            getScholarshipData(newPage); // Fetch new data for the next page
            return newPage;
        });
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        getScholarshipData(page); // Fetch data for the clicked page
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
                                            <p className="text-black fw-bold">
                                                {card.name}
                                            </p>
                                            <p className="text-black studentSpeakCardBody">
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
