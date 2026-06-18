import AbroadPage from 'src/views/AbroadPage'
import { getAbroadCountryPage } from 'src/lib/api/common'

type Props = Record<string, never>

export async function generateMetadata(_: Props) {
  const data = await getAbroadCountryPage('study-in-canada')
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/study-in-canada`
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
  const data = await getAbroadCountryPage('study-in-canada')
  return <AbroadPage data={data} />
}
