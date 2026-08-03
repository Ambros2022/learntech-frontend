import AbroadPage from 'src/views/AbroadPage'
import { getAbroadCountryPage } from 'src/lib/api/common'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'
const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export async function generateMetadata() {
  const data = await getAbroadCountryPage('study-in-new-zealand').catch(() => null)
  const url = `${BASE_URL}/study-in-new-zealand`
  const countryName = data?.country?.name || 'New Zealand'
  const title = data?.meta_title || `Study in ${countryName} - Top Universities, Courses & Admissions | Learntech Edu Solutions`
  const description = data?.meta_description || `Explore top universities, courses, eligibility, fees, visas, and admission guidance to study in ${countryName}.`
  const keywords = data?.meta_keyword || `study in new zealand, new zealand universities, new zealand courses, study abroad admission`
  const image = data?.backgroundimage ? `${IMG_BASE}/${data.backgroundimage}` : `${BASE_URL}/images/og-image.png`

  return {
    title,
    description,
    keywords,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function Page() {
  const data = await getAbroadCountryPage('study-in-new-zealand').catch(() => null)
  return <AbroadPage data={data} />
}
