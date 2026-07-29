import Link from 'next/link'
import Image from 'next/image'

interface NewsListItem {
  imageSrc: string
  id: number | string
  name: string
  slug: string
}

const NewsItem = ({ imageSrc, id, name, slug }: NewsListItem) => (
  <div className="col-12">
    <Link href={`/news/${id}/${slug}`}>
      <div className="card bg-skyBlue hover-card mb-3">
        <div className="row g-0">
          <div className="col-lg-4 col-md-4 d-flex">
            <Image
              src={imageSrc}
              width={200}
              height={200}
              sizes="(max-width: 768px) 100vw, 200px"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              className="img-fluid rounded mx-md-1 align-self-center"
              alt={name || 'news-img'}
              loading="lazy"
            />
          </div>
          <div className="col-lg-8 col-md-8">
            <div className="card-body d-flex">
              <p className="align-content-center card-text news-text">{name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
)

const NewsList = ({ newsItems }: { newsItems: NewsListItem[] }) => {
  if (!newsItems?.length) return null
  return (
    <>
      <h4 className="fw-bold text-center py-3 text-blue">Other Trending News</h4>
      <div
        className="mb-5 pt-3 bg-skyBlue innerNewsCard px-4 overflow-y-auto rounded"
        style={{ maxHeight: 'calc(6 * 115px)' }}
      >
        <div className="row">
          {newsItems.map((item, index) => (
            <NewsItem
              key={index}
              imageSrc={item.imageSrc}
              name={item.name}
              id={item.id}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default NewsList