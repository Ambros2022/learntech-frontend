import React, { useState } from 'react';
import MainCarousel from 'src/@core/components/main-carousel';

function LatestNewsSection() {
  const [activeTab, setActiveTab] = useState('news');

  const cardData = {
    news: [
      {
        id: 1,
        date: '24 Jan, 2024',
        title: 'News Title 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 2,
        date: '25 Jan, 2024',
        title: 'News Title 2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 3,
        date: '25 Jan, 2024',
        title: 'News Title 3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 4,
        date: '25 Jan, 2024',
        title: 'News Title 4',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 5,
        date: '25 Jan, 2024',
        title: 'News Title 5',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 6,
        date: '25 Jan, 2024',
        title: 'News Title 6',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
    ],

    blogs: [
      {
        id: 1,
        date: '24 Jan, 2024',
        title: 'Blog Title 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 2,
        date: '25 Jan, 2024',
        title: 'Blog Title 2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 3,
        date: '25 Jan, 2024',
        title: 'Blog Title 3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 4,
        date: '24 Jan, 2024',
        title: 'Blog Title 4',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 5,
        date: '25 Jan, 2024',
        title: 'Blog Title 5',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
      {
        id: 6,
        date: '25 Jan, 2024',
        title: 'Blog Title 6',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        link: '#'
      },
    ]
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function CardComponent({ id, date, title, text, link }) {
    return (
      <div className="newsBlosCards">
        <div className="mb-5" key={id}>
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-body-secondary">{date}</h6>
              <h4 className="card-title fw-bold text-blue">{title}</h4>
              <p className="card-text">{text}</p>
              <a href={link} className="btn readBtn card-link">Read More</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CardList({ activeTab }) {
    const data = cardData[activeTab]

    // Check if data is defined before mapping over it
    if (!data) {
      return <div>No data available for this tab.</div>;
    }

    // Map over data and create an array of CardComponent elements
    const cards = data.map(card => (
      <CardComponent
        id={card.id}
        key={card.id}
        title={card.title}
        date={card.date}
        text={card.text}
        link={card.link}
      />
    ));

    return <MainCarousel items={cards} />; // Pass cards to MainCarousel as items prop
  }

  return (
    <section className="latestNewsCon" id="animation8" data-aos="fade-down">
      <div className="container pt-5">
        <h3 className="fw-bold text-center">Latest News & Blogs</h3>
        <div className="nav-pills justify-content-center pt-3  mb-md-0 mb-4 gap-2 d-flex" role="tablist">
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
          <CardList activeTab={activeTab} />
        </div>
      </div>
    </section >
  );
}

export default LatestNewsSection;
