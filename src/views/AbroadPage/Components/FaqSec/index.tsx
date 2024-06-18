import Image from 'next/image'
import React from 'react'

function FaqSec({ data }) {
  return (
    <>
      <section className='bg-white faqSec pb-5'>
        <div className="container">
          <h2 className='text-center text-blue fw-bold pt-5 pb-3'>FAQs</h2>
          <div className="row faqImgCon">
            <div className="col-md-6 faqImgSec mb-3 rounded d-flex flex-fill">
              <div className='bg-skyBlue h-100 w-100 rounded text-center' style={{ position: "relative" }}>
                <Image src="/images/icons/faqImage.jpg" fill={true} alt='faq-img' />
              </div>
            </div>
            <div className="col-md-6 mb-3 rounded ">
              <div className="accordion" id="accordionExample">

                {data.abroadpagefaqs.map((item, index) => (
                  <div className="accordion-item mb-3" key={index}>
                    <h2 className="accordion-header text-white">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#col${index}`}
                        aria-expanded="true"
                        aria-controls={`col${index}`}
                      >
                        {index + 1}. {item.questions}
                      </button>
                    </h2>
                    <div
                      id={`col${index}`}
                      className="accordion-collapse collapse"
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
        </div >
      </section >
    </>
  )
}

export default FaqSec
