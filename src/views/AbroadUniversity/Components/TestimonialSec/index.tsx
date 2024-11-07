import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Define the interface for a testimonial
interface Testimonial {
    name: string;
    location: string;
    institution: string;
    image: string;
    designation: string;
    type: string;
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

const TestimonialSec = ({ testimonials }) => {
    const showButtons = testimonials && testimonials.length > 1;

    return (
        <>
            {testimonials && testimonials.length > 0 ? (
                <section className='bg-white pb-5'>
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
                                renderButtonGroupOutside={showButtons}
                                // customButtonGroup={showButtons ? <ButtonGroup /> : null}
                            >
                                {testimonials.map((card, index) => (
                                    <div key={card.id} className="d-flex m-2">
                                        <div className="card p-3 d-flex flex-column flex-fill">
                                            <div className="row flex-fill">
                                                <div className="col-md-6 embedly-responsive d-flex align-items-center">
                                                    <iframe
                                                        width="100%"
                                                        height="auto"
                                                        src={card?.collegeTestimonials?.video_url}
                                                        allowFullScreen
                                                        className='embedly-embed'
                                                    ></iframe>
                                                </div>
                                                <div className="col-md-6 d-flex flex-column justify-content-between">
                                                    <div className="p-2 flex-fill">
                                                        <h5 className="text-black fw-bold pt-2">{card?.collegeTestimonials?.name}</h5>
                                                        <p className="text-black studentSpeakCardBody overflow-y-auto">
                                                            {card?.collegeTestimonials?.designation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
};

export default TestimonialSec;
