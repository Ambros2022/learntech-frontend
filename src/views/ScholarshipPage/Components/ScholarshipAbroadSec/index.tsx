import React, { useState } from 'react';
import ContactForm from 'src/@core/components/popup/ContactForm';
import Image from 'next/image';
const ScholarshipAbroadSec = ({ data = {} }: { data?: { top_description?: string } }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State for handling read more
  const maxLength = 7700; // Adjust this value to control when "Read More" appears

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (!data.top_description) return null;

    if (data.top_description.length <= maxLength || isExpanded) {
      return <div dangerouslySetInnerHTML={{ __html: data.top_description }} />;
    }

    const truncatedText = data.top_description.slice(0, maxLength) + '...';
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
        <div className='text-center mb-5'>
          <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read More</button>
        </div>
      </>
    );
  };

  return (
    <>
      <section className='bg-white'>
        <div className="container py-3">
          <h2 className='fw-bold text-blue'>Scholarships in India and Abroad</h2>
          <div className="row pt-2">
            <div className="col-md-8">
              {renderDescription()}
              {isExpanded && (
                <div className='text-center'>
                  <button onClick={toggleReadMore} className="btn viewMoreClgBtn mb-3">Read Less</button>
                </div>
              )}
            </div>
            <div className="col-md-4 pt-0 pt-md-0">
              <ContactForm heading={'Contact Us'} />


              <div className="scholarship-banner pt-3">
                <Image
                  src="/images/icons/schloarship-banner.webp"
                  alt="scholarship"
                  layout="responsive" // Allows scaling in mobile
                  width={420}
                  height={400}
                  className="img-fluid"
                />
              </div>



            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScholarshipAbroadSec;
