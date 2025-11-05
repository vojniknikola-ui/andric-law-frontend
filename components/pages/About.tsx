'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Award, BookOpen, Users, Target, Facebook, Linkedin } from 'lucide-react';
import { firmInfo } from '@/lib/firmInfo';

export const About: React.FC = () => {
  const facebookUrl = firmInfo.socials?.facebook ?? '#';
  const linkedinUrl = firmInfo.socials?.linkedin ?? '#';
  const facebookDisabled = facebookUrl === '#';
  const linkedinDisabled = linkedinUrl === '#';

  useEffect(() => {
    document.title = 'O nama - Andrić Law | Advokat Nikola Andrić';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Upoznajte advokata Nikolu Andrića i naš tim. Fokus na radno pravo, IT ugovore i praktična rješenja za kompanije i pojedince.',
      );
    }
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-16 -mt-16 mb-16">
          <div className="max-w-4xl mx-auto px-4 text-center pt-12">
            <span className="text-white/90 font-semibold text-sm uppercase tracking-[0.3em] animate-hero">O nama</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-2 font-serif text-white drop-shadow-lg animate-hero animation-delay-200">Naša priča</h1>
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed animate-hero animation-delay-400">Upoznajte naš tim i našu misiju - posvećeni vašim pravnim potrebama</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 mb-16">
          <div className="card p-8 animate-hero">
            <h2 className="text-3xl font-bold text-brand-900 mb-6 font-serif">Osnivač i principal</h2>
            <h3 className="text-2xl font-semibold text-link-600 mb-4">{firmInfo.founder}</h3>
            <p className="text-ink-900 mb-4 leading-relaxed">
              {firmInfo.founder} je osnivač i principal advokatskog ureda {firmInfo.name}. 
              Sa višegodišnjim iskustvom u različitim oblastima prava, pruža stručnu 
              pravnu pomoć i savjetovanje klijentima.
            </p>
            <p className="text-ink-900 leading-relaxed">
              Naš pristup je zasnovan na profesionalnosti, transparentnosti i posvećenosti 
              interesima naših klijenata. Vjerujemo u izgradnju dugoроčnih odnosa zasnovanih 
              na povjerenju i rezultatima.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 border border-line-200 rounded-lg transition-all ${facebookDisabled ? 'text-ink-400 cursor-not-allowed' : 'text-link-600 hover:text-link-600/80 hover:-translate-y-0.5'}`}
                aria-disabled={facebookDisabled}
                tabIndex={facebookDisabled ? -1 : 0}
                onClick={facebookDisabled ? (event) => event.preventDefault() : undefined}
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 border border-line-200 rounded-lg transition-all ${linkedinDisabled ? 'text-ink-400 cursor-not-allowed' : 'text-link-600 hover:text-link-600/80 hover:-translate-y-0.5'}`}
                aria-disabled={linkedinDisabled}
                tabIndex={linkedinDisabled ? -1 : 0}
                onClick={linkedinDisabled ? (event) => event.preventDefault() : undefined}
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8 animate-hero animation-delay-200">
            <figure className="relative overflow-hidden rounded-3xl shadow-medium aspect-[4/5] bg-gradient-to-br from-primary-900 to-primary-700">
              <img
                src={firmInfo.founderImage}
                alt={firmInfo.founder}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(event) => {
                  (event.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-900/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Founder & Principal</p>
                <h3 className="text-2xl font-serif font-semibold">{firmInfo.founder}</h3>
              </figcaption>
            </figure>

            <div className="card bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 font-serif">Naše vrijednosti</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Profesionalnost</h4>
                    <p className="text-white/95">Najviši standardi pravne prakse</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BookOpen className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Stručnost</h4>
                    <p className="text-white/95">Kontinuirano usavršavanje i praćenje propisa</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Posvećenost</h4>
                    <p className="text-white/95">Vaši interesi su naš prioritet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Rezultati</h4>
                    <p className="text-white/95">Fokusirani na postizanje najboljih ishoda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center p-10 border-t-4 border-accent-500">
            <div className="text-2xl font-bold text-link-600 mb-3 font-serif">Radno pravo & HR</div>
            <p className="text-ink-700 leading-relaxed">
              Savjetovanje poslodavaca i zaposlenih kroz ugovore, otkaze i interne politike.
            </p>
          </div>
          <div className="card text-center p-10 border-t-4 border-accent-500">
            <div className="text-2xl font-bold text-link-600 mb-3 font-serif">IT ugovori</div>
            <p className="text-ink-700 leading-relaxed">
              MSA/SOW dokumenti, licenciranje i outsourcing aranžmani prilagođeni digitalnim timovima.
            </p>
          </div>
          <div className="card text-center p-10 border-t-4 border-accent-500">
            <div className="text-2xl font-bold text-link-600 mb-3 font-serif">Sporovi & pregovori</div>
            <p className="text-ink-700 leading-relaxed">
              Strategija za vansudska rješenja i zastupanje u sudskim postupcima kada je to potrebno.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-12 text-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white animate-hero">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Spremni smo da vam pomognemo
          </h2>
          <p className="text-xl text-white mb-8 animate-hero animation-delay-200">
            Kontaktirajte nas danas za besplatnu inicijalnu konsultaciju
          </p>
          <Link
            href="/contact"
            className="btn-secondary inline-block transition-transform duration-300 hover:-translate-y-1"
          >
            Zakažite sastanak
          </Link>
        </div>
      </div>
    </div>
  );
};
