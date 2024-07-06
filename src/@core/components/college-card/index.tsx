// CollegeCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

function CollegeCard({ college }) {
    return (
        <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card hover-card featuredClgCard mb-4">
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
                    <Link href={`/college/${college.id}/${college.slug}`} className="btn">View More</Link>
                </div>
            </div>
        </div>
    );
}

export default CollegeCard; // Make sure to export the component
