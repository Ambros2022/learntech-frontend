import Image from 'next/image'
import React, { useState } from 'react'

const ContactCareerSec = () => {
  const [fileName, setFileName] = useState('Choose file')

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName('Upload Resume')
    }
  }

  return (
    <>
      <section className='bg-white'>
        <div className='container'>
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
                  <p className='text-white m-0'>pooja@learntechww.com</p>
                </div>
              </div>
              <div className='d-flex mb-3'>
                <div className='social-clr'>
                  <Image
                    src='/images/icons/Phone-blue.svg'
                    className='icon-white'
                    width={30}
                    height={30}
                    alt='email-icon'
                  />
                </div>
                <div className='align-content-center ms-2'>
                  <p className='text-white m-0'>+91 9036020016</p>
                  <p className='text-white m-0'>+91 9090165050</p>
                </div>
              </div>
              <div className='d-flex'>
                <div className='social-clr'>
                  <Image src='/images/icons/whatsapp-2.svg' width={30} height={30} alt='email-icon' />
                </div>
                <div className='align-content-center ms-2'>
                  <p className='text-white m-0'>+91 9036020016</p>
                </div>
              </div>
            </div>
            <div className='col-md-7 bg-white py-3 px-5'>
              <h2 className='text-center fw-bold text-blue'>Start Your Medical Journey</h2>
              <form action='#' className='mt-3'>
                <div className='row mb-3 careerContact'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <input type='text' className='form-control' placeholder='Full Name*' />
                    </div>
                  </div>
                  <div className='col-md-6 careerContact'>
                    <div className='mb-3'>
                      <input type='email' className='form-control' placeholder='Email Id' />
                    </div>
                  </div>
                </div>
                <div className='row mb-3 careerContact'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <input type='tel' className='form-control' placeholder='Mobile Number' />
                    </div>
                  </div>
                  <div className='col-md-6 careerContact'>
                    <div className='mb-3'>
                      <input type='text' className='form-control' placeholder='Date Of Birth' />
                    </div>
                  </div>
                </div>
                <div className='row mb-3 careerContact'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <input type='text' className='form-control' placeholder='Post Applied' />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <input type='text' className='form-control' placeholder='Job Location' />
                    </div>
                  </div>
                </div>
                <div className='row mb-3 careerContact'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <input type='text' className='form-control' placeholder='Current Location' />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <input type='text' className='form-control' placeholder='Total Experience in Years' />
                    </div>
                  </div>
                </div>
                <div className='row uploadRes'>
                  <div className='col-12'>
                    <div className='custom-file-input'>
                      <input type='file' id='file' className='file-input d-none' onChange={handleFileChange} />
                      <label htmlFor='file' className='btn btn-primary'>
                        {fileName}
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactCareerSec
