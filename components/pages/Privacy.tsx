'use client'
import React, { useEffect } from 'react';

export const Privacy: React.FC = () => {
  useEffect(() => {
    document.title = 'Politika privatnosti - Andrić Law';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Politika privatnosti Andrić Law. Saznajte kako prikupljamo, koristimo i štitimo vaše lične podatke.');
    }
  }, []);
  return (
    <div className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">Politika privatnosti</h1>
        <p className="text-ink-600 mb-10">Posljednje ažurirano: {new Date().toLocaleDateString('bs-BA')}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">1. Uvod</h2>
            <p className="text-ink-900 leading-relaxed">
              Andrić Law poštuje vašu privatnost i posvećen je zaštiti vaših ličnih podataka. Ova politika privatnosti objašnjava kako prikupljamo, koristimo i štitimo vaše informacije kada koristite našu web stranicu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">2. Podaci koje prikupljamo</h2>
            <p className="text-ink-900 leading-relaxed mb-4">Prikupljamo sljedeće vrste podataka:</p>
            <ul className="list-disc pl-6 space-y-2 text-ink-900">
              <li>Ime i prezime</li>
              <li>Email adresa</li>
              <li>Broj telefona</li>
              <li>Poruke i upiti koje nam šaljete</li>
              <li>Tehnički podaci (IP adresa, tip browsera, vrijeme pristupa)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">3. Kako koristimo vaše podatke</h2>
            <p className="text-ink-900 leading-relaxed mb-4">Vaše podatke koristimo za:</p>
            <ul className="list-disc pl-6 space-y-2 text-ink-900">
              <li>Odgovaranje na vaše upite i pružanje pravnih usluga</li>
              <li>Komunikaciju u vezi sa vašim predmetom</li>
              <li>Poboljšanje naših usluga i web stranice</li>
              <li>Ispunjavanje zakonskih obaveza</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">4. Zaštita podataka</h2>
            <p className="text-ink-900 leading-relaxed">
              Primjenjujemo odgovarajuće tehničke i organizacijske mjere kako bismo zaštitili vaše lične podatke od neovlaštenog pristupa, gubitka ili zloupotrebe. Svi podaci su zaštićeni advokatskom tajnom.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">5. Dijeljenje podataka</h2>
            <p className="text-ink-900 leading-relaxed">
              Ne dijelimo vaše lične podatke sa trećim stranama osim kada je to neophodno za pružanje pravnih usluga ili kada je to zakonom propisano. Svi podaci su strogo povjerljivi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">6. Vaša prava</h2>
            <p className="text-ink-900 leading-relaxed mb-4">Imate pravo na:</p>
            <ul className="list-disc pl-6 space-y-2 text-ink-900">
              <li>Pristup svojim ličnim podacima</li>
              <li>Ispravku netačnih podataka</li>
              <li>Brisanje podataka</li>
              <li>Ograničenje obrade</li>
              <li>Prigovor na obradu</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">7. Kolačići (Cookies)</h2>
            <p className="text-ink-900 leading-relaxed">
              Naša web stranica koristi kolačiće za poboljšanje korisničkog iskustva. Možete kontrolisati kolačiće kroz postavke vašeg browsera.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">8. Kontakt</h2>
            <p className="text-ink-900 leading-relaxed">
              Za pitanja o politici privatnosti, kontaktirajte nas na:<br/>
              Email: info@andriclaw.ba<br/>
              Telefon: +387 61 924 848
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
