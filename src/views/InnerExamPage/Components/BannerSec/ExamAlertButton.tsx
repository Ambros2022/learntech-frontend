'use client'

import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

interface Props {
  examTitle: string
}

/**
 * Thin client wrapper so BannerSec (Server Component) can pass a React icon
 * element as `buttonText` - which is not serialisable across the boundary.
 * Keeping this file tiny is intentional.
 */
export default function ExamAlertButton({ examTitle }: Props) {
  return (
    <GlobalPopupEnquiry
      buttonText={
        <>
          <i className="bi bi-bell-fill" aria-hidden="true" /> Get {examTitle} Alert
        </>
      }
      className="btn alertExamBtn"
    />
  )
}
