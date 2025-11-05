import { ArticleDetail } from '@/components/pages/ArticleDetail'
import { PageWrapper } from '@/components/PageWrapper'
import { Metadata } from 'next'
import { getBlogPost, getBlogPosts } from '@/lib/services/blogService'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export const revalidate = 3600
export const dynamic = 'force-static'
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.slice(0, 10).map((post) => ({ slug: post.slug }))
  } catch (error) {
    return []
  }
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
