import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { FloatingCTA, SkipToContent, ProgressBar } from '@/components/ui'
import { firmInfo } from '@/lib/firmInfo'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({ 
  weight: ['400', '700'], 
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Andrić Law - Advokatska kancelarija Sarajevo | Radno pravo i IT ugovori',
  description: 'Advokatska kancelarija u Sarajevu. Stručna pravna pomoć u radnom pravu, IT ugovorima, privrednom i porodičnom pravu. Advokat Nikola Andrić sa 10+ godina iskustva. Transparentne tarife.',
  keywords: 'advokat Sarajevo, advokatska kancelarija Sarajevo, radno pravo Sarajevo, IT ugovori BiH, MSA SOW, otkaz, osnivanje firme Sarajevo, advokat Nikola Andrić, pravna pomoć Sarajevo, advokat BiH',
  authors: [{ name: 'Nikola Andrić' }],
  openGraph: {
    type: 'website',
    locale: 'bs_BA',
    url: 'https://andriclaw.ba',
    title: 'Andrić Law - Advokatska kancelarija Sarajevo | Radno pravo i IT ugovori',
    description: 'Advokatska kancelarija u Sarajevu. Stručna pravna pomoć u radnom pravu, IT ugovorima, privrednom i porodičnom pravu.',
    siteName: 'Andrić Law',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrić Law - Advokatska kancelarija Sarajevo',
    description: 'Advokatska kancelarija u Sarajevu. Stručna pravna pomoć.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bs" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://andriclaw.ba" />
      </head>
      <body className="antialiased">
        <SkipToContent />
        <ProgressBar />
        <Providers>
          {children}
        </Providers>
        <FloatingCTA phoneNumber={firmInfo.phone} text="Pozovite nas" />
      </body>
    </html>
  )
}
