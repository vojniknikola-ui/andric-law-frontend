'use client'
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface ModernCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'hover-lift'
  padding?: 'sm' | 'md' | 'lg'
}

export const ModernCard = forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all duration-300'
    
    const variants = {
      default: 'bg-white dark:bg-slate-800 shadow-soft hover:shadow-medium',
      glass: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg',
      gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 shadow-xl',
      'hover-lift': 'bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-2'
    }
    
    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ModernCard.displayName = 'ModernCard'
