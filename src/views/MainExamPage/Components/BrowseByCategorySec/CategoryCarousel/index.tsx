import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CategoryCarousel = ({ items, handleTabClick, activeTab }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1023, min: 768 },
            items: 5
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

    return (
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
        >
            {items.map((item) => (
                <div className="examSecItems" key={item.id} onClick={() => handleTabClick(item.id)}>
                    <button
                        className={`btn nav-link ${activeTab === item.id ? 'active' : ''}`}
                        id={`pills-${item.id}-tab`}
                        type="button"
                    >
                        {item.title}
                    </button>
                </div>
            ))}
        </Carousel>
    );
};

export default CategoryCarousel;
