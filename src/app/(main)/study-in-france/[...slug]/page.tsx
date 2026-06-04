import { notFound } from 'next/navigation'
import AbroadUniversity from 'src/views/AbroadUniversity'
import { getAbroadCountryPage } from 'src/lib/api/common'
type Props = { params: Promise<{ slug: string[] }> }
export default async function Page({ params }: Props) {
  const { slug } = await params
  const countryData = await getAbroadCountryPage('study-in-france')
  if (!slug?.[0]) notFound()
  return <AbroadUniversity id={slug[0]} Countrydata={countryData} />
}
