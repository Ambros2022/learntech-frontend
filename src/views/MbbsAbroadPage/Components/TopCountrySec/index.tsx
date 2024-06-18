import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TopCountrySec = () => {
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
                <h2 className='text-blue fw-bold mb-3'>Top 10 Countries to Study MBBS Abroad</h2>
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
            <div className="container bg-skyBlue rounded p-3">
                <p className="text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                </p>
                <p className="text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </section>
    );
};

export default TopCountrySec;
