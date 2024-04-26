import React, { useState } from 'react';

function ExploreSection() {
  const [activeTab, setActiveTab] = useState('Colleges');
  const [displayCount, setDisplayCount] = useState(18);  // Initial number of cards to display

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setDisplayCount(18);  // Reset the display count when switching tabs
  };

  const handleViewMore = () => {
    setDisplayCount(prevCount => prevCount + 6);  // Load 6 more cards
  };

  const cardData = {
    Colleges: [
      { id: 1, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 2, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 3, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 4, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 5, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 6, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 7, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 8, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 9, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 10, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 11, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 12, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 13, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 14, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 15, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 16, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 17, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 18, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 19, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 20, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 21, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 22, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 23, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 24, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 25, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
    ],
    Courses: [
      { id: 1, title: 'Architecture', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 2, title: 'Paramedical', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 3, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 4, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 5, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 6, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 7, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 8, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 9, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 10, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 11, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 12, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 13, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 14, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 15, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 16, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 17, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 18, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 19, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 20, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 21, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 22, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 23, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 24, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 25, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 }
    ],
    Exams: [
      { id: 1, title: 'Medical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 2, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 3, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 4, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 5, title: 'Paramedical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 6, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 7, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 8, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 9, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 10, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 11, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 12, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 13, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 14, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 15, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 16, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 17, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 18, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 19, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 },
      { id: 20, title: 'Paramedical', imageSrc: 'images/icons/Paramedical.svg', courseCount: 18 },
      { id: 21, title: 'Architecture', imageSrc: 'images/icons/Architecture.svg', courseCount: 18 },
      { id: 22, title: 'Art', imageSrc: 'images/icons/Art.svg', courseCount: 18 },
      { id: 23, title: 'Law', imageSrc: 'images/icons/Law.svg', courseCount: 18 },
      { id: 24, title: 'Medical', imageSrc: 'images/icons/Medical.svg', courseCount: 18 },
      { id: 25, title: 'Management', imageSrc: 'images/icons/Management.svg', courseCount: 18 }
    ],
  }

  function CardList({ activeTab }) {
    const data = cardData[activeTab].slice(0, displayCount);  // Only take the number of cards to display

    return (
      <div className="row">
        {data.map(card => (
          <CardComponent
            key={card.id}
            title={card.title}
            imageSrc={card.imageSrc}
            courseCount={card.courseCount}
          />
        ))}
      </div>
    );
  }

  function CardComponent({ title, imageSrc, courseCount }) {
    return (
      <div className="col-md-4 col-lg-2 mb-3 d-flex">
        <div className="card text-center flex-fill">
          <div className="row">
            <div className="col-md-12 col-4 col-sm-3">
              <img src={imageSrc} className="img-fluid mx-auto mt-3" alt={`${title}-logo`} />
            </div>
            <div className="col-md-12 col-6 col-sm-7 text-md-center text-start">
              <div className="card-body">
                <p className="card-text m-0 text-blue">{courseCount} Courses</p>
                <h6 className="card-title">{title}</h6>
              </div>
            </div>
            <div className='col-2 cardArrow'>
              <span><a href="#"><img src="images/icons/right arrow.svg" alt="right-arrow" /></a></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="exploreCon" id="animation6" data-aos="fade-up">
      <div className="container py-5">
        <h4 className="fw-bold text-blue text-center">Explore Colleges, Courses and Exams That Are Curated For You</h4>
        <div className="d-flex exploreNav justify-content-center mb-5" role="tablist">
          <a className={`btn ${activeTab === 'Colleges' ? 'active' : ''}`} onClick={() => handleTabChange('Colleges')} role="tab" aria-selected={activeTab === 'Colleges'}>Colleges</a>
          <a className={`btn ${activeTab === 'Courses' ? 'active' : ''}`} onClick={() => handleTabChange('Courses')} role="tab" aria-selected={activeTab === 'Courses'}>Courses</a>
          <a className={`btn ${activeTab === 'Exams' ? 'active' : ''}`} onClick={() => handleTabChange('Exams')} role="tab" aria-selected={activeTab === 'Exams'}>Exams</a>
        </div>
        <div id="exploreCardCon">
          <CardList activeTab={activeTab} />
        </div>
        <div className="text-center mt-4">
          <button className="btn viewMoreCollegeBtn" onClick={handleViewMore}>View More</button>
        </div>
      </div>
    </section>
  );
}

export default ExploreSection;
