'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  FileText,
  Briefcase,
  Users,
  Scale,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Handshake,
  Timer,
  ChevronDown,
} from 'lucide-react';
import { firmInfo } from '@/lib/firmInfo';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { StructuredData } from '@/components/StructuredData';
import { BASE_URL, DEFAULT_CITY, DEFAULT_COUNTRY, DEFAULT_REGION } from '@/lib/seo/constants';
import { AnimatedSection, ModernCard, TrustBadges, SocialProof, GradientText } from '@/components/ui';

export const Home: React.FC = () => {
  const { t, language } = useTranslations();
  const { title: metaTitle, description: metaDescription } = t.home.meta;

  useEffect(() => {
    document.title = metaTitle;

    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, value);
      }
    };

    updateMetaTag('meta[name="description"]', 'content', metaDescription);
    updateMetaTag('meta[name="title"]', 'content', metaTitle);
    updateMetaTag('meta[property="og:title"]', 'content', metaTitle);
    updateMetaTag('meta[property="og:description"]', 'content', metaDescription);
    updateMetaTag('meta[property="og:locale"]', 'content', language === 'bs' ? 'bs_BA' : 'en_US');
  }, [language, metaDescription, metaTitle]);

  const heroSubheadlineParts = useMemo(
    () => t.home.hero.subheadline.split('{{founder}}'),
    [t.home.hero.subheadline],
  );

  const situationIcons = useMemo(
    () => [
      <Briefcase className="h-6 w-6" />,
      <FileText className="h-6 w-6" />,
      <Users className="h-6 w-6" />,
      <Scale className="h-6 w-6" />,
    ],
    [],
  );

  const situations = t.home.situations.items.map((title, index) => ({
    title,
    link: '/services',
    icon: situationIcons[index] ?? situationIcons[0],
  }));

  const credentials = t.home.credentials.items;
  const pricingItems = t.home.pricing.items;
  const guides = t.home.guides.items;
  const processSteps = t.home.process.steps;

  const guaranteeIcons = useMemo(
    () => [
      <ShieldCheck className="h-6 w-6 text-cta-600 dark:text-accent-400" />,
      <Handshake className="h-6 w-6 text-cta-600 dark:text-accent-400" />,
      <Timer className="h-6 w-6 text-cta-600 dark:text-accent-400" />,
    ],
    [],
  );

  const guarantees = t.home.guarantees.items.map((item, index) => ({
    ...item,
    icon: guaranteeIcons[index],
  }));

  const localeCode = language === 'bs' ? 'bs-BA' : 'en-US';
  const normalizedPhone = firmInfo.phone.replace(/[^0-9+]/g, '');

  const faqSchema = useMemo(() => {
    if (!t.home.faqs.items.length) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: localeCode,
      mainEntity: t.home.faqs.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, [localeCode, t.home.faqs.items]);

  const legalServiceSchema = useMemo(() => {
    const socials = Object.values(firmInfo.socials ?? {}).filter(Boolean);
    return {
      '@context': 'https://schema.org',
      '@type': ['LegalService', 'Attorney', 'LocalBusiness'],
      '@id': `${BASE_URL}/#andriclaw`,
      name: firmInfo.name,
      image: firmInfo.founderImage,
      logo: `${BASE_URL}${firmInfo.logo}`,
      url: BASE_URL,
      telephone: normalizedPhone,
      email: firmInfo.email,
      priceRange: '$$',
      inLanguage: localeCode,
      areaServed: DEFAULT_COUNTRY,
      address: {
        '@type': 'PostalAddress',
        streetAddress: firmInfo.address,
        addressLocality: DEFAULT_CITY,
        addressRegion: DEFAULT_REGION,
        addressCountry: 'BA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.8563,
        longitude: 18.4131,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          opens: '09:00',
          closes: '17:00',
        },
      ],
      sameAs: socials,
      founder: {
        '@type': 'Person',
        name: firmInfo.founder,
      },
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t.home.situations.items[0],
          },
        },
      ],
    };
  }, [localeCode, t.home.situations.items]);

  const phoneHref = `tel:${normalizedPhone}`;

  const faqs = t.home.faqs.items;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="transition-colors duration-300">
      <StructuredData
        data={[
          legalServiceSchema,
          faqSchema,
        ].filter(Boolean)}
      />
      {/* Hero - Modern with gradient mesh */}
      <section
        className="relative isolate overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-brand-900 text-white transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        itemScope
        itemType="https://schema.org/LegalService"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(29,78,216,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:py-32 xl:py-40">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-sm font-medium">Dostupni za konsultacije</span>
            </div>
            <h1 className="animate-hero text-balance text-3xl font-bold leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl lg:mb-8 lg:text-6xl xl:text-7xl">
              {t.home.hero.headline}
            </h1>
            <p className="animate-hero animation-delay-200 mb-8 max-w-3xl text-balance text-lg leading-relaxed text-white/95 sm:text-xl md:text-2xl lg:mb-12">
              {heroSubheadlineParts[0]}
              <span className="font-semibold text-white dark:text-slate-50">{firmInfo.founder}</span>
              {heroSubheadlineParts[1] ?? ''}
            </p>

            {/* Primary CTAs - Modern glassmorphism */}
            <div className="animate-hero animation-delay-400 mb-12 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:gap-6">
              <a
                href={phoneHref}
                className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-cta-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cta-600/50 transition-all duration-300 hover:scale-105 hover:bg-cta-700 hover:shadow-xl hover:shadow-cta-600/60 sm:px-8 sm:text-lg lg:min-h-[64px] lg:px-10 lg:text-xl"
              >
                <Phone size={24} className="transition-transform group-hover:rotate-12" />
                {t.home.hero.callNow}
              </a>
              <Link
                href="/contact"
                className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20 sm:px-8 sm:text-lg lg:min-h-[64px] lg:px-10 lg:text-xl"
              >
                <Mail size={24} className="transition-transform group-hover:scale-110" />
                {t.home.hero.sendInquiry}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <AnimatedSection animation="fade">
        <section className="bg-white py-12 transition-colors duration-300 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustBadges />
          </div>
        </section>
      </AnimatedSection>

      {/* Situation Navigator - Bento Grid Style */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="bg-gradient-to-b from-white to-gray-50 py-12 transition-colors duration-300 dark:from-slate-950 dark:to-slate-900 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 transition-colors duration-300 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-cta-600/10 px-4 py-1.5 text-sm font-semibold text-cta-600 dark:bg-cta-600/20 dark:text-cta-400">Naše usluge</span>
            <h2 className="mb-6 text-2xl font-bold text-brand-900 dark:text-slate-100 sm:text-3xl md:text-4xl lg:text-5xl">
              {t.home.situations.heading}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-ink-600 dark:text-slate-300 md:text-lg lg:text-xl">
              {t.home.situations.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6">
            {situations.map((situation, index) => (
              <Link
                key={situation.title}
                href={situation.link}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-800 md:p-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cta-600/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cta-600 to-cta-700 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl lg:h-16 lg:w-16">
                    {situation.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-900 transition-colors group-hover:text-cta-600 dark:text-slate-100 dark:group-hover:text-cta-400 lg:text-xl">
                    {situation.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-cta-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-cta-400">
                    Saznaj više
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Credentials - Modern Stats */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 to-brand-800 py-12 text-white transition-colors duration-300 dark:from-slate-900 dark:to-slate-800 md:py-16 lg:py-20 xl:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              {t.home.credentials.heading}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {credentials.map((credential, index) => (
              <div 
                key={credential} 
                className="group relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-400/20">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="leading-relaxed text-white/90">{credential}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl dark:bg-slate-800/95 lg:mt-16 lg:p-12">
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br from-cta-600/20 to-transparent blur-3xl" />
            <div className="relative">
              <h3 className="mb-8 text-center text-2xl font-bold text-brand-900 dark:text-slate-100 md:text-3xl lg:text-4xl">
                {t.home.pricing.heading}
              </h3>
              <div className="mb-8 space-y-6">
                {pricingItems.map((item, index) => (
                  <div 
                    key={item.label} 
                    className="group flex items-center justify-between rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:bg-cta-50 dark:bg-slate-700/50 dark:hover:bg-slate-700"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="font-semibold text-ink-900 dark:text-slate-200">{item.label}</span>
                    <span className="text-xl font-bold text-cta-600 dark:text-cta-400">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-ink-600 dark:text-slate-300 md:text-base">{t.home.pricing.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics - scannable */}
      <section className="bg-white py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-brand-900 dark:text-slate-100 sm:text-3xl md:text-4xl lg:mb-12 lg:text-5xl">
            {t.home.guides.heading}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                href="/blog"
                className="group card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-hard"
              >
                <h3 className="mb-3 text-xl font-bold text-brand-900 dark:text-slate-100 transition-colors group-hover:text-cta-600 dark:group-hover:text-cta-400">
                  {guide.title}
                </h3>
                <p className="mb-4 leading-relaxed text-ink-600 dark:text-slate-300">{guide.description}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-cta-600 dark:text-cta-400 transition-all group-hover:gap-3">
                  {t.home.guides.cta}
                  <ArrowRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process overview - Timeline Style */}
      <section className="relative bg-white py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-cta-600/10 px-4 py-1.5 text-sm font-semibold text-cta-600 dark:bg-cta-600/20 dark:text-cta-400">Kako radimo</span>
            <h2 className="mb-4 font-serif text-3xl font-bold text-brand-900 dark:text-slate-100 md:text-4xl lg:text-5xl">{t.home.process.heading}</h2>
            <p className="mx-auto max-w-2xl text-lg text-ink-600 dark:text-slate-300">{t.home.process.description}</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-cta-600 via-cta-600/50 to-transparent md:block" />
            <div className="space-y-12 md:space-y-16">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-center gap-8 md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1">
                    <div className={`group rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cta-600 to-cta-700 text-2xl font-bold text-white shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                        0{index + 1}
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-brand-900 dark:text-slate-100">{step.title}</h3>
                      <p className="text-lg leading-relaxed text-ink-600 dark:text-slate-300">{step.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 hidden h-6 w-6 rounded-full border-4 border-cta-600 bg-white shadow-lg dark:bg-slate-900 md:block" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-brand-900 dark:text-slate-100 md:text-4xl">{t.home.guarantees.heading}</h2>
            <p className="text-ink-600 dark:text-slate-300">{t.home.guarantees.description}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {guarantees.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-line-200 bg-gray-50 p-8 shadow-soft transition-all duration-300 hover:shadow-medium dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cta-600/10 text-cta-600 dark:bg-cta-600/20 dark:text-cta-400">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-900 dark:text-slate-100">{item.title}</h3>
                <p className="leading-relaxed text-ink-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Micro CTA - document review */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 transition-colors duration-300 dark:from-slate-900 dark:to-slate-800 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-brand-900 dark:text-slate-100 md:text-4xl">
            {t.home.microCta.heading}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-ink-900 dark:text-slate-100">
            {t.home.microCta.description}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${firmInfo.email}`}
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg bg-brand-900 px-8 py-4 text-lg font-semibold text-white shadow-medium transition-all duration-300 hover:scale-105 hover:bg-brand-700 hover:shadow-hard"
            >
              <Mail size={24} />
              {t.home.microCta.actions.email}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border-2 border-brand-900 bg-white px-8 py-4 text-lg font-semibold text-brand-900 shadow-medium transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-hard dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {t.home.microCta.actions.schedule}
            </Link>
          </div>
          <p className="mt-6 text-sm text-ink-600 dark:text-slate-300">{t.home.microCta.confidentiality}</p>
        </div>
      </section>

      {/* Social Proof */}
      <AnimatedSection animation="slide-up">
        <section className="bg-gradient-to-br from-gray-50 to-white py-12 transition-colors duration-300 dark:from-slate-900 dark:to-slate-950 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block rounded-full bg-cta-600/10 px-4 py-1.5 text-sm font-semibold text-cta-600 dark:bg-cta-600/20 dark:text-cta-400">Testimonials</span>
              <h2 className="mb-4 text-3xl font-bold text-brand-900 dark:text-slate-100 md:text-4xl lg:text-5xl">
                Šta kažu naši <GradientText gradient="brand">klijenti</GradientText>
              </h2>
            </div>
            <SocialProof />
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection animation="fade">
        <section className="bg-white py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center font-serif text-3xl font-bold text-brand-900 dark:text-slate-100 md:text-4xl">
            {t.home.faqs.heading}
          </h2>
          <p className="mb-10 text-center text-ink-600 dark:text-slate-300">{t.home.faqs.description}</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-line-200 bg-gray-50 shadow-soft transition-all duration-300 hover:shadow-medium dark:border-slate-700 dark:bg-slate-800"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-brand-900 dark:text-slate-100">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-ink-600 dark:text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 leading-relaxed text-ink-700 dark:text-slate-200">{faq.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </AnimatedSection>
    </div>
  );
};
