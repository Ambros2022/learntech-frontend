import React, { useState } from 'react';

function LatestNewsSection() {
    const [activeTab, setActiveTab] = useState('news');

    const newsCards = [
        {
            id: 1,
            date: '24 Jan, 2024',
            title: 'News Title 1',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            link: '#'
        },
        {
            id: 2,
            date: '25 Jan, 2024',
            title: 'News Title 2',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            link: '#'
        },
        {
            id: 3,
            date: '25 Jan, 2024',
            title: 'News Title 3',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            link: '#'
        },
        // Add more news cards as needed
    ];

    const blogCards = [
        {
            id: 1,
            date: '24 Jan, 2024',
            title: 'Blog Title 1',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            link: '#'
        },
        {
            id: 2,
            date: '25 Jan, 2024',
            title: 'Blog Title 2',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            link: '#'
        },
        {
            id: 3,
            date: '25 Jan, 2024',
            title: 'Blog Title 3',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            link: '#'
        },
        // Add more blog cards as needed
    ];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <section className="latestNewsCon" id="animation8" data-aos="fade-down">
            <div className="container pt-5">
                <h3 className="fw-bold text-center">Latest News & Blogs</h3>
                <div className="nav-pills justify-content-center pt-3 gap-2 d-flex" role="tablist">
                    <button
                        className={`btn px-4 newsBtn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => handleTabClick('news')}
                    >
                        News
                    </button>
                    <button
                        className={`btn px-4 blgBtn ${activeTab === 'blogs' ? 'active' : ''}`}
                        onClick={() => handleTabClick('blogs')}
                    >
                        Blogs
                    </button>
                </div>
                <div className="card-con pt-5">
                    <div className="row">
                        {(activeTab === 'news' ? newsCards : blogCards).map(card => (
                            <div className="col-md-4 mb-5" key={card.id}>
                                <div className="card" id={`animation${card.id}`} data-aos="fade-up">
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{card.date}</h6>
                                        <h4 className="card-title fw-bold text-blue">{card.title}</h4>
                                        <p className="card-text">{card.text}</p>
                                        <a href={card.link} className="btn readBtn card-link">Read More</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LatestNewsSection;
