import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'owl.carousel';


const OwlCarousel = ({ items }) => {

    const carouselRef = useRef(null);

    useEffect(() => {
        $(document).ready(() => {
            $(carouselRef.current).owlCarousel({
                loop: true,
                margin: 30,
                dots: true,
                nav: true,
                items: 2
            });
        });
    }, []);

    return (
        <div ref={carouselRef} className="owl-carousel">
            {items.map((item, index) => (
                <div key={index} className="item">
                    {item}
                </div>
            ))}
        </div>
    );
};

export default OwlCarousel;
