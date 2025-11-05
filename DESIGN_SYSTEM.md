# 🎨 Andrić Law - Moderan UI/UX Dizajn Sistem

## 📋 Pregled

Ovaj dizajn sistem implementira moderne UI/UX prakse sa fokusom na:
- **Glassmorphism** efekte
- **Micro-interakcije** i animacije
- **SEO optimizacije**
- **Accessibility (WCAG 2.1 AA)**
- **Performance** optimizacije

---

## 🎯 Nove Komponente

### UI Komponente

#### 1. **ModernCard**
```tsx
import { ModernCard } from '@/components/ui'

<ModernCard variant="glass" padding="lg">
  Sadržaj kartice
</ModernCard>
```
**Varijante:**
- `default` - Standardna kartica
- `glass` - Glassmorphism efekat
- `gradient` - Gradijent pozadina
- `hover-lift` - Lift efekat na hover

#### 2. **ModernButton**
```tsx
import { ModernButton } from '@/components/ui'

<ModernButton variant="primary" size="lg" icon={<Phone />}>
  Pozovite nas
</ModernButton>
```
**Varijante:**
- `primary` - Glavni CTA
- `secondary` - Sekundarni
- `ghost` - Transparentan
- `glass` - Glassmorphism

#### 3. **AnimatedSection**
```tsx
import { AnimatedSection } from '@/components/ui'

<AnimatedSection animation="slide-up" delay={200}>
  Sadržaj koji se animira
</AnimatedSection>
```
**Animacije:**
- `fade` - Fade in
- `slide-up` - Slide odozdo
- `slide-left` - Slide s lijeva
- `slide-right` - Slide s desna
- `scale` - Scale efekat

#### 4. **FloatingCTA**
```tsx
import { FloatingCTA } from '@/components/ui'

<FloatingCTA phoneNumber="+387 61 924 848" text="Pozovite nas" />
```
Floating dugme koje se pojavljuje nakon 500px scroll-a.

#### 5. **GradientText**
```tsx
import { GradientText } from '@/components/ui'

<h1>
  Dobrodošli u <GradientText gradient="brand">Andrić Law</GradientText>
</h1>
```

#### 6. **ProgressBar**
```tsx
import { ProgressBar } from '@/components/ui'

<ProgressBar />
```
Reading progress bar na vrhu stranice.

#### 7. **TrustBadges**
```tsx
import { TrustBadges } from '@/components/ui'

<TrustBadges />
```
Trust badges za povećanje kredibiliteta.

#### 8. **SocialProof**
```tsx
import { SocialProof } from '@/components/ui'

<SocialProof />
```
Testimonials komponenta.

#### 9. **Breadcrumbs**
```tsx
import { Breadcrumbs } from '@/components/ui'

<Breadcrumbs items={[
  { name: 'Usluge', url: '/services' },
  { name: 'Radno pravo', url: '/services/employment' }
]} />
```

#### 10. **SkipToContent**
```tsx
import { SkipToContent } from '@/components/ui'

<SkipToContent />
```
Accessibility link za preskakanje navigacije.

---

### SEO Komponente

#### 1. **ArticleSchema**
```tsx
import { ArticleSchema } from '@/components/seo'

<ArticleSchema
  title="Naslov članka"
  description="Opis"
  datePublished="2024-01-01"
  authorName="Nikola Andrić"
  url="https://andriclaw.ba/blog/clanak"
/>
```

#### 2. **BreadcrumbSchema**
```tsx
import { BreadcrumbSchema } from '@/components/seo'

<BreadcrumbSchema items={[
  { name: 'Početna', url: '/' },
  { name: 'Blog', url: '/blog' }
]} />
```

#### 3. **JsonLd**
```tsx
import { JsonLd } from '@/components/seo'

<JsonLd data={schemaObject} />
```

---

## 🎨 Dizajn Tokeni

### Boje

```css
/* Brand Colors */
--brand-900: #0D1B2A
--brand-800: #14273B
--brand-700: #1F3651

/* CTA Colors */
--cta-600: #1D4ED8
--cta-700: #1A43BF

/* Accent Colors */
--accent-400: #60A5FA
--accent-500: #3B82F6
```

### Tipografija

```css
/* Headings */
font-family: Merriweather, Georgia, serif

/* Body */
font-family: Inter, system-ui, sans-serif
```

