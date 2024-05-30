import React, { useCallback, useEffect, useState } from 'react';
import axios1 from 'src/configs/axios';


function ExploreSection() {
  const [activeTab, setActiveTab] = useState('Colleges');
  const [displayCount, setDisplayCount] = useState(18);

  interface data {
    id: number;
    name: string;
    logo: string;
    uniqueCollegeCount: number;

  }

  const [data, setData] = useState<data[]>([]);


  const fetchData = useCallback(async () => {
    try {
      let endpoint = '';
      if (activeTab === 'Colleges') {
        endpoint = 'api/website/explorecollege/get';
      } else if (activeTab === 'Courses') {
        endpoint = 'api/website/explorecourses/get';
      } else if (activeTab === 'Exams') {
        endpoint = 'api/website/exploreexam/get';
      }

      const response = await axios1.get(endpoint);
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setDisplayCount(18);
  };

  const renderData = () => {
    return data.slice(0, displayCount).map((item) => (
      <CardComponent
        key={item.id}
        title={item.name}
        imageSrc={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.logo}`}  // Adjust the path as needed
        count={item.uniqueCollegeCount}
      />
    ));
  };


  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 6);
  };

  function CardComponent({ title, imageSrc, count }) {
    return (
      <div className="col-md-4 col-lg-2 mb-3">
        <div className="card text-center exploreCardHover">
          <div className="row">
            <div className="col-md-12 col-4 col-sm-3">
              <img
                width={70}
                height={30}
                src={imageSrc}
                className="img-fluid mx-auto mt-3"
                alt={`${title}-logo`}
              />
            </div>
            <div className="col-md-12 col-6 col-sm-7 text-md-center text-start">
              <div className="card-body">
                <p className="card-text m-0 text-blue">{count} {activeTab}</p>
                <h6 className="card-title text-truncate">{title}</h6>
              </div>
            </div>
            <div className="col-2 cardArrow">
              <span>
                <a href="#">
                  <img
                    width={27}
                    height={27}
                    src="/images/icons/right arrow.svg"
                    alt="right-arrow"
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="exploreCon" id="animation6" data-aos="fade-up">
      <div className="container py-5">
        <h4 className="fw-bold text-blue text-center">
          Explore Colleges, Courses and Exams That Are Curated For You
        </h4>
        <div className="d-flex exploreNav justify-content-center mb-5" role="tablist">
          <a
            className={`btn ${activeTab === 'Colleges' ? 'active' : ''}`}
            onClick={() => handleTabChange('Colleges')}
            role="tab"
            aria-selected={activeTab === 'Colleges'}
          >
            Colleges
          </a>
          <a
            className={`btn ${activeTab === 'Courses' ? 'active' : ''}`}
            onClick={() => handleTabChange('Courses')}
            role="tab"
            aria-selected={activeTab === 'Courses'}
          >
            Courses
          </a>
          <a
            className={`btn ${activeTab === 'Exams' ? 'active' : ''}`}
            onClick={() => handleTabChange('Exams')}
            role="tab"
            aria-selected={activeTab === 'Exams'}
          >
            Exams
          </a>
        </div>
        <div id="exploreCardCon">
          <div className="row">{renderData()}</div>
        </div>
        <div className="text-center mt-4">
          <button className="btn viewMoreCollegeBtn" onClick={handleViewMore}>
            View More
          </button>
        </div>
      </div>
    </section>
  );
}

export default ExploreSection;
