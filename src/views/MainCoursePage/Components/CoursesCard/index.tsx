import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';

// The individual card component
function CoursesCard({ course }) {
  return (
    <div id={course.id} className="col-md-4 col-lg-3">
      <div className="card mb-3 p-2 bg-crsCard">
        <div className="row g-0">
          <div className="col-lg-3 p-0 mb-3 mb-md-0 text-md-start text-center">
            <Image
              width={50}
              height={50}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${course.logo}`}
              className="rounded"
              alt="Courses-Card-img"
            />
          </div>
          <div className="col-lg-8 d-flex align-items-center">
            <div className="card-body p-0 ps-lg-2">
              <h5 className="fw-bold text-blue card-title text-md-center text-center text-lg-start">{course.name}</h5>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 my-0 my-md-3 mt flex-wrap coursesBtn justify-content-md-start justify-content-center min-vh-card">
          {course.general_courses.map(val => (
            <Link key={val.id} href={`/course/${val.id}/${course.slug}/${val.slug}`} className='btn text-blue streamBtn'>
              {val.short_name}
            </Link>
          ))}
        </div>
        <div className="d-grid pt-1">
          <Link href={`/course/${course.id}/${course.slug}`} className='btn viewAllBtn'>
            View All {course.name} Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

// Parent component handling the array
function CoursesContainer({ data, Changesize }) {
  const isMountedRef = useIsMountedRef();
  const [streamcourses, setStreamcourses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [datasize, setDatasize] = useState(12);

  const showMoreCourses = () => {
    setDatasize(prevSize => prevSize + 8);
  };

  const getStreamwiseCourse = useCallback(async () => {
    try {
      const response = await axios.get('api/website/stream/general/get', {
        params: {
          page: 1,
          size: datasize,
        },
      });
      if (isMountedRef.current) {
        setStreamcourses(response.data.data);
        setVisibleCount(response.data.totalItems);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [datasize, isMountedRef]);

  useEffect(() => {
    getStreamwiseCourse();
  }, [getStreamwiseCourse]);

  return (
    <section className="bg-white pt-5 pb-5">
      <div className="container">
        <div className="row">
          {streamcourses.map((course, index) => (
            <CoursesCard key={index} course={course} />
          ))}
        </div>
        {visibleCount > streamcourses.length && (
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-3">
              <button className='btn viewMoreBtnCourse' onClick={showMoreCourses}>
                View More
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CoursesContainer;
