'use client'
import ReadMoreContent from 'src/components/ui/ReadMoreWrapper'

type AboutSecProps = {
  pagedata: any
}

const AboutSec = ({ pagedata }: AboutSecProps) => {
  const description: string = pagedata?.top_description ?? ''

  if (!description) return null

  return (
    <section className='py-3 bg-white'>
      <div className="container">
        <h2 className='text-blue fw-bold mb-3 text-center'>
          Educational Loan for students in India
        </h2>
        <div className='texteditior'>
          <ReadMoreContent
            html={description}
            charLimit={5000}
            buttonClassName="btn viewMoreClgBtn"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSec