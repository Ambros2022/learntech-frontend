import AbroadPage from 'src/views/AbroadPage'
import { getAbroadCountryPage } from 'src/lib/api/common'

export async function generateMetadata() {
  const data = await getAbroadCountryPage('study-in-germany')
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/study-in-germany`
  return {
    title: data?.meta_title,
    description: data?.meta_description,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title: data?.meta_title, description: data?.meta_description, url },
    twitter: { card: 'summary_large_image', title: data?.meta_title, description: data?.meta_description },
  }
}

export default async function Page() {
  const data = await getAbroadCountryPage('study-in-germany')
  return <AbroadPage data={data} />
}
