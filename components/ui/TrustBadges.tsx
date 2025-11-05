'use client'
import { Shield, Award, Clock, Users } from 'lucide-react'
import { ModernCard } from './ModernCard'

interface TrustBadge {
  icon: React.ReactNode
  title: string
  description: string
}

export const TrustBadges: React.FC = () => {
  const badges: TrustBadge[] = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: '100% Povjerljivo',
      description: 'Vaši podaci su zaštićeni'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: '10+ Godina',
      description: 'Iskustva u praksi'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Brz Odgovor',
      description: 'Odgovaramo u 24h'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: '500+ Klijenata',
      description: 'Zadovoljnih klijenata'
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {badges.map((badge, index) => (
        <ModernCard
          key={badge.title}
          variant="glass"
          padding="md"
          className="text-center"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cta-600 to-cta-700 text-white">
            {badge.icon}
          </div>
          <h3 className="mb-1 font-bold text-brand-900 dark:text-slate-100">{badge.title}</h3>
          <p className="text-sm text-ink-600 dark:text-slate-300">{badge.description}</p>
        </ModernCard>
      ))}
    </div>
  )
}
