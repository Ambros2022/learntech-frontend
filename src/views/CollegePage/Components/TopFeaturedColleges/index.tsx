import React from 'react';
import MainCarousel from 'src/@core/components/main-carousel';
import { Config } from 'src/configs/mainconfig';

// Define the Card component
const ImgURL = Config.IMG_URL;
const Card = ({ imageUrl, title, applyLink, detailsLink }) => {
    return (
        <div className="card topFeaturedClgCard mb-5">
            <img src={ImgURL + imageUrl} alt={title} />
            <div className="card-body">
                <h5 className="card-title text-black text-center">{title}</h5>
                <div className="d-flex justify-content-center gap-2">
                    <a href={applyLink} className="ApplyNowBtn btn">Apply Now</a>
                    <a href={detailsLink} className="viewDetailsBtn btn">View Details</a>
                </div>
            </div>
        </div>
    );
}

function TopFeaturedColleges() {
    // Array of card data objects
    const topFeaturedCollegeItems = [
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
        {
            imageUrl: "/images/icons/filter-card.jpg",
            title: "A.J Institute of Dental Sciences, Mangaluru",
            applyLink: "#",
            detailsLink: "#",
        },
    ];

    // Map the card data objects to Card components
    const cardComponents = topFeaturedCollegeItems.map((item, index) => (
        <Card key={index} {...item} />
    ));

    return (
        <section className='topFeaturedClgSec'>
            <div className="container position-relative">
                <h4 className="pt-5 mb-5 fw-bold text-blue text-center">Top Featured Colleges</h4>
                <MainCarousel items={cardComponents} />
            </div>
        </section>
    );
}

export default TopFeaturedColleges;
