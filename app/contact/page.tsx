import { PageWrapper } from '@/components/PageWrapper'
import { Contact } from '@/components/pages/Contact'

export const metadata = {
  title: 'Kontakt - Zakažite konsultaciju | Andrić Law',
  description: 'Kontaktirajte advokatsku kancelariju Andrić Law. Telefon, email, adresa. Brz odgovor u roku od 24 sata.',
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <Contact />
    </PageWrapper>
  )
}
