import ShareButtons from 'src/components/ui/ShareButtons'

const ExpertSec = ({ data, url }: any) => {
  const location = url || `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${data?.id}/${data?.slug}`

  return (
    <section className="bg-white py-3">
      <div className="container">
        <ShareButtons url={location} title={data?.meta_title || data?.name} />
      </div>
    </section>
  )
}

export default ExpertSec
