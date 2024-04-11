// components/Carousel.tsx
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Carousel: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [OwlCarousel, setOwlCarousel] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            // Dynamically import OwlCarousel component
            import('react-owl-carousel')
                .then((module) => {
                    setOwlCarousel(module.default);
                })
                .catch((error) => {
                    console.error('Error loading OwlCarousel:', error);
                });
        }
    }, []);

    if (!isClient || !OwlCarousel) {
        return null; // Render nothing until OwlCarousel is loaded
    }

    const options = {
        items: 4,
        margin: 10,
        loop: true,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
    };

    return (
        <OwlCarousel className="owl-theme" {...options}>
            <div className="item">

                <div className="card">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" className="card-img-top" alt="Card Image" />
                    <div className="card-body">
                        <h5 className="card-title">Card title 1</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            <div className="item"><h4>2</h4></div>
            <div className="item"><h4>3</h4></div>
            <div className="item"><h4>4</h4></div>
            <div className="item"><h4>5</h4></div>
            <div className="item"><h4>6</h4></div>
            <div className="item"><h4>7</h4></div>
            <div className="item"><h4>8</h4></div>
            <div className="item"><h4>9</h4></div>
            <div className="item"><h4>10</h4></div>
        </OwlCarousel>
    );
};

export default Carousel;
