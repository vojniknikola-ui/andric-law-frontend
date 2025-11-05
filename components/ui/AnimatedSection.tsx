'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale'
  delay?: number
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fade',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const animations = {
    fade: 'opacity-0 transition-opacity duration-700',
    'slide-up': 'opacity-0 translate-y-12 transition-all duration-700',
    'slide-left': 'opacity-0 translate-x-12 transition-all duration-700',
    'slide-right': 'opacity-0 -translate-x-12 transition-all duration-700',
    scale: 'opacity-0 scale-95 transition-all duration-700'
  }

  const visibleState = {
    fade: 'opacity-100',
    'slide-up': 'opacity-100 translate-y-0',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0',
    scale: 'opacity-100 scale-100'
  }

  return (
    <div
      ref={ref}
      className={cn(
        animations[animation],
        isVisible && visibleState[animation],
        className
      )}
    >
      {children}
    </div>
  )
}
