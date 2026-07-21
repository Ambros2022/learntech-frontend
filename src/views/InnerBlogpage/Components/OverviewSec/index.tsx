import { Poppins } from 'next/font/google'
import NewsList from '../newsList'
import BlogList from '../blogsList'
import ContactForm from 'src/@core/components/popup/ContactForm'
import { LazyFaqSec as FaqSec } from 'src/app/components/ClientWrappers'

// Self-hosted at build by next/font (no CDN request)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Add width/height + aspect-ratio to CMS <img> tags to prevent CLS
function fixImages(html?: string) {
  if (!html) return ''
  return html.replace(/<img(.*?)>/g, (_match, group) => {
    const widthMatch = group.match(/width=["']?(\d+)["']?/)
    const heightMatch = group.match(/height=["']?(\d+)["']?/)
    const width = widthMatch ? parseInt(widthMatch[1], 10) : 600
    const height = heightMatch ? parseInt(heightMatch[1], 10) : 400
    const style = `style="width:100%;height:auto;aspect-ratio:${width}/${height};object-fit:cover;"`
    return `<img width="${width}" height="${height}" ${style} ${group}>`
  })
}

const OverviewSec = ({ data, newsData, blogsData }: any) => {
  const processedHTML = fixImages(data?.overview)

  return (
    <section className={`innerBlogSec bg-white pt-3 ${poppins.className}`}>
      <div className="container">
        <div className="row align-items-start">
          {/* Left Column */}
          <div className="col-12 col-lg-8 pe-lg-4 mb-4 mb-lg-0">
            <div
              className="bs-editor-text text-black"
              style={{ minHeight: '500px' }}
              dangerouslySetInnerHTML={{ __html: processedHTML }}
            />

            {Array.isArray(data?.blogfaqs) && data.blogfaqs.length > 0 && (
              <div className="col-12">
                <h4 className="fw-bold py-3 px-3 text-blue">Frequently Asked Questions</h4>
                <FaqSec data={data.blogfaqs} />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-12 col-lg-4 ps-lg-3">
            <div className="mb-3">
              <ContactForm heading={'Get More Details'} />
            </div>
            {blogsData?.length > 0 && (
              <div>
                <BlogList blogItems={blogsData} heading={'Latest Blogs'} />
              </div>
            )}
            {newsData?.length > 0 && (
              <div>
                <NewsList newsItems={newsData} heading={'Latest News'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewSec
