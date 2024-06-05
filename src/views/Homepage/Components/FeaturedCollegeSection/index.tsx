import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'
import axios1 from 'src/configs/axios'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import Link from 'next/link';
import CollegeCard from 'src/@core/components/college-card';

function FeaturedCollegeSection() {

  const [colleges, setColleges] = useState<any[]>([]);


  //get all banners
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10000;
      const response = await axios1.get('api/website/colleges/get', { params: roleparams });

      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log("colleges", colleges)

  useEffect(() => {

    getcolleges();

  }, [getcolleges]);



  return (
    <section className="FeaturedClgCon bg-white" id="animation5" data-aos="fade-up">
      <div className="container pt-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">Featured Colleges</h2>
        <MainCarousel items={colleges.map(college => (
          <CollegeCard key={college.id} college={college} />
        ))} />
        <div className="d-flex justify-content-center pb-5">
          <Link href='/colleges' className='btn viewMoreClgBtn'>Load More</Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollegeSection
