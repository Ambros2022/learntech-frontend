import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';

function BannerSection({ data }) {
console.log(data);
  return (
    <>
      <section className="bg-blue dentalCourseCon py-5">
        <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
          <div className="align-items-center">
            <div className="row px-5 px-md-0">
              <div className="col-md-1 col-6 mx-md-0 mb-md-0 mb-3 mx-auto bg-white rounded d-flex justify-content-center">
                <div className="align-content-center">
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`} className='img-blue' width={200} height={200} alt={data.name} />
                </div>
              </div>
              <div className="col-md-11 col-12">
                <div className="row">
                  <div className="col-12">
                    <h1 className='text-white'>{data.name} Courses: Eligibility, Syllabus, Colleges, Admission</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <GlobalEnquiryForm className="btn innerApplyBtn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-3 bg-white'>
        <div className='container'>
          <p><Link href={'/'} className="text-black">Home</Link> {'>'} <Link href={'/courses'} className="text-black">Courses</Link> {'>'} {data.name}</p>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
