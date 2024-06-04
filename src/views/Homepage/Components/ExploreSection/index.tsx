import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import axios1 from 'src/configs/axios';


function ExploreSection() {
  const [activeTab, setActiveTab] = useState('Colleges');
  const [data, setData] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [datasize, setDatasize] = useState(12);

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
      const roleparams: any = { page: 1, size: datasize };
      const response = await axios1.get(endpoint, { params: roleparams });

      setData(response.data.data);
      setVisibleCount(response.data.totalItems);
    } catch (err) {
      console.error(err);
    }
  }, [activeTab, datasize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setDatasize(12);
  };

  const renderData = () => {
    return data.map((item) => {
      let url: any;

      if (activeTab === 'Colleges') {
        url = `/colleges/?stream_id=[${item.id}]`;
      } else if (activeTab === 'Courses') {
        url = `/course/${item.id}/${item.slug}`;
      } else if (activeTab === 'Exams') {
        url = `/exams/?stream_id=[${item.id}]`;
      }

      return (
        <CardComponent
          key={item.id}
          title={item.name}
          imageSrc={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.logo}`}  // Adjust the path as needed
          count={item.uniqueCollegeCount}
          link={url}
        />
      );
    })

  }




  const showMoreCourses = () => {
    setDatasize(prevSize => prevSize + 6);
  };

  function CardComponent({ title, imageSrc, count, link }) {
    return (
      // <Link href="/f">
      <div className="col-md-4 col-lg-2 mb-3">
        <div className="card text-center exploreCardHover">
          <Link href={link}>
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
                  <p className="card-text m-0 text-black">{count} {activeTab}</p>
                  <h6 className="card-title text-truncate text-blue">{title}</h6>
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
          </Link>
        </div >
      </div >
      // </Link>
    );
  }

  return (
    <section className="exploreCon" id="animation6" data-aos="fade-up">
      <div className="container py-5">
        <h2 className="fw-bold text-blue text-center">
          Explore Colleges, Courses and Exams That Are Curated For You
        </h2>
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
        {visibleCount > data.length && (
          <div className="text-center mt-4">
            {/* {visibleCount} */}
            {/* {data.length} */}
            <button className="btn viewMoreCollegeBtn" onClick={showMoreCourses}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExploreSection;
