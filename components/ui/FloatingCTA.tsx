'use client'
import { useState, useEffect } from 'react'
import { Phone, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface FloatingCTAProps {
  phoneNumber: string
  text?: string
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ phoneNumber, text = 'Pozovite nas' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isDismissed) return null

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-all duration-500',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      )}
    >
      <div className="relative group">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Zatvori"
        >
          <X size={14} />
        </button>
        <a
          href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
          className="flex items-center gap-3 rounded-full bg-gradient-to-r from-cta-600 to-cta-700 px-6 py-4 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
        >
          <Phone size={24} className="animate-pulse" />
          <span className="font-semibold">{text}</span>
        </a>
      </div>
    </div>
  )
}
