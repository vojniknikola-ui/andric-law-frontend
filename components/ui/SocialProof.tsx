'use client'
import { Star, Quote } from 'lucide-react'
import { ModernCard } from './ModernCard'

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export const SocialProof: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Marko P.',
      role: 'IT Profesionalac',
      content: 'Odličan advokat za IT ugovore. Brzo i profesionalno riješio moj slučaj sa MSA ugovorom.',
      rating: 5
    },
    {
      name: 'Ana M.',
      role: 'Menadžer',
      content: 'Preporučujem! Pomogao mi je sa otkazom i dobio sam sve što mi pripada.',
      rating: 5
    },
    {
      name: 'Dejan K.',
      role: 'Preduzetnik',
      content: 'Stručna pomoć pri osnivanju firme. Sve je bilo jasno i transparentno.',
      rating: 5
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <ModernCard
          key={testimonial.name}
          variant="hover-lift"
          padding="lg"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <Quote className="mb-4 h-8 w-8 text-cta-600 dark:text-cta-400" />
          <div className="mb-4 flex gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="mb-4 leading-relaxed text-ink-700 dark:text-slate-200">
            "{testimonial.content}"
          </p>
          <div className="border-t border-gray-200 pt-4 dark:border-slate-700">
            <p className="font-bold text-brand-900 dark:text-slate-100">{testimonial.name}</p>
            <p className="text-sm text-ink-600 dark:text-slate-300">{testimonial.role}</p>
          </div>
        </ModernCard>
      ))}
    </div>
  )
}
