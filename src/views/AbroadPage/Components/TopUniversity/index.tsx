import dynamic from 'next/dynamic';
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });
import axios1 from 'src/configs/axios'
import Link from 'next/link';

function TopUniversity({ data }) {
  const [colleges, setColleges] = useState<any[]>([]);
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10;
      roleparams['country_id'] = [data?.country_id];
      // roleparams['type'] = "university";
      const response = await axios1.get('api/website/colleges/get', { params: roleparams });

      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {

    getcolleges();

  }, [getcolleges]);



  function createCards() {
    return colleges.map(card => (
      <CardComponent
        key={card.id}
        title={card.name}
        imageSrc={card.banner_image}
      />
    ));
  }

  // CardComponent function
  function CardComponent({ title, imageSrc }) {

    return (
      <div className="mx-lg-2 mx-xl-4 mx-md-3 mx-5 card d-flex rounded text-center">
        <div className="position-relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imageSrc}`}
            // fill={true}
            width={150}
            height={150}
            alt={title}
          />

          <div className="position-absolute topClgIcon">


          </div>
        </div>
        <div className='p-3'>
          <p className='m-0 text-black fw-bold'>{title}</p>
          <div className="mt-2 text-center">
            <GlobalEnquiryForm className="btn ApplyNowBtn" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className='topUniSec'>
        <div className="container">
          <h4 className='pt-5 pb-3 fw-bold text-center text-blue'>Top 10 Universities to Study in {data?.country?.name}</h4>
        </div>
        <div className='position-relative topUniCardCon container pb-5'>
          <MainCarousel items={createCards()} />
        </div>
      </section>
    </>
  )
}

export default TopUniversity
