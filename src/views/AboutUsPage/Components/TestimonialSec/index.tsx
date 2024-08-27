import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'src/configs/axios';

// Define the interface for a testimonial
interface Testimonial {
    name: string;
    location: string;
    institution: string;
    image: string;
    designation: string;
    type: string; // Assuming type is also part of the data
}

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

const ButtonGroup = ({ next, previous }: { next?: () => void; previous?: () => void }) => {
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
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    const fetchTestimonials = useCallback(async () => {
        try {
            const response = await axios.get<{ status: number; data: Testimonial[] }>('api/website/allvideotestimonials/get', {
                params: { type: 'About_us_page' }
            });
            if (response.data?.status === 1) {
                // Filter only the testimonials with type "About_us_page"
                const filteredTestimonials = response.data.data.filter(
                    (item) => item.type === 'About_us_page'
                );
                setTestimonials(filteredTestimonials);
            }
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

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
                        ssr
                        responsive={responsive}
                        renderButtonGroupOutside
                        customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div className="card p-3 bg-skyBlue border-0 mb-3 mx-md-2 mx-3" key={index}>
                                <div className="row d-flex">
                                    <div className="col-md-3 col-lg-2 col-xl-2 align-content-center">
                                        <div className='testimonalImg'>
                                            <Image src={'/images/icons/userImage.jpg'} className='mx-auto' width={50} height={50} alt='testimonial-img' />
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-lg-10 col-xl-10 align-content-center">
                                        <h5 className='text-blue'>{testimonial.name} 
                                            {/* ({testimonial.location}) */}
                                            </h5>
                                        {/* <p className='text-black'>{testimonial.institution}</p> */}
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex">
                                    <i className='bi bi-quote fs-1 text-blue align-self-start me-2'></i>
                                    <p className='text-black mt-3 testimonialPara'>
                                        {testimonial.designation}
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
};

export default TestimonialSec;
