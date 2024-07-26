import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NewsList from '../newsList';
import ContactForm from 'src/@core/components/popup/ContactForm';
import GlobalPopupShare from 'src/@core/components/popup/GlobalPopupShare';

const BlogCards = ({ collegeData, cardsData, totalPages, currentPage, getBlogsData, setCurrentPage }) => {

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getBlogsData(newPage);
            return newPage;
        });
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalPages);
            getBlogsData(newPage);
            return newPage;
        });
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        getBlogsData(page);
    };

    const currentCards = cardsData || [];

    return (
        <section className='bg-white py-5 blogCardspage'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-xl-8 col-md-7">
                        <div className="row">
                            {currentCards.map((card) => (
                                <div className="col-md-6 col-lg-6 mb-5 d-flex" key={card.id}>
                                    <div className="card bg-skyBlue hover-card newsImgSize position-relative w-100">
                                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${card.banner_image}`} width={400} height={400} className="card-img-top" alt="news-img" />
                                        <span className='share-icon'>
                                            {/* <Image src='/images/icons/icon-share.png' width={50} height={50} style={{
                                                top: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.5)'
                                            }} className='position-absolute rounded p-1' alt='share-icon' /> */}
                                            <GlobalPopupShare
                                                pathname={`${process.env.NEXT_PUBLIC_WEB_URL}/blog/${card.id}/${card.slug}`}
                                                title={card.meta_title}
                                                logourl={`${process.env.NEXT_PUBLIC_IMG_URL}/${card.banner_image}`} />
                                        </span>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title fw-bold text-truncate">{card.name}</h5>
                                            <p className="card-text flex-grow-1">{card.meta_title}</p>
                                            <div className="text-start">
                                                <Link href={`/blog/${card.id}/${card.name}`} className="btn viewMoreBtn mt-auto">View More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            <div className='col-12 d-flex justify-content-center'>
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
                    <div className="col-lg-5 col-xl-4 col-md-5">
                        <ContactForm heading={'Talk to our Experts'} />
                        <NewsList newsItems={collegeData} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogCards;
