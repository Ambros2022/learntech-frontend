'use client'
import EnquiryForm from './form'

interface Props {
  page?: string
  onChanges?: () => void
  placeholder?: string
  collegeName?: string
}

// Thin alias over the generic, reusable EnquiryForm (react-hook-form + zod).
const SideContactUsForm = (props: Props) => <EnquiryForm {...props} />

export default SideContactUsForm
