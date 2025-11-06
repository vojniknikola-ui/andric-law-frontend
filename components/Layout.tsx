'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Mail, Menu, X, MapPin, Sun, Moon, Sparkles } from 'lucide-react'
import { firmInfo } from '@/lib/firmInfo'
import { useDarkMode } from '@/lib/hooks/useDarkMode'
import { LanguageToggle } from './LanguageToggle'
import { useTranslations } from '@/lib/i18n/useTranslations'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useDarkMode()
  const isDark = theme === 'dark'
  const { t } = useTranslations()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: t.layout.nav.home },
    { path: '/services', label: t.layout.nav.services },
    { path: '/about', label: t.layout.nav.about },
    { path: '/glossary', label: t.layout.nav.glossary },
    { path: '/blog', label: t.layout.nav.blog },
    { path: '/contact', label: t.layout.nav.contact },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-mesh">
      {/* Premium Top Bar */}
      <div className="glass-card border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-6">
              <a href={`tel:${firmInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                <Phone size={16} className="animate-pulse" />
                <span className="font-semibold">{firmInfo.phone}</span>
              </a>
              <a href={`mailto:${firmInfo.email}`} className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                <Mail size={16} />
                <span className="font-semibold">{firmInfo.email}</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2 text-gray-300">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="font-medium">{t.layout.topBar.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card shadow-2xl' : ''}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={firmInfo.logo} alt={firmInfo.name} className="relative h-12 w-12 rounded-full" />
              </div>
              <div className="font-serif text-2xl font-bold text-gradient">
                {firmInfo.name}
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isActive(link.path) && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-glow"></span>
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <button
                onClick={toggleTheme}
                className="glass-card p-2.5 rounded-lg hover:scale-110 transition-transform"
              >
                {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-400" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden glass-card p-2.5 rounded-lg"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden glass-card border-t border-white/10 animate-slide-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 transition-colors ${
                  isActive(link.path) ? 'text-blue-400 bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-1" id="main-content">{children}</main>

      {/* Premium WhatsApp Button */}
      <a
        href={`https://wa.me/${firmInfo.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 glass-card p-4 rounded-full hover:scale-110 transition-all duration-300 neon-glow group"
      >
        <svg className="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 items-center justify-center text-xs font-bold">!</span>
        </span>
      </a>

      {/* Premium Footer */}
      <footer className="glass-card border-t border-white/10 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="animate-fade-in">
              <h3 className="font-serif text-2xl font-bold text-gradient mb-4">{firmInfo.name}</h3>
              <p className="text-gray-300 mb-4">
                {t.layout.footer.founderPrefix} <span className="font-semibold text-blue-400">{firmInfo.founder}</span>
              </p>
              <div className="flex gap-3">
                <a href={firmInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="glass-card p-3 rounded-lg hover:scale-110 transition-transform">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href={firmInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="glass-card p-3 rounded-lg hover:scale-110 transition-transform">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-bold text-white mb-4">{t.layout.footer.contact}</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start gap-2">
                  <MapPin size={18} className="text-blue-400 mt-1" />
                  <span>{firmInfo.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} className="text-blue-400" />
                  <a href={`tel:${firmInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-400 transition-colors">
                    {firmInfo.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={18} className="text-blue-400" />
                  <a href={`mailto:${firmInfo.email}`} className="hover:text-blue-400 transition-colors">
                    {firmInfo.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-lg font-bold text-white mb-4">{t.layout.footer.quickLinks}</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} {firmInfo.name}. {t.layout.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
