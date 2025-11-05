'use client'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  hover = true 
}) => {
  return (
    <div 
      className={`
        backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 
        border border-white/20 dark:border-slate-700/50
        rounded-2xl shadow-xl
        ${hover ? 'transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
