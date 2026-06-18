import ReadMoreContent from 'src/components/ui/ReadMoreWrapper'

interface Props {
  data?: { meta_title?: string; top_description?: string }
}

export default function TopUniversitiesSection({ data = {} }: Props) {
  return (
    <section className='bg-white'>
      <div className='container innerClg pt-3 pt-md-5 pb-3'>
        <h2 className='text-center fw-bold text-blue mb-3'>Best Universities in India</h2>
        {data.top_description && (
          <ReadMoreContent html={data.top_description} collapsedHeight={100} />
        )}
      </div>
    </section>
  )
}
