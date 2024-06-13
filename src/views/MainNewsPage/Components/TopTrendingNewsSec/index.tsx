import Image from 'next/image'
import React from 'react'
import Carousel3 from 'src/@core/components/carousel3';

const TopTrendingNews = () => {
    // Array of news items
    const newsItems = [
        {
            title: "JEE Mains Result Release Date Session 2024",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
            imageUrl: "/images/icons/newsPageImg.jpg"
        },
        {
            title: "New Education Policy Announced",
            description: "The government has announced a new education policy to revamp the current educational system...",
            imageUrl: "/images/icons/newsPageImg.jpg"
        },
        {
            title: "Tech Giants Lay Off Thousands",
            description: "In a shocking move, several major tech companies have announced significant layoffs...",
            imageUrl: "/images/icons/newsPageImg.jpg"
        },
        {
            title: "Tech Giants Lay Off Thousands",
            description: "In a shocking move, several major tech companies have announced significant layoffs...",
            imageUrl: "/images/icons/newsPageImg.jpg"
        }
        // Add more news items as needed
    ];

    // Function to generate news cards
    const newsCards =
        newsItems.map((news, index) => (
            <div className="col-8 col-md-10 mx-auto mb-1">
                <div key={index} className="card h-100 d-flex flex-fill">
                    <Image
                        src={news.imageUrl}
                        width={400}
                        height={300}
                        layout="responsive"
                        quality={75}
                        className="card-img-top"
                        alt={news.title}
                    />
                    <div className="card-body">
                        <h6 className="card-title fw-bold">{news.title}</h6>
                        {/* <p className="card-text">{news.description}</p> */}
                    </div>
                </div>
            </div>
        ));

    return (
        <>
            <section className='topnewsSec bg-white py-5'>
                <div className="container">
                    <h2 className='text-blue fw-bold text-center mb-5'>Top Trending News</h2>
                    <div className='newsCardCarousel position-relative'>
                        <Carousel3 items={newsCards} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopTrendingNews
