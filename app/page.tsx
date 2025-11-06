"use client";

import { useRef } from "react";
import {
  Scale,
  FileText,
  Briefcase,
  ShieldCheck,
  Handshake,
  Gavel,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Clock,
  MessageSquare,
} from "lucide-react";
import { firmInfo } from '@/lib/firmInfo';
import SearchBoxLazy from '@/components/SearchBoxLazy';

export default function AndricLawLanding() {
  const kontaktRef = useRef<HTMLDivElement>(null);

  const scrollToKontakt = () => {
    kontaktRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-930 to-slate-900 text-slate-100 selection:bg-emerald-300/30 selection:text-emerald-950">
      {/* Top nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50 bg-slate-950/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-wider text-slate-100">ANDRIĆ LAW</a>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#usluge" className="hover:text-emerald-300 transition">Usluge</a>
            <a href="#kako-radimo" className="hover:text-emerald-300 transition">Kako radimo</a>
            <a href="#faq" className="hover:text-emerald-300 transition">FAQ</a>
            <button onClick={scrollToKontakt} className="inline-flex items-center gap-2 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-emerald-950 font-semibold px-4 py-2 transition">
              <Phone className="size-4" /> Zakaži konsultacije
            </button>
          </nav>
          <a
            href={`tel:${firmInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="md:hidden inline-flex items-center gap-2 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-emerald-950 font-semibold px-3 py-2 transition"
          >
            <Phone className="size-4" /> Pozovi
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-emerald-500/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col items-start gap-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <Clock className="size-3" /> Odgovor u 24h · Pisano mišljenje u 72h
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Pravni partner za <span className="text-emerald-300">biznis u BiH</span>
            </h1>
            <p className="max-w-2xl text-slate-300 text-lg">
              Specijalizirani za radno pravo, IT ugovore i privredno pravo. Stručno, precizno i brzo — bez agresivnog marketinga, sa fokusom na rezultat.
            </p>
            <div className="w-full max-w-2xl mb-4">
              <SearchBoxLazy />
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={scrollToKontakt} className="group inline-flex items-center gap-2 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-emerald-950 font-semibold px-5 py-3 transition">
                Zakaži konsultacije <ChevronRight className="size-4 transition group-hover:translate-x-0.5" />
              </button>
              <a href="#usluge" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition">
                Pogledaj usluge
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Sarajevo</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">FBiH · RS · Brčko</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Advokatski ured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 border-y border-white/10 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <Scale className="size-5 text-emerald-300" />
            <div>
              <p className="font-medium">Usko specijalizirani</p>
              <p className="text-slate-400">Radno pravo · IT ugovori · Privreda</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-emerald-300" />
            <div>
              <p className="font-medium">Transparentne tarife</p>
              <p className="text-slate-400">Jasno prije angažmana</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-emerald-300" />
            <div>
              <p className="font-medium">Dokaziva stručnost</p>
              <p className="text-slate-400">Članci i pravne analize</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usluge */}
      <section id="usluge" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Usluge</h2>
          <p className="mt-3 max-w-2xl text-slate-300">Konzistentan pristup i jasna dokumentacija, prilagođeno kompanijama i osnivačima.</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Briefcase className="size-5" />}
              title="Radno pravo"
              items={["Ugovori o radu i aneksi", "Knjige i pravilnici", "Otkazi i disciplinski postupci"]}
            />
            <ServiceCard
              icon={<FileText className="size-5" />}
              title="Ugovori i IT"
              items={["MSA / SOW / NDA", "SaaS / licenciranje", "DPAs / GDPR klauzule"]}
            />
            <ServiceCard
              icon={<Handshake className="size-5" />}
              title="Privredno pravo"
              items={["Osnivanje i statusne promjene", "Upravljanje i skupštine", "Dioničari i udjeli"]}
            />
            <ServiceCard
              icon={<Gavel className="size-5" />}
              title="Sporovi i zastupanje"
              items={["Parnice i ostavinski postupci", "Radni sporovi", "Arbitraža i mirenje"]}
            />
            <ServiceCard
              icon={<ShieldCheck className="size-5" />}
              title="Compliance i HR"
              items={["Interni akti i politike", "Onboarding i performanse", "Procjena rizika"]}
            />
            <ServiceCard
              icon={<Scale className="size-5" />}
              title="Intelektualno vlasništvo"
              items={["Autorska i srodna prava", "Ugovori o prenosu prava", "Zaštita brenda"]}
            />
          </div>
        </div>
      </section>

      {/* Kako radimo */}
      <section id="kako-radimo" className="py-16 md:py-24 bg-slate-950/40 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kako radimo</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Step n={1} title="Uvodni poziv" text="Kratko razumijevanje problema i ciljeva. Jasno definišemo opseg i ishod." />
            <Step n={2} title="Ponuda" text="Dostavljamo plan, rokove i troškove. Nema skrivenih stavki." />
            <Step n={3} title="Izrada" text="Priprema akata, pregovori, ili zastupanje. Redovan update." />
            <Step n={4} title="Isporuka" text="Finalni dokumenti i upute za primjenu. Po potrebi daljnja podrška." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Česta pitanja</h2>
          <div className="mt-8 space-y-4">
            <Faq q="Da li radite hitne predmete?" a="Da, uz prethodni dogovor i hitni dodatak na tarifu. Procjenu dobijate odmah nakon uvodnog poziva." />
            <Faq q="Da li pišete interne akte (pravilnici, politike)?" a="Da. Uz konzultacije i usklađivanje sa važećim propisima FBiH/RS/Brčko i EU regulativom (GDPR)." />
            <Faq q="Možemo li sve online?" a="Može. Ugovori, sastanci i plaćanja idu digitalno, a originali naknadno po potrebi." />
            <Faq q="Da li dajete fiksne cijene?" a="Za većinu zadataka da. Kod sporova i složenih projekata kombinujemo fiksni dio i satnicu." />
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" ref={kontaktRef} className="py-16 md:py-24 bg-slate-950/40 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kontakt</h2>
            <p className="mt-3 text-slate-300">Javite se za uvodni poziv (15 min). Bez obaveze.</p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-emerald-300" /> <a href={`tel:${firmInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">{firmInfo.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-emerald-300" /> <a href={`mailto:${firmInfo.email}`} className="hover:underline">{firmInfo.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-emerald-300" /> <span>{firmInfo.address}</span>
              </p>
            </div>
            <p className="mt-6 text-xs text-slate-400">Ovaj sadržaj je informativan i ne predstavlja pravni savjet.</p>
          </div>

          <div className="lg:col-span-2">
            <form action="/api/lead" method="post" className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="ime" className="text-sm">Ime i prezime</label>
                  <input id="ime" name="ime" required className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 outline-none focus:ring-2 focus:ring-emerald-400/60" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm">Email</label>
                  <input id="email" name="email" type="email" required className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 outline-none focus:ring-2 focus:ring-emerald-400/60" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="tema" className="text-sm">Tema</label>
                  <input id="tema" name="tema" placeholder="Npr. Otkaz ugovora o radu / NDA / Osnivanje društva" className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 outline-none focus:ring-2 focus:ring-emerald-400/60" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="poruka" className="text-sm">Poruka</label>
                  <textarea id="poruka" name="poruka" rows={5} className="rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400/60" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-xs text-slate-400 flex items-center gap-2"><ShieldCheck className="size-4" /> Povjerljivo. Podatke koristimo samo radi povratnog kontakta.</p>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-emerald-950 font-semibold px-5 py-3 transition">
                  Pošalji upit <MessageSquare className="size-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Andrić Law — Advokatski ured</p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#usluge" className="hover:text-emerald-300">Usluge</a>
            <a href="#faq" className="hover:text-emerald-300">FAQ</a>
            <a href="#kontakt" className="hover:text-emerald-300">Kontakt</a>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Andrić Law",
            areaServed: ["Federacija BiH", "Republika Srpska", "Brčko Distrikt"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sarajevo",
              addressCountry: "BA",
            },
            telephone: firmInfo.phone,
            url: "https://andriclaw.ba",
            makesOffer: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Radno pravo" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ugovori (MSA/SOW/NDA)" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Privredno pravo" } },
            ],
          }, null, 2),
        }}
      />
    </main>
  );
}

function ServiceCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition shadow-xl shadow-black/20 p-6">
      <div className="flex items-center gap-3 text-emerald-300">
        <div className="grid place-content-center size-10 rounded-xl bg-emerald-400/10 border border-emerald-300/20">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <ChevronRight className="size-4 mt-0.5 text-emerald-300" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <div className="size-9 grid place-content-center rounded-xl bg-emerald-400/10 text-emerald-300 font-semibold border border-emerald-300/20">
          {n}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-slate-300">{text}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/5 p-5 open:bg-white/10 transition">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-6">
          <h3 className="font-semibold">{q}</h3>
          <ChevronRight className="size-4 shrink-0 transition group-open:rotate-90 text-emerald-300" />
        </div>
      </summary>
      <p className="mt-3 text-sm text-slate-300">{a}</p>
    </details>
  );
}
