import { getBlogsListing, getColleges, getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import MainBlogPage from 'src/views/MainBlogPage'

const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')
const DEFAULT_TITLE = 'Educational Blogs | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Read educational blogs on college admissions, courses, and study abroad.'

export async function generateMetadata() {
  const pagedata = await getPageData('blogs')
  const title = pagedata?.meta_title || DEFAULT_TITLE
  const description = pagedata?.meta_description || DEFAULT_DESCRIPTION

  return {
    title,
    description,
    keywords: pagedata?.meta_keyword || '',
    alternates: { canonical: `${WEB_URL}/blogs` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${WEB_URL}/blogs`,
      siteName: 'Learntech Edu Solutions',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function BlogsPage() {
  const [{ blogs, totalPages }, { data: colleges }] = await Promise.all([
    getBlogsListing(1, 8),
    getColleges({ page: '1', size: '10000', type: 'college' }),
  ])

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${WEB_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${WEB_URL}/blogs` },
    ],
  }

  return (
    <>
      <JsonLd id="blogs-breadcrumb" schema={breadcrumbSchema} />
      <MainBlogPage initialBlogs={blogs} initialTotalPages={totalPages} colleges={colleges} />
    </>
  )
}
