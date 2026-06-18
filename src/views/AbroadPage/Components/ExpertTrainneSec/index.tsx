import { getCounsellorTeams } from 'src/lib/api/common'
import ExpertTraineeClient from './ExpertTraineeClient'

export default async function ExpertTraineeSec({ data }: { data: any }) {
  const trainers = await getCounsellorTeams()
  if (!trainers.length) return null
  return <ExpertTraineeClient trainers={trainers} countryName={data?.country?.name} />
}
