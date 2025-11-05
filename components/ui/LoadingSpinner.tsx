'use client'
import { cn } from '@/lib/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-cta-600 border-t-transparent',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Učitavanje"
    >
      <span className="sr-only">Učitavanje...</span>
    </div>
  )
}
