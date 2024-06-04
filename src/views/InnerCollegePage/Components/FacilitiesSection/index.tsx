import Image from 'next/image';
import React from 'react';

function FacilitiesSection({data}) {


  function CardList() {
    return (
      <div className="row pt-3">
        {data.collegeamenities.map(card => (
          <CardComponent
            key={card.id}
            title={card.clgamenities.amenities_name}
            imageSrc={`${process.env.NEXT_PUBLIC_IMG_URL}/${card.clgamenities.amenities_logo}`}
          />
        ))}
      </div>
    );
  }

  function CardComponent({ title, imageSrc }) {
    return (
      <div className="col-6 col-md-2 col-lg-2 mb-3 d-flex p-2" key={title}>
        <div className="card text-center flex-fill">
          <div className="row">
            <div className="col-12 px-4">
              <Image src={imageSrc} width={30} height={30} className="card-img-top img-fluid mx-auto mt-3" alt={`${title}-logo`} />
              <p className="card-title fw-bold"><small>{title}</small></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className='bg-white facilitiesSec py-5'>
      <div className="container bg-skyBlue px-4 py-5">
        <h3 className='pt-3 text-blue fw-bold'>Facilities & Infrastructure</h3>
        <CardList />
      </div>
    </section>
  );
}

export default FacilitiesSection;
