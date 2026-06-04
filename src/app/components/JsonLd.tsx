type JsonLdPrimitive = string | number | boolean | null
type JsonLdValue =
  | JsonLdPrimitive
  | { [key: string]: JsonLdValue }
  | JsonLdValue[]

type JsonLdProps = {
  schema: JsonLdValue
  id?: string
}

// Escape </ so it cannot prematurely close the <script> tag.
// This is the only injection vector for JSON embedded in HTML.
function serializeJsonLd(schema: JsonLdValue): string {
  return JSON.stringify(schema).replace(/<\//g, '<\\/')
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
