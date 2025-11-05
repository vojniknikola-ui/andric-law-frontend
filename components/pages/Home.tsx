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
      {/* Hero - F-pattern optimized */}
      <section
        className="relative isolate overflow-hidden bg-brand-900 text-white transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
        style={{
          backgroundImage: "url('https://your-blob-url.vercel-storage.com/hero-balance.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        itemScope
        itemType="https://schema.org/LegalService"
      >
        <div
          className="absolute inset-0 bg-brand-900/80 mix-blend-multiply transition-opacity duration-500 dark:bg-slate-950/85"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 backdrop-blur-[1px] sm:px-6 md:py-24 lg:py-32 xl:py-40">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h1 className="animate-hero text-balance text-3xl font-bold leading-tight text-white drop-shadow-lg dark:text-slate-100 sm:text-4xl md:text-5xl lg:mb-8 lg:text-6xl xl:text-7xl">
              {t.home.hero.headline}
            </h1>
            <p className="animate-hero animation-delay-200 mb-8 max-w-3xl text-balance text-lg leading-relaxed text-white dark:text-slate-200 sm:text-xl md:text-2xl lg:mb-12">
              {heroSubheadlineParts[0]}
              <span className="font-semibold text-white dark:text-slate-50">{firmInfo.founder}</span>
              {heroSubheadlineParts[1] ?? ''}
            </p>

            {/* Primary CTAs - large touch targets */}
            <div className="animate-hero animation-delay-400 mb-12 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:gap-6">
              <a
                href={phoneHref}
                className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg bg-cta-600 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cta-700 sm:px-8 sm:text-lg lg:min-h-[64px] lg:px-10 lg:text-xl"
              >
                <Phone size={24} />
                {t.home.hero.callNow}
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30 dark:border-white/40 dark:hover:bg-white/20 sm:px-8 sm:text-lg lg:min-h-[64px] lg:px-10 lg:text-xl"
              >
                <Mail size={24} />
                {t.home.hero.sendInquiry}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Situation Navigator - high information scent */}
      <section className="bg-surface py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 transition-colors duration-300 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-brand-900 sm:text-3xl md:text-4xl lg:mb-10 lg:text-5xl">
            {t.home.situations.heading}
          </h2>
          <p className="mb-8 max-w-4xl text-base text-ink-600 md:text-lg lg:mb-10 lg:text-xl">
            {t.home.situations.description}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-4">
            {situations.map((situation, index) => (
              <Link
                key={situation.title}
                href={situation.link}
                className="group flex items-center gap-4 rounded-xl border-2 border-transparent bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 md:p-6 lg:p-8"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-brand-700 transition-all duration-300 group-hover:bg-blue-200 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-slate-700 lg:h-14 lg:w-14">
                  {situation.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-brand-900 transition-colors group-hover:text-link-600 dark:text-slate-100 dark:group-hover:text-link-400 md:text-lg lg:text-xl">
                    {situation.title}
                  </h3>
                </div>
                <ArrowRight className="h-5 w-5 text-ink-600 transition-all group-hover:translate-x-1 group-hover:text-link-600 dark:text-slate-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials - evidence, not marketing */}
      <section className="bg-[#F7F7F5] py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-brand-900 sm:text-3xl md:text-4xl lg:mb-12 lg:text-5xl">
            {t.home.credentials.heading}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {credentials.map((credential) => (
              <div key={credential} className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-success-600 dark:text-success-400" />
                <p className="leading-relaxed text-ink-900">{credential}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-xl border-2 border-line-200 bg-surface p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 lg:mt-16 lg:p-10">
            <h3 className="mb-6 text-xl font-bold text-brand-900 md:text-2xl lg:mb-8 lg:text-3xl">
              {t.home.pricing.heading}
            </h3>
            <div className="mb-6 space-y-4 lg:space-y-5">
              {pricingItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="font-medium text-ink-900">{item.label}</span>
                  <span className="font-bold text-brand-900">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-600 md:text-base">{t.home.pricing.note}</p>
          </div>
        </div>
      </section>

      {/* Featured Topics - scannable */}
      <section className="bg-surface py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-brand-900 sm:text-3xl md:text-4xl lg:mb-12 lg:text-5xl">
            {t.home.guides.heading}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                href="/blog"
                className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-3 text-xl font-bold text-brand-900 transition-colors group-hover:text-link-600">
                  {guide.title}
                </h3>
                <p className="mb-4 leading-relaxed text-ink-600">{guide.description}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-link-600 transition-all group-hover:gap-3">
                  {t.home.guides.cta}
                  <ArrowRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process overview */}
      <section className="bg-white py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-brand-900 md:text-4xl">{t.home.process.heading}</h2>
            <p className="text-ink-600">{t.home.process.description}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-line-200 bg-neutral-50 p-8 shadow-soft transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cta-600/10 text-cta-600 font-semibold dark:bg-cta-600/20 dark:text-accent-400">
                  0{index + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-900">{step.title}</h3>
                <p className="leading-relaxed text-ink-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-neutral-50 py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-brand-900 md:text-4xl">{t.home.guarantees.heading}</h2>
            <p className="text-ink-600">{t.home.guarantees.description}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {guarantees.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-line-200 bg-white p-8 shadow-soft transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cta-600/10 text-cta-600 dark:bg-cta-600/20 dark:text-accent-400">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-900">{item.title}</h3>
                <p className="leading-relaxed text-ink-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Micro CTA - document review */}
      <section className="bg-blue-50 py-12 transition-colors duration-300 dark:bg-slate-900 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-brand-900 dark:text-slate-100 md:text-4xl">
            {t.home.microCta.heading}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-ink-900 dark:text-slate-200">
            {t.home.microCta.description}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${firmInfo.email}`}
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg bg-brand-900 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <Mail size={24} />
              {t.home.microCta.actions.email}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border-2 border-line-200 bg-surface px-8 py-4 text-lg font-semibold text-brand-900 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              {t.home.microCta.actions.schedule}
            </Link>
          </div>
          <p className="mt-6 text-sm text-ink-600 dark:text-slate-300">{t.home.microCta.confidentiality}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-12 transition-colors duration-300 dark:bg-slate-950 md:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center font-serif text-3xl font-bold text-brand-900 md:text-4xl">
            {t.home.faqs.heading}
          </h2>
          <p className="mb-10 text-center text-ink-600 dark:text-slate-300">{t.home.faqs.description}</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-line-200 bg-white shadow-soft transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 dark:text-slate-100"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-brand-900">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-ink-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
    </div>
  );
};
