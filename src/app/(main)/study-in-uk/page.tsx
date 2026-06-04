import AbroadPage from 'src/views/AbroadPage'
import { getAbroadCountryPage } from 'src/lib/api/common'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await getAbroadCountryPage('study-in-uk')
  return <AbroadPage data={data} />
}