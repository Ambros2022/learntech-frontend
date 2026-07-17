import BannerSec from './Components/BannerSec'
import OverviewSec from './Components/OverviewSec'
import ExpertSec from './Components/ExpertSec'
import JsonLd from 'src/app/components/JsonLd'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || ''
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''

function InnerBlogPage({ pagedata, newsData, blogsData }: any) {
  const createdAt = pagedata?.created_at
    ? new Date(pagedata.created_at).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZoneName: 'short',
      })
    : ''

  const blogUrl = `${WEB_URL}/blog/${pagedata?.id}/${pagedata?.slug}`
  const ogImage = pagedata?.banner_image
    ? `${IMG_URL}/${pagedata.banner_image}`
    : `${WEB_URL}/images/icons/learntech-logo.png`

  const faqEntities = pagedata?.blogfaqs?.map((item: any) => ({
    '@type': 'Question',
    name: item.questions,
    acceptedAnswer: { '@type': 'Answer', text: item.answers },
  }))

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pagedata?.meta_title || pagedata?.name,
    description: pagedata?.meta_description,
    image: ogImage,
    url: blogUrl,
    datePublished: pagedata?.created_at,
    dateModified: pagedata?.updated_at || pagedata?.created_at,
    author: { '@type': 'Organization', name: 'Learntech Edu Solutions' },
    publisher: {
      '@type': 'Organization',
      name: 'Learntech Edu Solutions',
      logo: { '@type': 'ImageObject', url: `${WEB_URL}/images/icons/learntech-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': blogUrl },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${WEB_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${WEB_URL}/blogs` },
      { '@type': 'ListItem', position: 3, name: pagedata?.name, item: blogUrl },
    ],
  }

  return (
    <>
      <JsonLd id="blog-article-schema" schema={articleSchema} />
      <JsonLd id="blog-breadcrumb-schema" schema={breadcrumbSchema} />
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
