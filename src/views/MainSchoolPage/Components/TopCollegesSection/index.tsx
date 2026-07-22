import ReadMoreContent from 'src/components/ui/ReadMoreWrapper'

interface Props {
  data?: { top_description?: string }
}

export default function TopSchoolsSection({ data = {} }: Props) {
  return (
    <section className='bg-white'>
      <div className='container innerClg pt-3 pt-md-5 pb-3'>
        <h2 className='text-center fw-bold text-blue mb-3'>List of Best Schools in India</h2>
        {data.top_description && (
          <ReadMoreContent html={data.top_description} collapsedHeight={350} />
        )}
      </div>
    </section>
  )
}
