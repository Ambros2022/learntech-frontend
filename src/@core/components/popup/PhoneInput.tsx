'use client'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Props {
  field: { value: string; onChange: (v: string) => void }
  country?: string
}

const format = (phone: string, meta: { dialCode: string }) => {
  const digits = phone.replace(new RegExp('^' + meta.dialCode), '')
  if (!digits.trim()) return ''
  return `+${meta.dialCode}-${digits}`
}

const PhoneInputField = ({ field, country = 'in' }: Props) => (
  <PhoneInput
    country={country}
    value={field.value}
    onChange={(value, meta) => field.onChange(format(value, meta as { dialCode: string }))}
  />
)

export default PhoneInputField
