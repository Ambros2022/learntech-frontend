import Image from 'next/image'

const ExamSec = () => {
  return (
    <>
      <section id="exam-services" className='bg-white py-5'>
        <div className="container">
          <Image className='img-fluid w-100 h-100' width={2000} height={2000} alt='exams-img' src='/images/icons/servicesImg.webp' style={{ objectFit: 'contain' }} />
        </div>
      </section>
    </>
  )
}

export default ExamSec
