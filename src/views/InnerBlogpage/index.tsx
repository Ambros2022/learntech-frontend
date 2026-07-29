import BannerSec from './Components/BannerSec'
import OverviewSec from './Components/OverviewSec'
import ExpertSec from './Components/ExpertSec'
import JsonLd from 'src/app/components/JsonLd'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || ''

function InnerBlogPage({ pagedata, newsData, blogsData }: any) {
  const createdAt = pagedata?.created_at
    ? new Date(pagedata.created_at).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZoneName: 'short',
      })
    : ''

  const blogUrl = `${WEB_URL}/blog/${pagedata?.id}/${pagedata?.slug}`

  // FAQPage schema — kept here since the view owns FAQ rendering
  const faqEntities = pagedata?.blogfaqs?.map((item: any) => ({
    '@type': 'Question',
    name: item.questions,
    acceptedAnswer: { '@type': 'Answer', text: item.answers },
  }))

  return (
    <>
      {faqEntities?.length > 0 && (
        <JsonLd
          id="blog-faq-schema"
          schema={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntities }}
        />
      )}

      <BannerSec data={pagedata} createdAt={createdAt} />
      <OverviewSec data={pagedata} newsData={newsData} blogsData={blogsData} />
      <ExpertSec data={pagedata} url={blogUrl} />
    </>
  )
}

export default InnerBlogPage
