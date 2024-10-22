import Image from 'next/image';
import React from 'react';
import JObEnquiryForm from 'src/@core/components/popup/JobEnquiryForm';
import Link from 'next/link';

const ContactCareerSec = ({ locations, data }) => {
  return (
    <section className='bg-white'>
      <div className='container'>
        <h2 className='fw-bold text-center text-blue pb-3'>JOB VACANCY APPLICATION FORM</h2>
        <div className='row py-5'>
          <div className='col-md-5 bg-blue rounded py-3'>
            <h2 className='fw-bold text-white'>Contact Career Representative</h2>
            <p className='text-white'>
              Please fill out the form to enable our career representatives to contact you at the earliest.
            </p>
            <p className='text-white'>To know more about this exciting opportunity, Connect with us</p>
            <div className='d-flex mb-3'>
              <div className='social-clr'>
                <Image
                  src='/images/icons/email-icon.svg'
                  className='icon-white'
                  width={30}
                  height={30}
                  alt='email-icon'
                />
              </div>
              <div className='align-content-center ms-2'>
                <p className='text-white m-0'>
                  <Link href='mailto:hr@learntechww.com' className='text-white text-decoration-none'>
                    hr@learntechww.com
                  </Link>
                </p>
                <p className='text-white m-0'>
                  <Link href='mailto:ashish@learntechww.com' className='text-white text-decoration-none'>
                    ashish@learntechww.com
                  </Link>
                </p>
              </div>
            </div>
            <div className='d-flex mb-3'>
              <div className='social-clr'>
                <Image
                  src='/images/icons/Phone-blue.svg'
                  className='clr-red'
                  width={30}
                  height={30}
                  alt='phone-icon'
                />
              </div>
              <div className='align-content-center ms-2'>
                <p className='text-white m-0'>
                  <Link href='tel:+919606833296' className='text-white text-decoration-none'>
                    +91 9606833296
                  </Link>
                </p>
                <p className='text-white m-0'>
                  <Link href='tel:+919090165050' className='text-white text-decoration-none'>
                    +91 9090165050
                  </Link>
                </p>
              </div>
            </div>
            <div className='d-flex'>
              <div className='social-clr'>
                <Image src='/images/icons/whatsapp-green.svg' width={30} height={30} alt='whatsapp-icon' />
              </div>
              <div className='align-content-center ms-2'>
                <p className='text-white m-0'>
                  <Link href='https://wa.me/+919606833296' className='text-white text-decoration-none'>
                    +91 9606833296
                  </Link>
                </p>
                <p className='text-white m-0'>
                  <Link href='https://wa.me/+919090165050' className='text-white text-decoration-none'>
                    +91 9090165050
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-7 bg-white py-3 px-5'>
            <h2 className='text-center fw-bold text-blue' id='contactForm'>ENTER YOUR DETAILS</h2>
            <JObEnquiryForm locations={locations} data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCareerSec;
