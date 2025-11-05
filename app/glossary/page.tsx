import { PageWrapper } from '@/components/PageWrapper'
import { Glossary } from '@/components/pages/Glossary'

export const metadata = {
  title: 'Pravni rječnik - Pojmovi i definicije | Andrić Law',
  description: 'Pravni rječnik sa objašnjenjima najvažnijih pravnih pojmova i termina.',
}

export default function GlossaryPage() {
  return (
    <PageWrapper>
      <Glossary />
    </PageWrapper>
  )
}
