'use client'
import { Shield, Award, Clock, Users } from 'lucide-react'

export const TrustBadges: React.FC = () => {
  const badges = [
    { icon: <Shield className="h-8 w-8" />, title: '100% Povjerljivo', description: 'Vaši podaci su zaštićeni' },
    { icon: <Award className="h-8 w-8" />, title: '10+ Godina', description: 'Iskustva u praksi' },
    { icon: <Clock className="h-8 w-8" />, title: 'Brz Odgovor', description: 'Odgovaramo u 24h' },
    { icon: <Users className="h-8 w-8" />, title: '500+ Klijenata', description: 'Zadovoljnih klijenata' }
  ]

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {badges.map((badge, index) => (
        <div
          key={badge.title}
          className="glass-card group rounded-2xl p-6 text-center hover-lift animate-scale-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl transition-all duration-300 group-hover:scale-110 neon-glow">
            {badge.icon}
          </div>
          <h3 className="mb-2 font-bold text-white text-lg">{badge.title}</h3>
          <p className="text-sm text-gray-400">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}
