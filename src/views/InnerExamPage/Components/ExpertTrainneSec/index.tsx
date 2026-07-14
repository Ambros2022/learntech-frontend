import { LazyExpertTraineeClient } from 'src/app/components/ClientWrappers'

interface Props {
  data: any
  trainers: any[] // pre-fetched via getCounsellorTeams() in page.tsx
}

// Server Component — no 'use client'.
// Reuses LazyExpertTraineeClient (the modal + cards) already used on AbroadPage.
// Trainers data is fetched server-side; only the "View Profile" modal is client.
export default function ExperTraineeSec({ data, trainers }: Props) {
  if (!trainers?.length) return null

  return (
    <section className='bg-light py-md-5 py-3'>
      <div className="container">
        <h2 className='text-center fw-bold text-blue pb-3'>
          We have Educational Experts to Provide Guidance for{' '}
          {data?.exam_short_name} Exam
        </h2>
        <p className="text-black">
          The counselors at Learntech Edu Solutions Pvt. Ltd. spark inspiration,
          helping students navigate their academic paths with clarity and confidence.
          They are experts in creating strategies based on student&apos;s preferences
          and interests to provide guidance for smooth admission process to
          colleges / universities in India or abroad.
        </p>
        {/* Interactive cards + modal — ssr:false, skeleton prevents CLS */}
        <LazyExpertTraineeClient trainers={trainers} />
      </div>
    </section>
  )
}
