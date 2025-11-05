import { JsonLd } from './JsonLd'

interface ArticleSchemaProps {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  authorName: string
  imageUrl?: string
  url: string
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  url
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName
    },
    publisher: {
      '@type': 'Organization',
      name: 'Andrić Law',
      logo: {
        '@type': 'ImageObject',
        url: 'https://andriclaw.ba/logo.svg'
      }
    },
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }

  return <JsonLd data={schema} />
}