### Spacing

```css
/* Section Padding */
Mobile: 3rem (48px)
Tablet: 4rem (64px)
Desktop: 5rem (80px)
```

---

## 🚀 SEO Best Practices

### 1. **Structured Data**
- LocalBusiness schema
- LegalService schema
- FAQPage schema
- Article schema
- Breadcrumb schema

### 2. **Meta Tags**
```tsx
export const metadata: Metadata = {
  title: 'Naslov | Andrić Law',
  description: 'Opis stranice (150-160 karaktera)',
  keywords: 'ključne, riječi',
  openGraph: {
    title: 'OG Naslov',
    description: 'OG Opis',
    images: ['/og-image.jpg']
  }
}
```

### 3. **Performance**
- Image optimization (Next.js Image)
- Font optimization (next/font)
- Code splitting
- Lazy loading

### 4. **Accessibility**
- ARIA labels
- Semantic HTML
- Keyboard navigation
- Focus states
- Skip to content link
- Screen reader support

---

## 📱 Responsive Design

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile-First Approach

```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

---

## ⚡ Performance Optimizacije

### 1. **Critical CSS**
```html
<link rel="stylesheet" href="/critical.css" />
```

### 2. **Font Loading**
```tsx
const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  preload: true
})
```

### 3. **Image Optimization**
```tsx
<Image
  src="/image.jpg"
  alt="Opis"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

---

## 🎭 Animacije

### CSS Animations

```css
/* Fade In */
.animate-fadeIn

/* Slide Up */
.animate-slideUp

/* Float */
.animate-float

/* Glow */
.animate-glow

/* Hero Reveal */
.animate-hero
```

### Animation Delays

```tsx
<div className="animate-slideUp animation-delay-200">
  Delayed animation
</div>
```

---

## 🌙 Dark Mode

### Toggle Dark Mode

```tsx
'use client'
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()
```

### Dark Mode Classes

```tsx
<div className="bg-white dark:bg-slate-800">
  Content
</div>
```

---

## 📊 Conversion Optimization

### 1. **CTA Hierarchy**
- Primary: Pozovite nas (Phone)
- Secondary: Pošaljite upit (Email)
- Tertiary: Saznajte više (Links)

### 2. **Trust Signals**
- Trust badges
- Social proof
- Credentials
- Guarantees

### 3. **Urgency**
- "Dostupni za konsultacije" badge
- "Odgovaramo u 24h"
- Limited time offers

---

## 🔍 SEO Checklist

- [x] Semantic HTML5
- [x] Meta tags (title, description)
- [x] Open Graph tags
- [x] Structured data (JSON-LD)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Alt text na slikama
- [x] Internal linking
- [x] Mobile-friendly
- [x] Fast loading (< 3s)
- [x] HTTPS
- [x] Breadcrumbs

---

## 🎯 Conversion Rate Optimization

### A/B Testing Ideas

1. **Hero CTA**
   - Variant A: "Pozovite nas"
   - Variant B: "Zakažite besplatnu konsultaciju"

2. **Button Colors**
   - Variant A: Blue (#1D4ED8)
   - Variant B: Green (#10B981)

3. **Social Proof Position**
   - Variant A: After hero
   - Variant B: Before footer

---

## 📈 Analytics Events

```tsx
// Track CTA clicks
onClick={() => {
  gtag('event', 'cta_click', {
    cta_type: 'phone',
    location: 'hero'
  })
}}
```

---

## 🛠️ Utility Functions

### cn() - Class Name Merger

```tsx
import { cn } from '@/lib/utils/cn'

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  className
)}>
```

---

## 📝 Content Guidelines

### Headings

- H1: Jedan po stranici (glavni naslov)
- H2: Sekcije
- H3: Podsekcije
- H4-H6: Rijetko korišteni

### Text Length

- Meta description: 150-160 karaktera
- H1: 50-60 karaktera
- Paragraf: 2-3 rečenice

---

## 🚀 Deployment

### Build Command

```bash
npm run build
```

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://andriclaw.ba
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org](https://schema.org)

---

## 🎉 Zaključak

Ovaj dizajn sistem pruža sve potrebne komponente za moderan, pristupačan i SEO-optimizovan web sajt. Koristi najbolje prakse iz industrije i fokusira se na korisničko iskustvo i konverzije.
