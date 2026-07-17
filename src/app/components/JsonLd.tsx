type JsonLdPrimitive = string | number | boolean | null
type JsonLdValue =
  | JsonLdPrimitive
  | { [key: string]: JsonLdValue }
  | JsonLdValue[]

type JsonLdProps = {
  schema: JsonLdValue
  id?: string
}

function serializeJsonLd(schema: JsonLdValue): string {
  return JSON.stringify(schema)
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/&/g, '&')
    .replace(new RegExp(' ', 'g'), ' ')
    .replace(new RegExp(' ', 'g'), ' ')
}

export default function JsonLd({ schema, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  )
}
