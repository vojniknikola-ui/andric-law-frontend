'use client'
import React, { useEffect } from 'react';

export const Terms: React.FC = () => {
  useEffect(() => {
    document.title = 'Uslovi korištenja - Andrić Law';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Uslovi korištenja web stranice Andrić Law. Pročitajte pravila i uslove korištenja naših usluga.');
    }
  }, []);
  return (
    <div className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">Uslovi korištenja</h1>
        <p className="text-ink-600 mb-10">Posljednje ažurirano: {new Date().toLocaleDateString('bs-BA')}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">1. Prihvatanje uslova</h2>
            <p className="text-ink-900 leading-relaxed">
              Korištenjem web stranice Andrić Law, prihvatate ove uslove korištenja. Ako se ne slažete sa ovim uslovima, molimo vas da ne koristite našu stranicu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">2. Pravne usluge</h2>
            <p className="text-ink-900 leading-relaxed">
              Informacije na ovoj web stranici su opšteg karaktera i ne predstavljaju pravni savjet. Za konkretne pravne savjete, molimo vas da nas kontaktirate direktno. Odnos advokat-klijent nastaje samo nakon formalnog angažovanja i potpisivanja ugovora.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">3. Intelektualna svojina</h2>
            <p className="text-ink-900 leading-relaxed">
              Sav sadržaj na ovoj web stranici, uključujući tekstove, slike, logotipe i dizajn, je vlasništvo Andrić Law i zaštićen je zakonima o autorskim pravima. Zabranjeno je kopiranje, distribucija ili korištenje sadržaja bez pisane dozvole.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">4. Povjerljivost</h2>
            <p className="text-ink-900 leading-relaxed">
              Sve informacije koje nam pošaljete putem kontakt forme ili emaila tretiraju se kao povjerljive i zaštićene su advokatskom tajnom. Međutim, preporučujemo da ne šaljete osjetljive dokumente putem nezaštićenih email poruka.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">5. Ograničenje odgovornosti</h2>
            <p className="text-ink-900 leading-relaxed">
              Andrić Law ne snosi odgovornost za bilo kakvu štetu koja može nastati korištenjem informacija sa ove web stranice. Informacije se pružaju "kakve jesu" bez garancija bilo koje vrste.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">6. Linkovi ka drugim stranicama</h2>
            <p className="text-ink-900 leading-relaxed">
              Naša web stranica može sadržavati linkove ka vanjskim stranicama. Ne odgovaramo za sadržaj ili politiku privatnosti tih stranica.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">7. Izmjene uslova</h2>
            <p className="text-ink-900 leading-relaxed">
              Zadržavamo pravo da u bilo kom trenutku izmijenimo ove uslove korištenja. Izmjene stupaju na snagu odmah nakon objavljivanja na web stranici.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">8. Mjerodavno pravo</h2>
            <p className="text-ink-900 leading-relaxed">
              Ovi uslovi korištenja podliježu zakonima Bosne i Hercegovine. Svi sporovi rješavaju se pred nadležnim sudovima u BiH.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">9. Kontakt</h2>
            <p className="text-ink-900 leading-relaxed">
              Za pitanja o uslovima korištenja, kontaktirajte nas na:<br/>
              Email: info@andriclaw.ba<br/>
              Telefon: +387 61 924 848
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
