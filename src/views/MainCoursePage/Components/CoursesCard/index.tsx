import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';

// The individual card component
function CoursesCard({ course }) {
  return (
    <div id={course.id} className="col-md-6 col-lg-4 col-xl-3 d-flex flex-fill">
      <div className="card mb-3 p-2 bg-crsCard d-flex flex-fill">
        <div className="row g-0 pt-2">
          <div className="col-lg-3 col-md-3 col-3 col-xl-3 p-0 mb-3 mb-md-0 text-md-start text-center">
            <Image
              width={50}
              height={50}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${course.logo}`}
              className="rounded"
              alt="Courses-Card-img"
            />
          </div>
          <div className="col-lg-9 col-9 col-xl-9 col-md-9">
            <div className="card-body p-0 ps-lg-2 pt-2">
              <h5 className="fw-bold text-blue card-title text-start ps-2">{course.name}</h5>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 my-0 my-md-3 mt flex-wrap coursesBtn justify-content-center min-vh-card">
          {course.general_courses.map(val => (
            <Link key={val.id} href={`/course/${course.id}/${course.slug}/${val.slug}`} className='btn streamBtn'>
              {val.short_name}
            </Link>
          ))}
        </div>
        <div className="d-grid pt-1 mt-auto">
          <Link href={`/course/${course.id}/${course.slug}`} className='d-flex justify-content-center text-center btn viewAllBtn'>
            <span className='align-self-center'>View All {course.name} Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const PromoAddBanner = ({ url }) => {

  return (
    <>
      <section className='bg-skyBlue addBanner rounded'>
        <div className="container row p-5">
          <div className="card col-md-12 col-lg-9 col-xl-10 mx-auto p-0">
            <div className="row g-0">
              <div className="col-md-4 addImgClg position-relative">
                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="clg-img" />
                <div className="position-absolute iconsPosition">
                  {/* <div className="d-flex flex-column">
                                      <h6 className='btn bg-gray text-white text-center d-flex'><i className="bi bi-info-circle"></i></h6>
                                      <h6 className='btn bg-gray text-white text-center d-flex'><i className="bi bi-x-circle"></i></h6>
                                  </div> */}
                </div>
                <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: '3000', top: '50%', left: '50%', color: "white" }}>Ad</h2>
              </div>
              <div className="col-md-8">
                <div className="card-body" style={{ zIndex: '200' }}>
                  <h5 className="card-text">PES University</h5>
                  <h3 className="card-title fw-bold">B.Tech 2024 - Admissions Open</h3>
                  <Link href='/colleges' className='btn openAddBtn'>Open <i className="bi bi-chevron-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

// Parent component handling the array
function CoursesContainer() {
  const isMountedRef = useIsMountedRef();
  const [streamcourses, setStreamcourses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [datasize, setDatasize] = useState(12);

  const showMoreCourses = () => {
    setDatasize(prevSize => prevSize + 8);
  };

  const [promoban, setPromoban] = useState<any[]>([]);

  // console.log(states, "states")

  const getPromobanner = useCallback(async () => {
    try {
      const response = await axios.get('api/website/banner/get?promo_banner=All_courses_page');
      if (isMountedRef.current) {

        setPromoban(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);

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
    getPromobanner();
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
        {promoban.length > 0 && <PromoAddBanner url={promoban[0].image} />}
      </div>
    </section>
  );
}

export default CoursesContainer;
