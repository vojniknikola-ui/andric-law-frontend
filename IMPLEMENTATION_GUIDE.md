# 🚀 Vodič za Implementaciju - Moderan UI/UX Dizajn

## 📦 Instalirane Komponente

Sve nove komponente su kreirane i spremne za upotrebu:

### UI Komponente (`/components/ui/`)
- ✅ AnimatedSection
- ✅ Breadcrumbs
- ✅ FloatingCTA
- ✅ GradientText
- ✅ LoadingSpinner
- ✅ ModernButton
- ✅ ModernCard
- ✅ ProgressBar
- ✅ SkipToContent
- ✅ SocialProof
- ✅ TrustBadges

### SEO Komponente (`/components/seo/`)
- ✅ ArticleSchema
- ✅ BreadcrumbSchema
- ✅ JsonLd

### Utility Functions (`/lib/utils/`)
- ✅ cn() - Class name merger

---

## 🎯 Kako Koristiti Nove Komponente

### 1. Dodaj FloatingCTA na sve stranice

**U `app/layout.tsx`:**

```tsx
import { FloatingCTA, SkipToContent, ProgressBar } from '@/components/ui'
import { firmInfo } from '@/lib/firmInfo'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs">
      <body>
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
```

---

### 2. Modernizuj Hero Sekciju

**U `components/pages/Home.tsx`:**

```tsx
import { ModernButton, GradientText } from '@/components/ui'

// Zamijeni postojeće dugmiće sa:
<div className="flex gap-4">
  <ModernButton 
    variant="primary" 
    size="lg"
    icon={<Phone size={24} />}
    onClick={() => window.location.href = phoneHref}
  >
    {t.home.hero.callNow}
  </ModernButton>
  
  <ModernButton 
    variant="glass" 
    size="lg"
    icon={<Mail size={24} />}
    onClick={() => router.push('/contact')}
  >
    {t.home.hero.sendInquiry}
  </ModernButton>
</div>

// Dodaj gradient text u naslov:
<h1>
  <GradientText gradient="brand">
    {t.home.hero.headline}
  </GradientText>
</h1>
```

---

### 3. Dodaj Animated Sections

**Omotaj sekcije sa AnimatedSection:**

```tsx
import { AnimatedSection } from '@/components/ui'

<AnimatedSection animation="slide-up" delay={0}>
  <section className="py-20">
    {/* Sadržaj sekcije */}
  </section>
</AnimatedSection>

<AnimatedSection animation="fade" delay={200}>
  <section className="py-20">
    {/* Druga sekcija */}
  </section>
</AnimatedSection>
```

---

### 4. Dodaj Trust Badges

**Ispod hero sekcije:**

```tsx
import { TrustBadges } from '@/components/ui'

<section className="py-12 bg-white dark:bg-slate-950">
  <div className="max-w-7xl mx-auto px-4">
    <TrustBadges />
  </div>
</section>
```

---

### 5. Dodaj Social Proof

**Prije footer-a:**

```tsx
import { SocialProof } from '@/components/ui'

<section className="py-20 bg-gray-50 dark:bg-slate-900">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Šta kažu naši klijenti
    </h2>
    <SocialProof />
  </div>
</section>
```

---

### 6. Modernizuj Kartice

**Zamijeni postojeće kartice:**

```tsx
import { ModernCard } from '@/components/ui'

// Stara verzija:
<div className="card p-6">
  Sadržaj
</div>

// Nova verzija:
<ModernCard variant="hover-lift" padding="lg">
  Sadržaj
</ModernCard>

// Glassmorphism efekat:
<ModernCard variant="glass" padding="md">
  Sadržaj
</ModernCard>
```

---

### 7. Dodaj Breadcrumbs na Podstranice

**U `app/services/page.tsx`:**

```tsx
import { Breadcrumbs } from '@/components/ui'

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Breadcrumbs items={[
        { name: 'Usluge', url: '/services' }
      ]} />
      {/* Ostatak sadržaja */}
    </div>
  )
}
```

---

### 8. Dodaj Article Schema na Blog

**U `app/blog/[slug]/page.tsx`:**

```tsx
import { ArticleSchema } from '@/components/seo'

export default function BlogPost({ article }) {
  return (
    <>
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt}
        authorName="Nikola Andrić"
        imageUrl={article.image}
        url={`https://andriclaw.ba/blog/${article.slug}`}
      />
      {/* Sadržaj članka */}
    </>
  )
}
```

---

## 🎨 Primjeri Korištenja

### Primjer 1: Moderna Landing Sekcija

```tsx
import { AnimatedSection, ModernCard, ModernButton, GradientText } from '@/components/ui'

