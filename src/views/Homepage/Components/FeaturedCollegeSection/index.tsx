import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'
import axios1 from 'src/configs/axios'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import Link from 'next/link';

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
          <div key={college.id} className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card featuredClgCard mb-4">

            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`} width={300} height={300} className="card-Image-top" alt="featured-college" />
            <div className="card-body">
              <h5 className="card-title text-blue text-truncate">{college.name}</h5>
              <p className="card-text text-truncate">
                <Image width={14} height={14} className="me-2 card-text-image" src="/images/icons/Location 2.svg" alt="location-icon" />
                {college.address}
              </p>
              <div className="d-flex justify-content-between">
                {/* <a href="#" className="active btn">Apply Now</a> */}
                <GlobalEnquiryForm className="applyNowButton btn" />
                <Link href="/colleges" className="btn">View More</Link>
              </div>
            </div>
          </div>
        ))} />
      </div>
    </section>
  )
}

export default FeaturedCollegeSection
