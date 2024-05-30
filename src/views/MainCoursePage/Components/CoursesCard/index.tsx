import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// The individual card component
function CoursesCard({ course }) {

  return (
    <>
      <div id={course.id} className="col-md-4 col-lg-3">
        <div className="card mb-3 p-2 bg-crsCard">
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
                  <a href="#" className='btn text-blue streamBtn'>{stream}</a>
                ))}
              </div>
            </div>
            <div className="d-grid pt-3">
              <Link href={`/course/${course.id}/${course.slug}`} className='btn viewAllBtn'>View All {course.title} Courses</Link>
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
      id: 1,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 2,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 3,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 4,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 5,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 6,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 7,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 8,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 9,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 10,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 11,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 12,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 13,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 14,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 15,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 16,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 17,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 18,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 19,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 20,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 21,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 22,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 23,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 24,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 25,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 26,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
    {
      id: 27,
      title: "Medical",
      slug: "Medical",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["MBBS", "MD in Physiology"]
    },
    {
      id: 28,
      title: "Engineering",
      slug: "Engineering",
      imageUrl: "/images/icons/filter-card.jpg",
      streams: ["Mechanical Engineering", "Computer Science"]
    },
  ];

  return (
    <section className="bg-white pt-5 pb-5">
      <div className="container">
        <div className="row">
          {courses.slice(0, visibleCount).map((course, index) => (
            <CoursesCard key={`${course.title}-${index}`} course={course} />
          ))}
        </div>
        {visibleCount < courses.length && ( // Only show the button if there are more courses to show
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-3">
              <button className='btn viewMoreBtnCourse' onClick={showMoreCourses}>View More</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CoursesContainer;
