'use client'
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel3 = ({ items }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1023, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1
        }
    };

    const ButtonGroup = ({ next, previous }: any) => {
        return (
            <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
                <span className='fi-left' onClick={previous}>
                    <ChevronLeft />
                </span>
                <span className='fi-right' onClick={next}>
                    <ChevronRight />
                </span>
            </div>
        );
    };

    return (
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
            customButtonGroup={<ButtonGroup />}
        >
            {items.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </Carousel>
    );
};

export default Carousel3;
