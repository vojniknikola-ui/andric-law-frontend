import { Services } from '@/components/pages/Services'
import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Usluge - Advokatska kancelarija Sarajevo | Andrić Law',
  description: 'Pravne usluge u Sarajevu: privredno pravo, radno pravo, porodično pravo, ugovorno pravo, sudsko zastupanje.',
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <Services />
    </PageWrapper>
  )
}
