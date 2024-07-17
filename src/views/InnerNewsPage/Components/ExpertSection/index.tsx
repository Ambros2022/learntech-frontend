import React from 'react';
import NewsLetterEnquiry from 'src/@core/components/popup/NewsLetterEnquiry';

function ExpertSection() {
  return (
    <section className="ExpertCon" id="animation15">
      <div className="container py-5">
        <h3 className="fw-bold text-md-start text-center text-blue mb-3">Subscribe to our Newsletter</h3>
        <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <NewsLetterEnquiry />
      </div>
    </section>
  );
}

export default ExpertSection;
