import { PageWrapper } from '@/components/PageWrapper'
import { Terms } from '@/components/pages/Terms'

export const metadata = {
  title: 'Uslovi korištenja | Andrić Law',
  description: 'Uslovi korištenja web stranice advokatske kancelarije Andrić Law.',
}

export default function TermsPage() {
  return (
    <PageWrapper>
      <Terms />
    </PageWrapper>
  )
}
