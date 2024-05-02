import Image from 'next/image';
import React from 'react'
import MainCarousel2 from 'src/@core/components/carousel2';

function OtherCourses() {

  const items = [
    { id: 1, title: 'Medical', imageSrc: '/images/icons/Paramedical.svg', courseCount: 18 },
    { id: 2, title: 'Architecture', imageSrc: '/images/icons/Architecture.svg', courseCount: 18 },
    { id: 3, title: 'Art', imageSrc: '/images/icons/Art.svg', courseCount: 18 },
    { id: 4, title: 'Law', imageSrc: '/images/icons/Law.svg', courseCount: 18 },
    { id: 5, title: 'Paramedical', imageSrc: '/images/icons/Medical.svg', courseCount: 18 },
    { id: 6, title: 'Management', imageSrc: '/images/icons/Management.svg', courseCount: 18 },
    { id: 7, title: 'Paramedical', imageSrc: '/images/icons/Paramedical.svg', courseCount: 18 },
    { id: 8, title: 'Architecture', imageSrc: '/images/icons/Architecture.svg', courseCount: 18 },
    { id: 9, title: 'Art', imageSrc: '/images/icons/Art.svg', courseCount: 18 },
    { id: 10, title: 'Law', imageSrc: '/images/icons/Law.svg', courseCount: 18 },
    { id: 20, title: 'Paramedical', imageSrc: '/images/icons/Paramedical.svg', courseCount: 18 },
  ]

  // Function to create card components
  function createCards() {
    return items.map(card => (
      <CardComponent
        key={card.id}
        title={card.title}
        imageSrc={card.imageSrc}
      />
    ));
  }

  // CardComponent function
  function CardComponent({ title, imageSrc }) {
    return (
      <div className='courseConCarousel'>
        <div className="card text-center d-flex mx-2">
          <div className="row flex-fill">
            <div className="col-12">
              <Image width={50} height={50} src={imageSrc} className="p-2 img-fluid mx-auto mt-3" alt={`${title}-logo`} />
            </div>
            <div className="col-12 text-center text-start px-0">
              <div className="card-body d-flex">
                <small className="card-title flex-fill">{title}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className='bg-white'>
      <section className='container bg-skyBlue'>
        <h3 className='fw-bold text-blue pt-5 ps-5'>Other Courses</h3>
        <div className="carouselCardsCon px-5 pt-2 pb-5 position-relative">
          <MainCarousel2 items={createCards()} />
        </div>
      </section>
    </section>
  )
}

export default OtherCourses;
