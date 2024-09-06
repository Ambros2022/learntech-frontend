import React from 'react';
import MainCarousel from 'src/@core/components/main-carousel';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });


// Define the Card component
const Card = ({ imageUrl, title, applyLink, detailsLink }) => {
  return (
    <div className="card topFeaturedClgCard mb-5">
      <Image height={300} width={500} src={imageUrl} alt={title} />
      <div className="card-body">
        <h5 className="card-title text-black text-center text-truncate">{title}</h5>
        <div className="d-flex justify-content-center gap-2">
          {/* <a href={applyLink} className="ApplyNowBtn btn">Apply Now</a> */}
          <a href={detailsLink} className="viewDetailsBtn btn">View Details</a>
        </div>
      </div>
    </div>
  );
}

function TopFeaturedColleges({blogdata}) {
  if (!blogdata || blogdata.length === 0) {
    return null; // or render a loading indicator or error message
  }
  // Array of card data objects
  const topFeaturedCollegeItems = blogdata.map(blog => ({
    imageUrl: `${process.env.NEXT_PUBLIC_IMG_URL}/${blog.banner_image}`,
    title: blog.name,
    detailsLink: `/blog/${blog.id}/${encodeURIComponent(blog.name)}`,
  }));
  // Map the card data objects to Card components
  const cardComponents = topFeaturedCollegeItems.map((item, index) => (
    <Card key={index} {...item} />
  ));

  return (
    <section className='topFeaturedClgSec'>
      <div className="container position-relative">
        <h4 className="pt-5 mb-5 fw-bold text-blue text-center">Related Blogs</h4>
        <MainCarousel items={cardComponents} />
        <div className="text-center mb-5">
          <Link href={"/blogs"} className='btn viewMoreClgBtn'>View More</Link>
        </div>
      </div>
    </section>
  );
}

export default TopFeaturedColleges;
