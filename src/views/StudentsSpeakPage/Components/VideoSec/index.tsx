import React, { useState } from 'react';

const VideoSec = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;
    const cards = [
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
        {
            id: 1,
            videoUrl: 'https://www.youtube.com/embed/lonrAbn89XM?si=pemwKKt8vCdUbZ-l',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorem voluptatibus perferendis amet tenetur, repellat quia, optio maxime commodi numquam non porro nihil saepe totam aspernatur sed, consequatur eveniet dolore distinctio perspiciatis laborum vel veritatis magnam. Expedita praesentium labore eaque iusto soluta aliquam error, pariatur illum quisquam quaerat officiis laudantium.'
        },
    ];

    // Logic to calculate pagination
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                                            src={card.videoUrl}
                                            allowFullScreen
                                            className='w-100 h-100'
                                        ></iframe>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-2">
                                            <p className="text-black studentSpeakCardBody">
                                                {card.content}
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
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                                        <span aria-hidden="true">{'<'}</span>
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
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
