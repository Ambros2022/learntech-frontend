import BannerSec from './Components/BannerSec'
import OverviewSec from './Components/OverviewSec'
import OrganizationSection from './Components/OrganizationalSec'
import ExperTraineeSec from './Components/ExpertTrainneSec'

interface Props {
  pagedata: any
  organizationPage: any
  trainers: any[]
  promoBanners: any[]
  newsLinks: any[]
  upcomingExams: any[]
}

// Pure Server Component — no hooks, no 'use client'.
// Metadata + JSON-LD are handled in the parent page.tsx.
export default function InnerExamPage({
  pagedata,
  organizationPage,
  trainers,
  promoBanners,
  newsLinks,
  upcomingExams,
}: Props) {
  return (
    <>
      <BannerSec data={pagedata} newsLinks={newsLinks} />
      {pagedata && (
        <OverviewSec data={pagedata} promoBanners={promoBanners} upcomingExams={upcomingExams} />
      )}
      <OrganizationSection data={pagedata} organizationPage={organizationPage} />
      <ExperTraineeSec data={pagedata} trainers={trainers} />
    </>
  )
}
