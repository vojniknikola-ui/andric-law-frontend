'use client'
import { Star, Quote } from 'lucide-react'

export const SocialProof: React.FC = () => {
  const testimonials = [
    { name: 'Marko P.', role: 'IT Profesionalac', content: 'Odličan advokat za IT ugovore. Brzo i profesionalno riješio moj slučaj sa MSA ugovorom.', rating: 5 },
    { name: 'Ana M.', role: 'Menadžer', content: 'Preporučujem! Pomogao mi je sa otkazom i dobio sam sve što mi pripada.', rating: 5 },
    { name: 'Dejan K.', role: 'Preduzetnik', content: 'Stručna pomoć pri osnivanju firme. Sve je bilo jasno i transparentno.', rating: 5 }
  ]

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.name}
          className="glass-card group rounded-3xl p-8 hover-lift animate-scale-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <Quote className="mb-6 h-10 w-10 text-blue-400 opacity-50" />
          <div className="mb-6 flex gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="mb-6 leading-relaxed text-gray-300 text-lg">
            "{testimonial.content}"
          </p>
          <div className="border-t border-white/10 pt-6">
            <p className="font-bold text-white text-lg">{testimonial.name}</p>
            <p className="text-sm text-gray-400">{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
