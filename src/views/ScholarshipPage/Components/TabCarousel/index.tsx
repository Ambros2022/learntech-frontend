import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const tabs = ['All', 'India', 'UK', 'Canada', 'USA', 'Australia', 'Netherland', 'Germany'];

const TabCarousel = ({ activeTab, onTabClick }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 1024, min: 992 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 991, min: 768 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1
        }
    };

    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2" style={{ zIndex: '1 !important' }} >
                <span className='fi-left' onClick={previous}>
                    <FiChevronLeft />
                </span>
                <span className='fi-right' onClick={next}>
                    <FiChevronRight />
                </span>
            </div>
        );
    };

    console.log('Active Tab:', activeTab);  // Logging for debugging

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
            containerClass='carousel-container2Category'
        >
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`btn d-flex mx-auto justify-content-center filterCountry ${activeTab === tab ? 'active' : ''}`}
                    id={tab}
                    onClick={() => onTabClick(tab)}
                    role='tab'
                    aria-controls={tab}
                    aria-selected={activeTab === tab}
                >
                    {tab}
                </button>
            ))}
        </Carousel>
    );
};

export default TabCarousel;
