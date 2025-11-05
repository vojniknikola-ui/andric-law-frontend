import Blog from '@/components/pages/Blog'
import { PageWrapper } from '@/components/PageWrapper'
import { getBlogPosts } from '@/lib/services/blogService'

export const metadata = {
  title: 'Blog - Pravni savjeti i članci | Andrić Law',
  description: 'Pročitajte najnovije članke o radnom pravu, IT ugovorima, privrednom i porodičnom pravu.',
}

export const revalidate = 1800

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <PageWrapper>
      <Blog initialPosts={posts} />
    </PageWrapper>
  )
}
