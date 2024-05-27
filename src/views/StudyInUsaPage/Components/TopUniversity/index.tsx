import Image from 'next/image'
import React from 'react'
import MainCarousel from 'src/@core/components/main-carousel'

function TopUniversity() {

  const items = [
    {
      id: 1,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 2,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 3,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 4,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 5,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 6,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 7,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 8,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 9,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },
    {
      id: 10,
      title: 'Yale University, New Haven',
      description: 'New Haven, Connecticut',
      imageSrc: '/images/icons/filter-card.jpg'
    },

  ];

  function createCards() {
    return items.map(card => (
      <CardComponent
        key={card.id}
        title={card.title}
        imageSrc={card.imageSrc}
        description={card.description}
      />
    ));
  }

  // CardComponent function
  function CardComponent({ title, imageSrc, description }) {
    return (
      <div className="mx-2 card d-flex rounded text-center">
        <div className="position-relative">
          <Image src={imageSrc} className='rounded-top m-0' width={200} height={200} alt="clg-card" />
          <div className="position-absolute topClgIcon">
            <Image src={"/images/icons/topClg.png"} className='rounded-top m-0' width={40} height={40} alt="clg-card" />
          </div>
        </div>
        <div className='p-2'>
          <p className='m-0 text-black fw-bold'>{title}</p>
          <small className='text-blue mb-3'>{description}</small>
          <div className="d-grid mt-2">
            <button className='btn topApplyBtn'>Apply Now</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className='topUniSec'>
        <div className="container">
          <h4 className='pt-5 pb-3 fw-bold text-center text-blue'>Top 10 Universities to Study in USA</h4>
        </div>
        <div className='position-relative topUniCardCon container pb-5'>
          <MainCarousel items={createCards()} />
        </div>
      </section>
    </>
  )
}

export default TopUniversity
