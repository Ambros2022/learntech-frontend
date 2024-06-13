import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NewsList from '../newsList';
import ContactForm from 'src/@core/components/popup/ContactForm';

const BlogCards = () => {

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
        // Add more news items as needed
    ];
    const cardsData = [
        {
            id: 1,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        // Add more card data objects as needed
        {
            id: 2,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        {
            id: 3,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        {
            id: 4,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        {
            id: 5,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        {
            id: 6,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        {
            id: 7,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        {
            id: 8,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
        {
            id: 9,
            imgSrc: "/images/icons/newsPageImg.jpg",
            title: "How to get BDS direct admission in India",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            link: "#"
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const handleSubmit = async (values, { resetForm }) => {
        alert('Successfully Submitted');
        resetForm();
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
        contact_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
        course: Yup.string().required('Course is required'),
        location: Yup.string().required('Location is required'),
        message: Yup.string().required('Message is required'),
    });

    // Calculate the index of the first and last cards on the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    // Slice the cards data array to get only the cards for the current page
    const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

    // Function to handle page changes
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate the total number of pages
    const totalPages = Math.ceil(cardsData.length / cardsPerPage);

    return (
        <section className='bg-white py-5 blogCardspage'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-xl-8 col-md-7">
                        <div className="row">
                            {currentCards.map((card) => (
                                <div className="col-md-6 col-8 mx-md-0 mx-auto mb-3" key={card.id}>
                                    <div className="card newsImgSize position-relative">
                                        <Image src={card.imgSrc} width={400} height={400} className="card-img-top" alt="news-img" />
                                        <span className='share-icon'>
                                            <Image src='/images/icons/icon-share.png' width={30} height={30} style={{
                                                top: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.5)'
                                            }} className='position-absolute rounded p-1' alt='share-icon' />
                                        </span>
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold text-truncate">{card.title}</h5>
                                            <p className="card-text">{card.text}</p>
                                            <Link href={card.link} className="btn viewMoreBtn">View More</Link>
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
