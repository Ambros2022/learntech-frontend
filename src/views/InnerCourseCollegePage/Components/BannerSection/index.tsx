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

              <div className="col-md-11 col-12">
                <div className="row">
                  <div className="col-12">
                    <h1 className='text-white text-center'>{data.generalcourse.name} Courses : Duration, Eligibility, Fee Structure <br /
                    >{data.college.name}</h1>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12 text-center">
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
          <p><Link href={'/'} className="text-black">Home</Link> {'>'} <Link href={'/colleges'} className="text-black">Colleges</Link> {'>'} <Link href={`/college/${data.college.id}/${data.college.slug}`} className="text-black">{data.college.name}</Link> {'>'}{data.generalcourse.name}</p>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