<AnimatedSection animation="slide-up">
  <section className="py-20 bg-gradient-to-br from-brand-900 to-brand-700">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-5xl font-bold text-white mb-6">
        Stručna pravna pomoć u <GradientText gradient="gold">Sarajevu</GradientText>
      </h2>
      <p className="text-xl text-white/90 mb-8">
        10+ godina iskustva u radnom pravu i IT ugovorima
      </p>
      <ModernButton variant="glass" size="lg" icon={<Phone />}>
        Zakažite konsultaciju
      </ModernButton>
    </div>
  </section>
</AnimatedSection>
```

### Primjer 2: Feature Grid

```tsx
import { ModernCard, AnimatedSection } from '@/components/ui'

<AnimatedSection animation="fade">
  <div className="grid md:grid-cols-3 gap-6">
    {features.map((feature, index) => (
      <ModernCard 
        key={feature.title}
        variant="hover-lift"
        padding="lg"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="text-cta-600 mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
        <p className="text-ink-600">{feature.description}</p>
      </ModernCard>
    ))}
  </div>
</AnimatedSection>
```

### Primjer 3: CTA Sekcija sa Glassmorphism

```tsx
import { ModernCard, ModernButton } from '@/components/ui'

<section className="relative py-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-cta-600 to-accent-500" />
  <div className="relative max-w-4xl mx-auto px-4">
    <ModernCard variant="glass" padding="lg" className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        Trebate pravnu pomoć?
      </h2>
      <p className="text-white/90 mb-6">
        Kontaktirajte nas danas za besplatnu inicijalnu konsultaciju
      </p>
      <div className="flex gap-4 justify-center">
        <ModernButton variant="primary" size="lg">
          Pozovite nas
        </ModernButton>
        <ModernButton variant="glass" size="lg">
          Pošaljite upit
        </ModernButton>
      </div>
    </ModernCard>
  </div>
</section>
```

---

## 🔧 Customizacija

### Prilagodi Boje

**U `tailwind.config.ts`:**

```ts
colors: {
  brand: {
    900: '#0D1B2A', // Tvoja boja
  },
  cta: {
    600: '#1D4ED8', // Tvoja CTA boja
  }
}
```

### Prilagodi Animacije

**U `globals.css`:**

```css
@keyframes customAnimation {
  from { /* početno stanje */ }
  to { /* krajnje stanje */ }
}

.animate-custom {
  animation: customAnimation 1s ease-out;
}
```

---

## 📊 Performance Tips

### 1. Lazy Load Komponente

```tsx
import dynamic from 'next/dynamic'

const SocialProof = dynamic(() => import('@/components/ui/SocialProof'), {
  loading: () => <LoadingSpinner />
})
```

### 2. Optimizuj Slike

```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Opis"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
  placeholder="blur"
/>
```

### 3. Preload Kritične Resurse

```tsx
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
```

---

## 🎯 SEO Optimizacije

### 1. Dodaj Meta Tags

```tsx
export const metadata: Metadata = {
  title: 'Naslov | Andrić Law',
  description: 'Opis (150-160 karaktera)',
  keywords: 'advokat, sarajevo, radno pravo',
  openGraph: {
    title: 'OG Naslov',
    description: 'OG Opis',
    images: ['/og-image.jpg'],
    locale: 'bs_BA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Naslov',
    description: 'Twitter Opis',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://andriclaw.ba',
  }
}
```

### 2. Dodaj Structured Data

```tsx
import { JsonLd } from '@/components/seo'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Andrić Law',
  url: 'https://andriclaw.ba',
  telephone: '+387 61 924 848',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sarajevo',
    addressCountry: 'BA'
  }
}

<JsonLd data={organizationSchema} />
```

---

## ✅ Checklist za Implementaciju

- [ ] Dodaj FloatingCTA u layout
- [ ] Dodaj ProgressBar u layout
- [ ] Dodaj SkipToContent u layout
- [ ] Zamijeni dugmiće sa ModernButton
- [ ] Zamijeni kartice sa ModernCard
- [ ] Dodaj AnimatedSection na sekcije
- [ ] Dodaj TrustBadges ispod hero-a
- [ ] Dodaj SocialProof prije footer-a
- [ ] Dodaj Breadcrumbs na podstranice
- [ ] Dodaj ArticleSchema na blog
- [ ] Testiraj dark mode
- [ ] Testiraj responsive design
- [ ] Testiraj accessibility (keyboard navigation)
- [ ] Testiraj performance (Lighthouse)
- [ ] Testiraj SEO (Google Search Console)

---

## 🚀 Deploy

```bash
# Build
npm run build

# Test production build locally
npm run start

# Deploy na Vercel
vercel --prod
```

---

## 📞 Podrška

Za pitanja i pomoć, kontaktiraj:
- Email: info@andriclaw.ba
- Telefon: +387 61 924 848

---

**Sretan coding! 🎉**
