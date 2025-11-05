import { ArticleDetail } from '@/components/pages/ArticleDetail'
import { PageWrapper } from '@/components/PageWrapper'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 3600 } }
    )
    const data = await response.json()
    const article = data.data[0]

    if (!article) {
      return {
        title: 'Članak nije pronađen | Andrić Law',
      }
    }

    return {
      title: `${article.attributes.title} | Andrić Law`,
      description: article.attributes.excerpt || article.attributes.title,
    }
  } catch (error) {
    return {
      title: 'Članak | Andrić Law',
    }
  }
}

export default function ArticlePage({ params }: Props) {
  return (
    <PageWrapper>
      <ArticleDetail slug={params.slug} />
    </PageWrapper>
  )
}
