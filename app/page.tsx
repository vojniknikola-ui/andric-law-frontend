import { Home } from '@/components/pages/Home'
import { PageWrapper } from '@/components/PageWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Andrić Law - Advokatska kancelarija Sarajevo | Radno pravo i IT ugovori',
  description: 'Advokatska kancelarija u Sarajevu. Stručna pravna pomoć u radnom pravu, IT ugovorima, privrednom i porodičnom pravu. Advokat Nikola Andrić sa 10+ godina iskustva.',
}

export default function HomePage() {
  return (
    <PageWrapper>
      <Home />
    </PageWrapper>
  )
}
