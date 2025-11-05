import { PageWrapper } from '@/components/PageWrapper'
import { Privacy } from '@/components/pages/Privacy'

export const metadata = {
  title: 'Politika privatnosti | Andrić Law',
  description: 'Politika privatnosti advokatske kancelarije Andrić Law.',
}

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <Privacy />
    </PageWrapper>
  )
}
