import { getCounsellorTeams } from 'src/lib/api/common'
import { LazyExpertTraineeClient } from 'src/app/components/ClientWrappers'

export default async function ExpertTraineeSec({ courseName }: { courseName?: string }) {
  const trainers = await getCounsellorTeams()
  if (!trainers?.length) return null

  return (
    <section className='bg-light py-md-5 py-3'>
      <div className="container">
        <h2 className='text-center fw-bold text-blue pb-3'>
          We have Educational Experts to Provide Guidance for {courseName} Course
        </h2>
        <p className="text-black">
          The counselors at Learntech Edu Solutions Pvt. Ltd. spark inspiration, helping students
          navigate their academic paths with clarity and confidence. They are experts in creating
          strategies based on student&apos;s preferences and interests to provide guidance for
          smooth admission process to colleges/ universities in India or abroad.
        </p>
        <LazyExpertTraineeClient trainers={trainers} />
      </div>
    </section>
  )
}
