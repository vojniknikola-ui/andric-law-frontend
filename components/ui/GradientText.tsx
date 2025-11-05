'use client'
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  gradient?: 'blue' | 'purple' | 'gold' | 'brand'
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  gradient = 'brand',
  ...props
}) => {
  const gradients = {
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    purple: 'bg-gradient-to-r from-purple-600 to-pink-500',
    gold: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    brand: 'bg-gradient-to-r from-cta-600 to-accent-500'
  }

  return (
    <span
      className={cn(
        'bg-clip-text text-transparent font-bold',
        gradients[gradient],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
