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


  function CollegeCard({ college }) {
    // alert(JSON.stringify(college))
    return (
      <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card featuredClgCard hover-card mb-4">
        <div className='card-image'>
          <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`} width={200} height={200} className="card-Image-top" alt="featured-college" />
        </div>
        <div className="card-body">
          <h5 className="card-title text-blue text-truncate">{college.name}</h5>
          <p className="card-text text-truncate">
            <Image width={17} height={17} className="me-2 card-text-image" src="/images/icons/Location 2.svg" alt="location-icon" />
            {college.address}
          </p>
          <div className="d-flex justify-content-between">
            <GlobalEnquiryForm className="applyNowButton btn" />
            <Link href={`/${data.slug}/${college.id}/${college.slug}`} className="btn">View More</Link>
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

          <MainCarousel items={colleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))} />
        </div>
      </section>
    </>
  )
}

export default TopUniversity
