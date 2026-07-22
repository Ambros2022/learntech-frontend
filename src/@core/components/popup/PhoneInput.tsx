'use client'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface RHFProps {
  field: { value: string; onChange: (v: string) => void }
  name?: never
  country?: string
}

interface FormikProps {
  name: string
  field?: never
  country?: string
}

type Props = RHFProps | FormikProps

const format = (phone: string, meta: { dialCode: string }) => {
  const digits = phone.replace(new RegExp('^' + meta.dialCode), '')
  if (!digits.trim()) return ''
  return `+${meta.dialCode}-${digits}`
}

const PhoneInputField = (props: Props) => {
  if (props.field) {
    const { field, country = 'in' } = props
    return (
      <PhoneInput
        country={country}
        value={field.value}
        onChange={(value, meta) => field.onChange(format(value, meta as { dialCode: string }))}
      />
    )
  }

  // Formik path — lazy import to avoid bundling formik in RHF consumers
  return <FormikPhoneInput name={props.name} country={props.country} />
}

// Separate component so useField only runs when inside a Formik context
const FormikPhoneInput = ({ name, country = 'in' }: { name: string; country?: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useField } = require('formik') as typeof import('formik')
  const [field, , helpers] = useField({ name })

  return (
    <PhoneInput
      country={country}
      value={field.value}
      onChange={(value, meta) => helpers.setValue(format(value, meta as { dialCode: string }))}
    />
  )
}

export default PhoneInputField
