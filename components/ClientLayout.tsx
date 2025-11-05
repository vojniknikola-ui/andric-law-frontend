'use client'

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Menu, X, MapPin, Sun, Moon } from 'lucide-react';
import { firmInfo } from '@/lib/firmInfo';
import { useDarkMode } from '@/lib/hooks/useDarkMode';
import { LanguageToggle } from './LanguageToggle';
import { useTranslations } from '@/lib/i18n/useTranslations';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useDarkMode();
  const isDark = theme === 'dark';
  const { t } = useTranslations();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const navLinks = useMemo(
    () => [
      { path: '/', label: t.layout.nav.home },
      { path: '/services', label: t.layout.nav.services },
      { path: '/about', label: t.layout.nav.about },
      { path: '/glossary', label: t.layout.nav.glossary },
      { path: '/blog', label: t.layout.nav.blog },
      { path: '/contact', label: t.layout.nav.contact },
    ],
    [t],
  );

  const isActive = (path: string) => pathname === path;
  const phoneHref = `tel:${firmInfo.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-ink-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Top Bar */}
      <div className="bg-brand-900 px-4 py-3 text-white transition-colors duration-300 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
          <div className="flex gap-6">
            <a
              href={phoneHref}
              className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              <Phone size={16} className="text-cta-600" />
              <span className="font-medium">{firmInfo.phone}</span>
            </a>
            <a
              href={`mailto:${firmInfo.email}`}
              className="hidden items-center gap-2 transition-colors duration-200 hover:text-white md:flex"
            >
              <Mail size={16} className="text-cta-600" />
              <span className="font-medium">{firmInfo.email}</span>
            </a>
          </div>
          <div className="hidden font-medium md:block">{t.layout.topBar.workingHours}</div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 border-b border-line-200 bg-white shadow-medium transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:h-24 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 md:gap-3 flex-shrink-0">
            <img
              src={firmInfo.logo}
              alt={`${firmInfo.name} logo`}
              className="h-8 w-auto md:h-10 lg:h-12"
              width="40"
              height="40"
            />
            <div className="font-serif text-xl font-bold tracking-tight text-brand-900 transition-colors duration-200 group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-slate-300 md:text-2xl lg:text-3xl">
              {firmInfo.name}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`rounded-lg px-4 py-2.5 font-semibold text-base transition-all duration-200 xl:px-5 ${
                  isActive(link.path)
                    ? 'bg-brand-900 text-white dark:bg-slate-700'
                    : 'text-ink-900 hover:bg-blue-50 hover:text-brand-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            <LanguageToggle />
            
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-ink-900 transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-900 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
              aria-label={isDark ? t.layout.aria.themeToggle.toLight : t.layout.aria.themeToggle.toDark}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-ink-900 transition-all duration-200 hover:bg-gray-200 lg:hidden dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label={t.layout.aria.menuToggle}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-line-200 bg-white py-4 dark:border-slate-700 dark:bg-slate-900">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 transition-colors ${
                  isActive(link.path)
                    ? 'bg-gray-50 text-brand-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-ink-900 hover:bg-gray-50 hover:text-brand-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${firmInfo.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-green-500 p-5 text-white shadow-hard transition-all duration-300 hover:scale-110 hover:bg-green-600"
        aria-label={t.layout.aria.whatsapp}
      >
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">{firmInfo.name}</h3>
              <p className="text-sm text-white/90 mb-3">
                {t.layout.footer.founderPrefix} <span className="font-semibold">{firmInfo.founder}</span>
              </p>
              <p className="text-sm text-white/80 mb-4">{t.layout.footer.barAssociation}</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">{t.layout.footer.contact}</h4>
              <div className="space-y-2 text-sm text-white/90">
                <p className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{firmInfo.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="flex-shrink-0" />
                  <a href={phoneHref} className="hover:text-white transition">
                    {firmInfo.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} className="flex-shrink-0" />
                  <a href={`mailto:${firmInfo.email}`} className="hover:text-white transition">
                    {firmInfo.email}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">{t.layout.footer.quickLinks}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-white/90">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path} className="hover:text-white transition">
                    {link.label}
                  </Link>
                ))}
                <Link href="/privacy" className="hover:text-white transition">
                  {t.layout.footer.privacyShort}
                </Link>
                <Link href="/terms" className="hover:text-white transition">
                  {t.layout.footer.termsShort}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center">
            <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} {firmInfo.name}. {t.layout.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
