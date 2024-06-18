import React from 'react'
import MainCarousel2 from 'src/@core/components/carousel2';

function PopularCourses() {

  const items = [
    { id: 1, title: 'MBBS' },
    { id: 2, title: 'MEDICAL' },
    { id: 3, title: 'BDS' },
    { id: 4, title: 'B.Tech' },
    { id: 5, title: 'MBA' },
    { id: 6, title: 'Management' },
    { id: 7, title: 'MCA' },
    { id: 8, title: 'B.Com' },
    { id: 9, title: 'Art' },
    { id: 10, title: 'Law' },
    { id: 20, title: 'Paramedical' },
  ]

  // Function to create card components
  function createCards() {
    return items.map(card => (
      <CardComponent
        key={card.id}
        title={card.title}
      />
    ));
  }

  // CardComponent function
  function CardComponent({ title }) {
    return (
      <div className='topCourseConCarousel'>
        <div className="card text-center d-flex mx-2 border-1">
          <div className="row flex-fill">
            <div className="col-12 text-center text-start px-0">
              <div className="card-body d-flex">
                <small className="card-title align-self-center flex-fill">{title}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className='bg-white pb-5'>
      <section className='container bg-skyBlue rounded'>
        <h2 className='fw-bold text-blue pt-5 ps-5'>Popular Degree Courses</h2>
        <div className="topCarouselCardsCon px-5 pt-2 pb-5 position-relative">
          <MainCarousel2 items={createCards()} />
        </div>
      </section>
    </section>
  )
}

export default PopularCourses;
