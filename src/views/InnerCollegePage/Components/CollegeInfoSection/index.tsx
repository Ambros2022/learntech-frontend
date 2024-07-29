import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import YoutubeVideo from 'src/@core/components/youtube-videos';
import Image from 'next/image';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import dynamic from 'next/dynamic';
import ReviewSec from '../ReviewSec';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';

const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });

const isMobileView = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 320 && window.innerWidth <= 767;
  }
  return false;
};

function CollegeInfoSection({ data }) {
  const [activeTab, setActiveTab] = useState('info');
  const [isMobile, setIsMobile] = useState(isMobileView());

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 767, min: 425 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 424, min: 0 },
      items: 1
    }
  };

  const tabs = [
    { id: 'info', label: 'Info', content: data.info },
    { id: 'fees', label: 'Courses & Fee', content: data.course_fees },
    { id: 'admission', label: 'Admissions', content: data.admissions },
    { id: 'placement', label: 'Placement', content: data.placements },
    { id: 'ranking', label: 'Ranking', content: data.rankings },
    { id: 'scholarship', label: 'Scholarship', content: data.scholarship },
    { id: 'hostel', label: 'Infrastructure', content: data.hostel },
    { id: 'gallery', label: 'Gallery', content: data.clggallery },
    { id: 'review', label: 'Review', content: <ReviewSec data={data} /> },
    { id: 'faq', label: 'FAQ', content: <FaqSec data={data.collegefaqs} /> }
  ];

  const ButtonGroup = ({ next, previous }: any) => {
    return (
      <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
        <span className='fi-left' onClick={previous}>
          <FiChevronLeft />
        </span>
        <span className='fi-right' onClick={next}>
          <FiChevronRight />
        </span>
      </div>
    );
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      if (tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>') {
        return (
          <button
            key={index}
            className={`btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        );
      }
      return null;
    });
  };

  const renderTabContent = () => {
    return tabs.map((tab, index) => {
      if (tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>') {
        return (
          <div
            key={index}
            className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
          >
            {typeof tab.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: tab.content }} />
            ) : (
              tab.content
            )}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <section className='clgInfoSec bg-white'>
        <section className="container InnerCollegeNavigationLink linkFontSize py-3">
          <p className='mb-0'>
            <Link href="/">Home <i className='bi bi-chevron-right'></i></Link>
            <Link href={"/colleges"}> Colleges <i className='bi bi-chevron-right'></i></Link>
            <span className='text-blue' style={{ cursor: 'pointer' }}> {data.name}</span>
          </p>
        </section>
        <div className="container position-relative innerClgCarousel">
          {isMobile ? (
            <Carousel swipeable
              draggable
              showDots={false}
              arrows={false}
              infinite

              autoPlay
              autoPlaySpeed={2000}
              ssr  // SSR true for server-side rendering
              renderButtonGroupOutside
              customButtonGroup={<ButtonGroup />} responsive={responsive} className="infoBtn gap-3 mx-auto text-center">
              {renderTabs()}
            </Carousel>
          ) : (
            <div className="pt-3 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn gap-3" id="nav-tab" role="tablist">
              {renderTabs()}
            </div>
          )}

          <div className="tab-content pt-5" id="nav-tabContent">
            {renderTabContent()}
          </div>
        </div>
      </section>
    </>
  );
}

export default CollegeInfoSection;
