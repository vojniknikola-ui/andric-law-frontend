'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building,
  CheckCircle2,
  ChevronDown,
  FileText,
  Gavel,
  Handshake,
  Home as HomeIcon,
  Mail as MailIcon,
  PhoneCall,
  ShieldCheck,
  Timer,
  Users,
  X,
  ArrowRight
} from 'lucide-react';
import { firmInfo } from '@/lib/firmInfo';

interface Service {
  icon: React.ReactElement;
  title: string;
  description: string;
  highlights: string[];
  details: string[];
}

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Usluge - Advokatska kancelarija Sarajevo | Andrić Law';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Pravne usluge u Sarajevu: privredno pravo, radno pravo, porodično pravo, ugovorno pravo, sudsko zastupanje. Advokatska kancelarija Andrić Law.');
    }
  }, []);

  const services: Service[] = [
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: 'Privredno pravo',
      description: 'Kompletna pravna podrška za d.o.o., akcionarska društva i startape u svim fazama rasta.',
      highlights: [
        'Izrada i revizija osnivačkih akata i statuta',
        'Due diligence prije investicija i akvizicija',
        'Priprema i pregovaranje ključnih komercijalnih ugovora'
      ],
      details: [
        'Osnivanje i registracija privrednih društava svih oblika',
        'Upravljanje korporativnim promjenama i priprema skupština',
        'Konsultacije za investicije, M&A i venture capital aranžmane',
        'Usklađivanje sa propisima (compliance) i interni pravilnici',
        'Zastupanje u trgovačkim i privrednim sporovima',
        'Izrada ugovora sa dobavljačima, distributerima i partnerima',
        'Savjetovanje o zaštiti poslovnih tajni i intelektualne svojine'
      ]
    },
    {
      icon: <HomeIcon className="w-12 h-12" />,
      title: 'Imovinsko pravo',
      description: 'Sigurne transakcije nekretninama i zaštita vlasničkih prava uz sproveden due diligence.',
      highlights: [
        'Analiza zemljišnih knjiga i tereta',
        'Ugovori o kupoprodaji i zakupu',
        'Rješavanje sporova u vezi sa vlasništvom i granicama'
      ],
      details: [
        'Priprema preliminarnih i glavnih ugovora o kupoprodaji',
        'Izrada ugovora o zakupu, najmu i korištenju prostora',
        'Provjera pravnog statusa nekretnina i tereta (due diligence)',
        'Zastupanje u ostavinskim i nasljednim postupcima',
        'Podjela suvlasničke imovine i uređenje susjedskih odnosa',
        'Upis i brisanje prava u zemljišnim knjigama',
        'Reševanje imovinskih sporova pred sudovima i arbitražom'
      ]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Porodično pravo',
      description: 'Diskretna i efikasna zaštita porodice uz fokus na dogovor, medijaciju i dobrobit djece.',
      highlights: [
        'Sporazumni i parnični razvodi',
        'Planovi starateljstva i alimentacije',
        'Medijacija prije sudskog postupka'
      ],
      details: [
        'Razvod braka: sporazumni, parnični i međunarodni elementi',
        'Izrada plana roditeljstva, starateljstva i kontakata sa djecom',
        'Zastupanje u postupcima za alimentaciju i izmjene iznosa',
        'Medijacija i vansudska nagodba prije pokretanja parnice',
        'Zaštita od nasilja u porodici i hitne mjere',
        'Uređivanje imovinskih odnosa i bračne stečevine',
        'Pravna podrška vanbračnim zajednicama'
      ]
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Ugovorno pravo',
      description: 'Ugovori pisani jasnim jezikom, sa balansiranim obavezama i zaštitom ključnih interesa.',
      highlights: [
        'Pravna analiza postojećih ugovora',
        'Pregovaranje risk klauzula',
        'Usklađivanje sa regulativama i GDPR-om'
      ],
      details: [
        'Izrada ugovora o djelu, uslugama, licencama i distribuciji',
        'Redlining i revizija ugovora koje dostavljaju partneri',
        'Pregovaranje komercijalnih i pravnih uslova',
        'Kreiranje šablona ugovora i internih procedura',
        'Rješavanje ugovornih sporova i naknada štete',
        'Savjetovanje o digitalnim ugovorima i e-trgovini',
        'Pravna podrška u slučajevima raskida ugovora'
      ]
    },
    {
      icon: <Gavel className="w-12 h-12" />,
      title: 'Sudsko zastupanje',
      description: 'Iskusan tim za kompleksne parnice, arbitraže i izvršne postupke svih instanci.',
      highlights: [
        'Strategija spora i procjena rizika',
        'Priprema podnesaka i dokaza',
        'Vansudske nagodbe gdje je to u vašem interesu'
      ],
      details: [
        'Parnične i upravne parnice, uključujući privredne sporove',
        'Izvršni i prekršajni postupci, uključujući žalbe',
        'Zastupanje pred višim sudovima i arbitražama',
        'Priprema tužbi, odgovora, žalbi i vanrednih pravnih lijekova',
        'Strategija prikupljanja dokaza i svjedočenja',
        'Vođenje pregovora za vansudsko rješenje',
        'Procjena troškova i rizika prije pokretanja spora'
      ]
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: 'Radno pravo',
      description: 'Savjetujemo poslodavce i zaposlene o pravima, obavezama i rješavanju radnih sporova.',
      highlights: [
        'Izrada kompletnog HR pravnog okvira',
        'Zaštita zaposlenih od nezakonitog otkaza',
        'Compliance pregled i edukacija HR timova'
      ],
      details: [
        'Izrada ugovora o radu, pravilnika i aneksa',
        'Savjetovanje pri otkazima i disciplinskim postupcima',
        'Zastupanje u radnim sporovima i pregovorima sa sindikatima',
        'Prevencija mobinga i diskriminacije na radnom mjestu',
        'Procjena rizika prilikom reorganizacija i M&A',
        'Postupci za naknadu štete zbog povrede na radu',
        'Programi edukacije za menadžment i HR timove'
      ]
    }
  ];

  const processSteps = [
    {
      title: 'Uvodni poziv',
      description: 'U 20 minuta mapiramo situaciju, ciljeve i dogovaramo naredne korake.'
    },
    {
      title: 'Strategija i ponuda',
      description: 'Dobijate plan rada, vremenski okvir i jasan troškovnik – bez skrivenih stavki.'
    },
    {
      title: 'Realizacija i podrška',
      description: 'Izvršavamo dogovorene aktivnosti i ostajemo dostupni tokom cijelog procesa.'
    }
  ];

  const guarantees = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-cta-600" />,
      title: 'Transparentnost',
      description: 'Svi troškovi i rokovi isporuke dogovaraju se prije početka saradnje.'
    },
    {
      icon: <Handshake className="w-6 h-6 text-cta-600" />,
      title: 'Partnerstvo',
      description: 'Radimo rame uz rame s vašim timom i proaktivno predlažemo poboljšanja.'
    },
    {
      icon: <Timer className="w-6 h-6 text-cta-600" />,
      title: 'Brz odgovor',
      description: 'Garantujemo inicijalni odgovor u roku od 24 sata na sve upite.'
    }
  ];

  const faqs = [
    {
      question: 'Koliko traje angažman nakon inicijalne konsultacije?',
      answer:
        'U prosjeku, analizu ugovora završavamo u roku od 3–5 radnih dana, dok za složenije sudske predmete dobijate plan rada sa jasno definisanim prekretnicama.'
    },
    {
      question: 'Radite li sa startapovima i freelancerima?',
      answer:
        'Da. Imamo paket usluga prilagođen ranim fazama razvoja – od osnovnih ugovora, preko NDA i ESOP programa, do pregovora sa investitorima.'
    },
    {
      question: 'Na koji način fakturišete?',
      answer:
        'Fleksibilni smo: radimo po satu, po projektu ili putem mjesečnog retainer modela, zavisno od ciljeva i obima posla.'
    }
  ];

  const phoneHref = `tel:${firmInfo.phone.replace(/[^0-9+]/g, '')}`;
  const mailHref = `mailto:${firmInfo.email}`;

  return (
    <div>
      <section
        className="relative isolate overflow-hidden text-white transition-colors duration-300 dark:text-slate-100"
        style={{
          backgroundImage: "url('/images/hero-balance.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-900/80 mix-blend-multiply transition-opacity duration-500 dark:bg-slate-950/85" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center backdrop-blur-[1px] sm:px-6 md:py-28 lg:py-32">
          <span className="text-white font-semibold text-sm uppercase tracking-[0.4em] animate-hero">Pravne usluge</span>
          <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-2 font-serif text-white drop-shadow-lg animate-hero animation-delay-200">
            Naše usluge
          </h1>
          <p className="text-balance text-lg text-white max-w-3xl mx-auto animate-hero animation-delay-400 md:text-xl lg:text-2xl">
            Sveobuhvatna pravna podrška za kompanije, startape i pojedince – strateški vođena, transparentna i fokusirana na rezultat.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero animation-delay-400">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 bg-cta-600 hover:bg-cta-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <PhoneCall className="w-5 h-5" />
              Pozovi odmah
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              <MailIcon className="w-5 h-5" />
              Pošalji upit
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="card p-8 border border-line-200 group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedService(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedService(service);
                  }
                }}
                aria-label={`Detalji usluge ${service.title}`}
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-cta-600/10 text-cta-600 group-hover:bg-cta-600/20 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-3 font-serif">{service.title}</h3>
                <p className="text-ink-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-ink-600">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-cta-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-link-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Saznaj više</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 font-serif">Kako izgleda saradnja</h2>
            <p className="text-ink-600">Kroz jasno definisane faze vodimo vas od inicijalnog razgovora do kompletne realizacije i praćenja rezultata.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="p-8 bg-neutral-50 rounded-3xl shadow-soft border border-line-200">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cta-600/10 text-cta-600 font-semibold mb-4">0{index + 1}</div>
                <h3 className="text-xl font-semibold text-brand-900 mb-2">{step.title}</h3>
                <p className="text-ink-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 font-serif">Zašto klijenti biraju nas</h2>
            <p className="text-ink-600">Kombinujemo pravnu ekspertizu, poslovno razumijevanje i proaktivan pristup svakom predmetu.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((item) => (
              <div key={item.title} className="p-8 bg-white border border-line-200 rounded-3xl shadow-soft">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cta-600/10 text-cta-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-ink-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6 font-serif text-center">Česta pitanja</h2>
          <p className="text-ink-600 text-center mb-10">Ako ne vidite odgovor koji tražite, pišite nam – odgovaramo u roku od 24 sata.</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="rounded-2xl border border-line-200 bg-neutral-50 shadow-soft">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-brand-900 font-semibold">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-ink-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-ink-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card p-12 text-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white animate-hero">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Ne vidite ono što tražite?</h2>
            <p className="text-xl mb-8 text-white animate-hero animation-delay-200">
              Javljamo se u roku od jednog radnog dana i predlažemo plan koji odgovara vašim prioritetima.
            </p>
            <Link
              href="/contact"
              className="btn-secondary inline-block transition-transform duration-300 hover:-translate-y-1"
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </section>

      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedService(null)}>
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-hard animate-slideUp"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white p-8 rounded-t-2xl animate-hero">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 text-white hover:text-accent-400 transition-colors"
                aria-label="Zatvori detalje usluge"
              >
                <X size={28} />
              </button>
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white">
                {selectedService.icon}
              </div>
              <h2 className="text-4xl font-bold font-serif mb-2 animate-hero animation-delay-200">{selectedService.title}</h2>
              <p className="text-white text-lg animate-hero animation-delay-400">{selectedService.description}</p>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-brand-900 mb-6 font-serif">Šta je uključeno</h3>
              <ul className="space-y-4">
                {selectedService.details.map((detail, idx) => (
                  <li key={detail} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-cta-600/10 text-cta-600 rounded-full flex items-center justify-center font-semibold mt-1 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <p className="text-ink-900 text-lg leading-relaxed pt-1">{detail}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 p-6 bg-neutral-50 rounded-xl border-l-4 border-cta-600/30">
                <p className="text-ink-900 leading-relaxed mb-4">
                  <strong className="text-brand-900">Trebate pomoć u ovoj oblasti?</strong>
                  <br />
                  Kontaktirajte nas za detaljnu konsultaciju i saznajte kako možemo zaštititi vaše interese.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 bg-cta-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-cta-700 transition-transform duration-300 hover:-translate-y-0.5"
                    onClick={() => setSelectedService(null)}
                  >
                    <PhoneCall className="w-5 h-5" />
                    Pozovi nas
                  </a>
                  <Link
                    href="/contact"
                    className="btn-secondary inline-flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"
                    onClick={() => setSelectedService(null)}
                  >
                    <MailIcon className="w-5 h-5" />
                    Piši nam
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
