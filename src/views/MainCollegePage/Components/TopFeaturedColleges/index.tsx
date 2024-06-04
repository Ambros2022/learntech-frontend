import React, { useCallback, useEffect, useState } from 'react';
import MainCarousel from 'src/@core/components/main-carousel';
import Image from 'next/image';
import axios1 from 'src/configs/axios';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';



interface College {
  id: number;
  name: string;
  banner_image: string;
  
}


function TopFeaturedColleges() {
  const [colleges, setColleges] = useState<College[]>([]);


  // Fetch all colleges
  const getcolleges = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10000 };
      const response = await axios1.get('api/website/colleges/get', { params: roleparams });

    
      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getcolleges();
  }, [getcolleges]);

  // Define the Card component
const Card = ({ id, slug, imageUrl, title, applyLink, detailsLink }) => {
  return (
    <div className="card topFeaturedClgCard mb-5">
      <Image height={300} width={500} src={imageUrl} alt={title} />
      <div className="card-body">
        <h5 className="card-title text-black text-center text-truncate">{title}</h5>
        <div className="d-flex justify-content-center gap-2">
          {/* <a href={applyLink} className="ApplyNowBtn btn">Apply Now</a> */}
          <GlobalEnquiryForm className="ApplyNowBtn btn" />
          {/* <Link href={`/college/${id}/${slug}`} className="viewMoreBtn btn">View More</Link> */}
          <a  href={`/college/${id}/${slug}}`} className="viewDetailsBtn btn">View Details</a>
        </div>
      </div>
    </div>
  );
};

  // Map the fetched colleges to Card components
  const cardComponents = colleges.map((college, index) => (
    <Card
      key={index}
      imageUrl={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`}
      title={college.name}
      applyLink="#"
      detailsLink="#" id={college.id} slug={college.name}    />
  ));

  return (
    <section className='topFeaturedClgSec'>
      <div className="container position-relative">
        <h4 className="pt-5 mb-5 fw-bold text-blue text-center">Top Featured Colleges</h4>
        <MainCarousel items={cardComponents} />
      </div>
    </section>
  );
}

export default TopFeaturedColleges;
