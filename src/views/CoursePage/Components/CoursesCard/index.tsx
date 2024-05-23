import Image from 'next/image';
import React, { useState } from 'react';

// The individual card component
function CoursesCard({ course }) {

  return (
    <>
      <div className="col-md-4 col-lg-3">
        <div className="card mb-3 p-2">
          <div className="row g-0">
            <div className="col-lg-4 coursesCardImg p-0 mb-3 mb-md-3 text-md-start text-center">
              <Image width={200} height={200} src={course.imageUrl} className="rounded" alt="Courses-Card-img" />
            </div>
            <div className="col-lg-8 d-flex align-items-center ">
              <div className="card-body p-0 ps-lg-2">
                <h5 className="fw-bold text-blue card-title text-md-center text-center text-lg-start">{course.title}</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-lg-start text-center mb-3">
              <small className='fw-bold'>Streams</small>
            </div>
          </div>
          <div>
            <div className='min-vh-card'>
              <div className="d-flex gap-2 mb-3 flex-wrap coursesBtn justify-content-md-start justify-content-center">
                {course.streams.map(stream => (
                  // eslint-disable-next-line react/jsx-key
                  <a href="#" className='btn text-blue bg-skyBlue'>{stream}</a>
                ))}
              </div>
            </div>
            <div className="d-grid pt-3">
              <button className='btn viewAllBtn'>View All {course.title} Courses</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Parent component handling the array
function CoursesContainer() {
  const [visibleCount, setVisibleCount] = useState(12); // Start by showing 12 cards

  const showMoreCourses = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  const courses = [
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      title: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      title: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
  ];

  return (
    <section className="bg-white pt-5">
      <div className="container">
        <div className="row">
          {courses.slice(0, visibleCount).map((course, index) => (
            <CoursesCard key={`${course.title}-${index}`} course={course} />
          ))}
        </div>
        {visibleCount < courses.length && ( // Only show the button if there are more courses to show
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-3">
              <button className='btn viewMoreBtn' onClick={showMoreCourses}>View More</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CoursesContainer;
