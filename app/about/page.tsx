import { PageWrapper } from '@/components/PageWrapper'
import { About } from '@/components/pages/About'

export const metadata = {
  title: 'O nama - Advokat Nikola Andrić | Andrić Law',
  description: 'Upoznajte advokata Nikolu Andrića i tim Andrić Law. Više od 10 godina iskustva u radnom i privrednom pravu.',
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <About />
    </PageWrapper>
  )
}
