import { LazyTalkExpertEnquiry } from 'src/app/components/ClientWrappers'

export default function ExpertSection({ collegeName, courseName }: { collegeName?: string; courseName?: string }) {
  return (
    <section className='collegeExpertSection bg-blue py-3 py-md-5 minehightinnercourse'>
      <div className="row mx-0">
        <div className="col-md-5 d-flex innerCollege bg-blue g-0">
          <div className='container d-flex justify-content-center'>
            <div className='px-2 px-md-0 ps-lg-3 text-white text-spacing align-content-center'>
              <h2 className='fw-bold mb-3'>Course Admission</h2>
              <p>Did you find your desired college?</p>
              <p>Need more assistance?</p>
              <p>Get customized counseling from our experts now!</p>
            </div>
          </div>
        </div>
        <div className="col-md-7 bg-blue py-3 g-0">
          <h2 className='fw-bold text-center text-white pb-2'>Talk to our Expert</h2>
          <LazyTalkExpertEnquiry defaultCollegeName={collegeName} defaultCourseName={courseName} />
        </div>
      </div>
    </section>
  )
}
