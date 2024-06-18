import React from 'react';
import Image from 'next/image';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
    {
        name: 'Ashish Gaidhane',
        location: 'Maharashtra',
        institution: 'MVJ College of Engineering, Bangalore',
        image: '/images/icons/userImage.jpg',
        testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Ashish Gaidhane',
        location: 'Maharashtra',
        institution: 'MVJ College of Engineering, Bangalore',
        image: '/images/icons/userImage.jpg',
        testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Ashish Gaidhane',
        location: 'Maharashtra',
        institution: 'MVJ College of Engineering, Bangalore',
        image: '/images/icons/userImage.jpg',
        testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Ashish Gaidhane',
        location: 'Maharashtra',
        institution: 'MVJ College of Engineering, Bangalore',
        image: '/images/icons/userImage.jpg',
        testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Ashish Gaidhane',
        location: 'Maharashtra',
        institution: 'MVJ College of Engineering, Bangalore',
        image: '/images/icons/userImage.jpg',
        testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    // Repeat the testimonials as needed
];

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1023, min: 768 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1
    }
};

const ButtonGroup = ({ next, previous }) => {
    return (
        <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
            <span className='fi-left' onClick={previous}>
                <FiChevronLeft />
            </span>
            <span className='fi-right' onClick={next}>
                <FiChevronRight />
            </span>
        </div>
    );
};

const TestimonialSec = () => {
    return (
        <section className='py-5 bg-white'>
            <div className="container">
                <h2 className='text-blue fw-bold text-center mb-5'>Testimonials</h2>
                <div className='testimonialCarousel position-relative'>
                    <Carousel
                        swipeable
                        draggable
                        showDots={false}
                        arrows={false}
                        infinite
                        autoPlay
                        autoPlaySpeed={2000}
                        ssr  // SSR true for server-side rendering
                        responsive={responsive}
                        renderButtonGroupOutside
                        customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div className="card p-3 bg-skyBlue border-0 mb-3 mx-md-2 mx-3" key={index}>
                                <div className="row">
                                    <div className="col-md-3 col-lg-2 col-xl-2">
                                        <div className='testimonalImg'>
                                            <Image src={testimonial.image} className='mx-auto' width={50} height={50} alt='testimonial-img' />
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-lg-10 col-xl-10">
                                        <h5 className='text-blue'>{testimonial.name} ({testimonial.location})</h5>
                                        <p className='text-black'>{testimonial.institution}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex">
                                    <i className='bi bi-quote fs-1 text-blue align-self-start me-2'></i>
                                    <p className='text-black mt-3 testimonialPara'>
                                        {testimonial.testimonial}
                                    </p>
                                    <i className='bi bi-quote align-self-end fs-1 text-blue ms-2'></i>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

export default TestimonialSec;
