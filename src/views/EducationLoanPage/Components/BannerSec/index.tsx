import { Breadcrumb } from 'src/app/components/Breadcrumb'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'
import Image from 'next/image'

const BannerSec = () => {
  return (
    <>
      <section className='eduLoanSec position-relative'>
        <Image
          src='/images/icons/BannerBG.webp'
          width={1400}
          height={300}
          alt='Education Loan banner background'
          priority
          className='w-100'
          style={{ objectFit: 'cover' }}
        />
        <div className="position-absolute h-100 w-100" style={{ top: '0px' }}>
          <div className="container d-flex justify-content-center flex-column h-100">
            <h1 className='text-white fw-bold text-center align-self-center'>
              Your Complete Guide to Secure Education Loans for India and Abroad
            </h1>
            <div className='align-self-center pt-3'>
              <GlobalEnquiryForm className='btn btn-success2' />
            </div>
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Education Loan' }]} />
    </>
  )
}

export default BannerSec