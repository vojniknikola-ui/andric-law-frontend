import { ArticleDetail } from '@/components/pages/ArticleDetail'
import { PageWrapper } from '@/components/PageWrapper'
import { Metadata } from 'next'
import { BLOG_DATA } from '@/lib/services/blogService'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return BLOG_DATA.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = BLOG_DATA.find(p => p.slug === slug)
  if (!article) {
    return { title: 'Članak | Andrić Law' }
  }
  return {
    title: `${article.title} | Andrić Law`,
    description: article.summary || article.title,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = BLOG_DATA.find(p => p.slug === slug)
  if (!article) notFound()

  return (
    <PageWrapper>
      <ArticleDetail slug={slug} initialArticle={article} />
    </PageWrapper>
  )
}
