import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'
import axios1 from 'src/configs/axios'


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

console.log("colleges" , colleges)

useEffect(() => {
 
  getcolleges();
  
}, [getcolleges]);



  return (
    <section className="FeaturedClgCon bg-white" id="animation5" data-aos="fade-up">
    <div className="container pt-5 position-relative">
      <h4 className="fw-bold text-blue text-center mb-5">Featured Colleges</h4>
      <MainCarousel items={colleges.map(college => (
        <div key={college.id} className="card featuredClgCard mb-5">
          <Image src= {`${process.env.NEXT_PUBLIC_API_URI}/${college.banner_image}`} width={300} height={300} className="card-Image-top" alt="featured-college" />
          <div className="card-body">
            <h5 className="card-title text-blue">{college.name}</h5>
            <p className="card-text">
              <Image width={20} height={20} className="me-2 card-text-image" src="/images/icons/Location 2.svg" alt="location-icon" />
              {college.address}
            </p>
            <div className="d-flex justify-content-between">
              <a href="#" className="active btn">Apply Now</a>
              <a href="#" className="btn">View More</a>
            </div>
          </div>
        </div>
      ))} />
    </div>
  </section>
  )
}

export default FeaturedCollegeSection
