'use client'

import TalkExpertEnquiry from './TalkExpertEnqiiry'

interface Props {
  type?: string
}

export default function TalkExpertEnquirySchool({ type }: Props) {
  return <TalkExpertEnquiry type={type} coursePlaceholder="Enter Grade" />
}
