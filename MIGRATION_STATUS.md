# Next.js Migration Status

## ✅ Completed
- [x] Next.js projekat kreiran
- [x] Dependencies instalirani (@tanstack/react-query, lucide-react, react-markdown, etc.)
- [x] Tailwind config sa custom temom
- [x] Root layout sa Google Fonts (Inter, Merriweather)
- [x] Providers setup (React Query, Language)
- [x] Global CSS
- [x] Environment variables (.env.local)
- [x] Public fajlovi kopirani
- [x] Lib fajlovi kopirani (firmInfo, services, i18n, utils)
- [x] Komponente kopirane
- [x] Page routes kreirane (/, /services, /about, /blog, /contact, /glossary, /privacy, /terms)
- [x] Dynamic route za članke (/article/[slug])
- [x] ClientLayout komponenta (Next.js verzija Layout-a)
- [x] next.config.js sa image optimization i rewrites

## ⚠️ Potrebno ažuriranje

### Komponente koje koriste React Router
Sve komponente u `components/` folderu koje koriste:
- `import { Link } from 'react-router-dom'` → treba `import Link from 'next/link'`
- `import { useNavigate }` → treba `import { useRouter } from 'next/navigation'`
- `navigate('/path')` → treba `router.push('/path')`

### Fajlovi za ažuriranje:
1. `components/pages/Home.tsx` - koristi React Router Link
2. `components/pages/Services.tsx`
3. `components/pages/About.tsx`
4. `components/pages/Blog.tsx`
5. `components/pages/ArticleDetail.tsx`
6. `components/pages/Contact.tsx`
7. `components/pages/Glossary.tsx`
8. `components/pages/Privacy.tsx`
9. `components/pages/Terms.tsx`
10. Sve child komponente koje koriste Link

### Services/API calls
Fajlovi u `lib/services/` možda koriste `REACT_APP_` env varijable:
- Treba zamijeniti sa `NEXT_PUBLIC_`

## 🚀 Kako nastaviti

### Opcija 1: Automatska zamjena (brzo)
```bash
cd /Users/nikola.andric/frontend-project/frontend-project/andric-law-nextjs

# Zamijeni React Router Link sa Next.js Link
find components -type f -name "*.tsx" -exec sed -i '' "s/from 'react-router-dom'/from 'next\/link'/g" {} +
find components -type f -name "*.tsx" -exec sed -i '' "s/import { Link }/import Link/g" {} +

# Zamijeni env varijable
find lib -type f -name "*.ts" -exec sed -i '' "s/REACT_APP_/NEXT_PUBLIC_/g" {} +
find components -type f -name "*.tsx" -exec sed -i '' "s/REACT_APP_/NEXT_PUBLIC_/g" {} +
```

### Opcija 2: Ručna migracija (sigurnije)
1. Otvori svaki fajl u `components/pages/`
2. Zamijeni `import { Link } from 'react-router-dom'` sa `import Link from 'next/link'`
3. Zamijeni `<Link to="/path">` sa `<Link href="/path">`
4. Zamijeni `useNavigate` sa `useRouter` iz `next/navigation`
5. Zamijeni `navigate('/path')` sa `router.push('/path')`

### Opcija 3: Wrapper komponenta
Kreiraj `components/Link.tsx` wrapper:
```typescript
import NextLink from 'next/link'

export const Link = ({ to, ...props }: any) => {
  return <NextLink href={to} {...props} />
}
```

## 📝 Test

```bash
npm run dev
```

Otvori http://localhost:3000

## 🎯 Prednosti Next.js migracije

- ✅ **SSR** - Server-Side Rendering out of the box
- ✅ **ISR** - Incremental Static Regeneration za blog članke
- ✅ **SEO** - Automatski meta tags, sitemap, robots.txt
- ✅ **Performance** - Automatska optimizacija slika, code splitting
- ✅ **Vercel** - Native deployment bez problema sa Puppeteer
- ✅ **API Routes** - Built-in API endpoints
- ✅ **TypeScript** - Full TypeScript support

## 🔄 Deployment

```bash
# Git setup
cd /Users/nikola.andric/frontend-project/frontend-project/andric-law-nextjs
git init
git add .
git commit -m "Initial Next.js migration"

# Push to GitHub (novi repo ili branch)
git remote add origin git@github.com:vojniknikola-ui/andric-law-nextjs.git
git push -u origin main

# Ili deploy direktno na Vercel
vercel --prod
```

## 📊 Trenutno stanje

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State**: React Query
- **Routing**: Next.js App Router
- **Deployment**: Ready za Vercel

**Status**: 80% complete - potrebno samo ažuriranje import statements
