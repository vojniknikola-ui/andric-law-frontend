interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[]
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : [data])
      }}
    />
  )
}
