import React, { useCallback, useEffect, useState } from 'react';
import axios1 from 'src/configs/axios'
import Link from 'next/link';
import Image from 'next/image';
import CoursesCraousel from './CoursesCraousel';

// Define a type for the course items
type CourseItem = {
  id: number;
  name: string;
  slug: string;
  logo: string;
};

function PopularCourses() {
  const [items, setItems] = useState<CourseItem[]>([]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios1.get('/api/website/stream/get');
      if (response.data.status === 1) {
        setItems(response.data.data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Function to create card components
  function createCards() {
    return items.map((card) => (
      <CardComponent
        id={card.id}
        name={card.name}
        slug={card.slug}
        logo={card.logo}
      />
    ));
  }

  // CardComponent function
  function CardComponent({ name, id, slug, logo }: CourseItem) {
    return (
      <Link href={`/course/${id}/${slug}`}>
          <div className='courseConCarousel'>
        <div className="card hover-card text-center d-flex mx-2">
          <div className="row flex-fill">
            <div className="col-12">
              <Image width={50} height={50} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${logo}`} className="p-2 img-fluid mx-auto mt-3" alt={`${name}-logo`} />
            </div>
            <div className="col-12 text-center text-start px-0">
              <div className="card-body d-flex text-center justify-content-center">
                <h6 className="card-title flex-fill text-truncate">{name}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Link>
    );
  }

  return (
    <section className='bg-white pb-5'>
      <section className='container bg-skyBlue rounded'>
        <h2 className='fw-bold text-blue pt-5 ps-5'>Popular Degree Courses</h2>
        <div className="topCarouselCardsCon px-5 pt-2 pb-5 position-relative" style={{zIndex:'2'}}>
          <CoursesCraousel items={createCards()} />
        </div>
      </section>
    </section>
  );
}

export default PopularCourses;
