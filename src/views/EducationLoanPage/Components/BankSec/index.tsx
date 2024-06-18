import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BankSec = () => {
    const countries = [
        { name: 'Armenia', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Russia', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Ukraine', flag: '/images/icons/armenia-flag.webp' },
        { name: 'China', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Philippines', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Germany', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Kazakhstan', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Georgia', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Nepal', flag: '/images/icons/armenia-flag.webp' },
        { name: 'Bangladesh', flag: '/images/icons/armenia-flag.webp' },
        // Add more countries as needed
    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 992 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 991, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1
        }
    };

    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2" style={{ zIndex: '1 !important' }}>
                <span className='fi-left' onClick={previous}>
                    <FiChevronLeft />
                </span>
                <span className='fi-right' onClick={next}>
                    <FiChevronRight />
                </span>
            </div>
        );
    };

    return (
        <section className='bg-white pb-5'>
            <div className="container bg-skyBlue rounded mb-3 py-3 px-4">
                <div className='countryCarousel position-relative mb-3'>
                    <Carousel
                        swipeable
                        draggable
                        showDots={false}
                        arrows={false}
                        infinite
                        ssr  // SSR true for server-side rendering
                        responsive={responsive}
                        renderButtonGroupOutside
                        customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
                        containerClass='carousel-container2Category'
                    >
                        {countries.map((country, index) => (
                            <div key={index} className="px-3">
                                <div className="card p-3 mx-md-0 mx-3">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-3 align-self-center">
                                            <Image src={country.flag} width={40} height={40} alt={`${country.name}-flag`} />
                                        </div>
                                        <div className="col-9 align-self-center my-auto">
                                            <h6 className='mb-0'>{country.name}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default BankSec;
