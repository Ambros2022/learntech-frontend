import NewsList from '../newsList'
import ShareButtons from 'src/components/ui/ShareButtons'
import PdfViewButton from './PdfViewButton'

interface NewsListItem {
  imageSrc: string
  id: number | string
  name: string
  slug: string
}

interface InfoSecProps {
  data: any
  relatedNews: NewsListItem[]
  newsUrl: string
}

const InfoSec = ({ data, relatedNews, newsUrl }: InfoSecProps) => {
  return (
    <section className="bg-white">
      <div className="container innerNewsSec">
        <div className="row pt-3 pt-md-3 pb-0">
          <div className="col-md-9 mb-3">
            <h1 className="text-blue fw-bold">{data?.name}</h1>
          </div>

          {data?.pdf_file && data?.pdf_name && (
            <div className="col-md-3 pb-3 pb-md-0">
              <PdfViewButton pdfFile={data.pdf_file} pdfName={data.pdf_name} />
            </div>
          )}
        </div>

        <section className="bg-white py-2">
          <div className="container">
            <ShareButtons url={newsUrl} title={data?.meta_title || data?.name} />
          </div>
        </section>

        <div className="pt-0">
          <div className="row align-items-start">
            <div className="col-12 col-lg-8 text-black mb-4 mb-lg-0 pe-lg-4">
              <div className="bs-editor-text" dangerouslySetInnerHTML={{ __html: data?.overview || '' }} />
            </div>
            <div className="col-12 col-lg-4 ps-lg-3">
              <NewsList newsItems={relatedNews} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSec
