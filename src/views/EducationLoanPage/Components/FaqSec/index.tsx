import Image from 'next/image';
import React, { useState } from 'react';

function FaqSec({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className='bg-white faqSec pb-3'>
      <div className="container">
        <h2 className='text-center text-blue fw-bold pb-3'>FAQs</h2>
        <div className="row faqImgCon">
          <div className="col-md-6 faqImgSec mb-3 rounded">
            <div className='faqImageWrapper h-100 w-100 rounded text-center'>
              <Image
                src="/images/icons/FAQ-Banner.webp"
                width={500}
                height={500}
                className='faqImage img-fluid'
                alt='faq-img'
              />
            </div>
          </div>
          <div className="col-md-6 mb-3 rounded ">
            <div className="accordion" id="accordionExample">
              {data.abroadpagefaqs.map((item, index) => (
                <div className="accordion-item mb-3" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${activeIndex === index ? 'active' : ''}`}
                      type="button"
                      onClick={() => handleAccordionClick(index)}
                      aria-expanded={activeIndex === index ? "true" : "false"}
                    >
                      {index + 1}. {item.questions}
                      <span className={`arrow ${activeIndex === index ? 'rotate' : ''}`}></span>
                    </button>
                  </h2>
                  <div
                    id={`col${index}`}
                    className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div dangerouslySetInnerHTML={{ __html: item.answers }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSec;
