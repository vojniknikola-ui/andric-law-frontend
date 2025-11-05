import Blog from '@/components/pages/Blog'
import { PageWrapper } from '@/components/PageWrapper'
import { BLOG_DATA } from '@/lib/services/blogService'

export const metadata = {
  title: 'Blog - Pravni savjeti i članci | Andrić Law',
  description: 'Pročitajte najnovije članke o radnom pravu, IT ugovorima, privrednom i porodičnom pravu.',
}

export default function BlogPage() {
  return (
    <PageWrapper>
      <Blog initialPosts={BLOG_DATA} />
    </PageWrapper>
  )
}
