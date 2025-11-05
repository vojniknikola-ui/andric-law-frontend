'use client'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, iconPosition = 'left', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-gradient-to-r from-cta-600 to-cta-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
      secondary: 'bg-white dark:bg-slate-800 text-brand-900 dark:text-slate-100 border-2 border-gray-200 dark:border-slate-600 hover:border-cta-600 dark:hover:border-cta-400 hover:scale-105',
      ghost: 'bg-transparent text-brand-900 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="transition-transform group-hover:scale-110">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      </button>
    )
  }
)

ModernButton.displayName = 'ModernButton'
