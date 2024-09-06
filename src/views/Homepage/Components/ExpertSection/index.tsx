import dynamic from 'next/dynamic';
import React from 'react';
const ExpertEnquiryForm = dynamic(() => import('src/@core/components/popup/ExpertEnquiryForm'), { ssr: false });

function ExpertSection() {
  return (
    <section className="Expert-bg-skyBlue" id="animation15">
      <div className="container py-5">
        <h3 className="fw-bold text-center text-blue">Connect with Our Elite Academic Advisors
        </h3>
        <p className="text-black">
          Unlock personalized strategies tailored to your educational goals. Let our experts guide you through every step of your academic journey, ensuring you make informed and impactful decisions.
        </p>
        <ExpertEnquiryForm placeholder={'Stream'} />
      </div>
    </section>
  );
}

export default ExpertSection;
