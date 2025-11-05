import { ArticleDetail } from '@/components/pages/ArticleDetail'
import { PageWrapper } from '@/components/PageWrapper'
import { Metadata } from 'next'
import { getBlogPost, getBlogPosts } from '@/lib/services/blogService'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await getBlogPost(params.slug)
    return {
      title: `${article.title} | Andrić Law`,
      description: article.summary || article.title,
    }
  } catch (error) {
    return {
      title: 'Članak | Andrić Law',
    }
  }
}

export default async function ArticlePage({ params }: Props) {
  let article
  try {
    article = await getBlogPost(params.slug)
  } catch (error) {
    notFound()
  }

  return (
    <PageWrapper>
      <ArticleDetail slug={params.slug} initialArticle={article} />
    </PageWrapper>
  )
}
