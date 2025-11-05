import { SupportedLanguage } from './translations';

type LangRecord<T> = Record<SupportedLanguage, T>;

export interface ServiceDetails {
  title: string;
  description: string;
  highlights: string[];
  details: string[];
}

export interface ServicesCopy {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryCta: string;
    secondaryCta: string;
  };
  cards: {
    cta: string;
  };
  services: ServiceDetails[];
  process: {
    heading: string;
    description: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  guarantees: {
    heading: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  faqs: {
    heading: string;
    lead: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  moreCta: {
    heading: string;
    description: string;
    button: string;
  };
  modal: {
    closeAria: string;
    includedHeading: string;
    assistanceTitle: string;
    assistanceDescription: string;
    assistanceCall: string;
    assistanceWrite: string;
  };
}

export const servicesCopy: LangRecord<ServicesCopy> = {
  bs: {
    meta: {
      title: 'Usluge - Advokatska kancelarija Sarajevo | Andrić Law',
      description:
        'Pravne usluge u Sarajevu: privredno pravo, radno pravo, porodično pravo, ugovorno pravo, sudsko zastupanje. Advokatska kancelarija Andrić Law.',
    },
    hero: {
      eyebrow: 'Pravne usluge',
      heading: 'Naše usluge',
      subheading:
        'Sveobuhvatna pravna podrška za kompanije, startape i pojedince – strateški vođena, transparentna i fokusirana na rezultat.',
      primaryCta: 'Pozovi odmah',
      secondaryCta: 'Pošalji upit',
    },
    cards: {
      cta: 'Saznaj više',
    },
    services: [
      {
        title: 'Privredno pravo',
        description:
          'Kompletna pravna podrška za d.o.o., akcionarska društva i startape u svim fazama rasta.',
        highlights: [
          'Izrada i revizija osnivačkih akata i statuta',
          'Due diligence prije investicija i akvizicija',
          'Priprema i pregovaranje ključnih komercijalnih ugovora',
        ],
        details: [
          'Osnivanje i registracija privrednih društava svih oblika',
          'Upravljanje korporativnim promjenama i priprema skupština',
          'Konsultacije za investicije, M&A i venture capital aranžmane',
          'Usklađivanje sa propisima (compliance) i interni pravilnici',
          'Zastupanje u trgovačkim i privrednim sporovima',
          'Izrada ugovora sa dobavljačima, distributerima i partnerima',
          'Savjetovanje o zaštiti poslovnih tajni i intelektualne svojine',
        ],
      },
      {
        title: 'Imovinsko pravo',
        description:
          'Sigurne transakcije nekretninama i zaštita vlasničkih prava uz sproveden due diligence.',
        highlights: [
          'Analiza zemljišnih knjiga i tereta',
          'Ugovori o kupoprodaji i zakupu',
          'Rješavanje sporova u vezi sa vlasništvom i granicama',
        ],
        details: [
          'Priprema preliminarnih i glavnih ugovora o kupoprodaji',
          'Izrada ugovora o zakupu, najmu i korištenju prostora',
          'Provjera pravnog statusa nekretnina i tereta (due diligence)',
          'Zastupanje u ostavinskim i nasljednim postupcima',
          'Podjela suvlasničke imovine i uređenje susjedskih odnosa',
          'Upis i brisanje prava u zemljišnim knjigama',
          'Rješavanje imovinskih sporova pred sudovima i arbitražom',
        ],
      },
      {
        title: 'Porodično pravo',
        description:
          'Diskretna i efikasna zaštita porodice uz fokus na dogovor, medijaciju i dobrobit djece.',
        highlights: [
          'Sporazumni i parnični razvodi',
          'Planovi starateljstva i alimentacije',
          'Medijacija prije sudskog postupka',
        ],
        details: [
          'Razvod braka: sporazumni, parnični i međunarodni elementi',
          'Izrada plana roditeljstva, starateljstva i kontakata sa djecom',
          'Zastupanje u postupcima za alimentaciju i izmjene iznosa',
          'Medijacija i vansudska nagodba prije pokretanja parnice',
          'Zaštita od nasilja u porodici i hitne mjere',
          'Uređivanje imovinskih odnosa i bračne stečevine',
          'Pravna podrška vanbračnim zajednicama',
        ],
      },
      {
        title: 'Ugovorno pravo',
        description:
          'Ugovori pisani jasnim jezikom, sa balansiranim obavezama i zaštitom ključnih interesa.',
        highlights: [
          'Pravna analiza postojećih ugovora',
          'Pregovaranje risk klauzula',
          'Usklađivanje sa regulativama i GDPR-om',
        ],
        details: [
          'Izrada ugovora o djelu, uslugama, licencama i distribuciji',
          'Redlining i revizija ugovora koje dostavljaju partneri',
          'Pregovaranje komercijalnih i pravnih uslova',
          'Kreiranje šablona ugovora i internih procedura',
          'Rješavanje ugovornih sporova i naknada štete',
          'Savjetovanje o digitalnim ugovorima i e-trgovini',
          'Pravna podrška u slučajevima raskida ugovora',
        ],
      },
      {
        title: 'Sudsko zastupanje',
        description:
          'Iskusan tim za kompleksne parnice, arbitraže i izvršne postupke svih instanci.',
        highlights: [
          'Strategija spora i procjena rizika',
          'Priprema podnesaka i dokaza',
          'Vansudske nagodbe gdje je to u vašem interesu',
        ],
        details: [
          'Parnične i upravne parnice, uključujući privredne sporove',
          'Izvršni i prekršajni postupci, uključujući žalbe',
          'Zastupanje pred višim sudovima i arbitražama',
          'Priprema tužbi, odgovora, žalbi i vanrednih pravnih lijekova',
          'Strategija prikupljanja dokaza i svjedočenja',
          'Vođenje pregovora za vansudsko rješenje',
          'Procjena troškova i rizika prije pokretanja spora',
        ],
      },
      {
        title: 'Radno pravo',
        description:
          'Savjetujemo poslodavce i zaposlene o pravima, obavezama i rješavanju radnih sporova.',
        highlights: [
          'Izrada kompletnog HR pravnog okvira',
          'Zaštita zaposlenih od nezakonitog otkaza',
          'Compliance pregled i edukacija HR timova',
        ],
        details: [
          'Izrada ugovora o radu, pravilnika i aneksa',
          'Savjetovanje pri otkazima i disciplinskim postupcima',
          'Zastupanje u radnim sporovima i pregovorima sa sindikatima',
          'Prevencija mobinga i diskriminacije na radnom mjestu',
          'Procjena rizika prilikom reorganizacija i M&A',
          'Postupci za naknadu štete zbog povrede na radu',
          'Programi edukacije za menadžment i HR timove',
        ],
      },
    ],
    process: {
      heading: 'Kako izgleda saradnja',
      description:
        'Kroz jasno definisane faze vodimo vas od inicijalnog razgovora do kompletne realizacije i praćenja rezultata.',
      steps: [
        {
          title: 'Uvodni poziv',
          description:
            'U 20 minuta mapiramo situaciju, ciljeve i dogovaramo naredne korake.',
        },
        {
          title: 'Strategija i ponuda',
          description:
            'Dobijate plan rada, vremenski okvir i jasan troškovnik – bez skrivenih stavki.',
        },
        {
          title: 'Realizacija i podrška',
          description:
            'Izvršavamo dogovorene aktivnosti i ostajemo dostupni tokom cijelog procesa.',
        },
      ],
    },
    guarantees: {
      heading: 'Zašto klijenti biraju nas',
      description:
        'Kombinujemo pravnu ekspertizu, poslovno razumijevanje i proaktivan pristup svakom predmetu.',
      items: [
        {
          title: 'Transparentnost',
          description: 'Svi troškovi i rokovi isporuke dogovaraju se prije početka saradnje.',
        },
        {
          title: 'Partnerstvo',
          description: 'Radimo rame uz rame s vašim timom i proaktivno predlažemo poboljšanja.',
        },
        {
          title: 'Brz odgovor',
          description: 'Garantujemo inicijalni odgovor u roku od 24 sata na sve upite.',
        },
      ],
    },
    faqs: {
      heading: 'Česta pitanja',
      lead:
        'Najčešća pitanja naših klijenata o uslugama, rokovima i načinu rada. Ako vam treba dodatna informacija, pišite nam — odgovaramo u roku od 24 sata.',
      items: [
        {
          question: 'Koliko traje angažman nakon inicijalne konsultacije?',
          answer:
            'U prosjeku, analizu ugovora završavamo u roku od 3–5 radnih dana, dok za složenije sudske predmete dobijate plan rada sa jasno definisanim prekretnicama.',
        },
        {
          question: 'Radite li sa startapovima i freelancerima?',
          answer:
            'Da. Imamo paket usluga prilagođen ranim fazama razvoja – od osnovnih ugovora, preko NDA i ESOP programa, do pregovora sa investitorima.',
        },
        {
          question: 'Na koji način fakturišete?',
          answer:
            'Fleksibilni smo: radimo po satu, po projektu ili putem mjesečnog retainer modela, zavisno od ciljeva i obima posla.',
        },
      ],
    },
    moreCta: {
      heading: 'Ne vidite ono što tražite?',
      description:
        'Javljamo se u roku od jednog radnog dana i predlažemo plan koji odgovara vašim prioritetima.',
      button: 'Kontaktirajte nas',
    },
    modal: {
      closeAria: 'Zatvori detalje usluge',
      includedHeading: 'Šta je uključeno',
      assistanceTitle: 'Trebate pomoć u ovoj oblasti?',
      assistanceDescription:
        'Kontaktirajte nas za detaljnu konsultaciju i saznajte kako možemo zaštititi vaše interese.',
      assistanceCall: 'Pozovi nas',
      assistanceWrite: 'Piši nam',
    },
  },
  en: {
    meta: {
      title: 'Services - Law Firm Sarajevo | Andrić Law',
      description:
        'Legal services in Sarajevo: corporate law, employment law, family law, contract law, and litigation. Andrić Law Firm.',
    },
    hero: {
      eyebrow: 'Legal services',
      heading: 'What we do',
      subheading:
        'End-to-end legal support for companies, startups, and individuals — strategically led, transparent, and outcome-focused.',
      primaryCta: 'Call now',
      secondaryCta: 'Send inquiry',
    },
    cards: {
      cta: 'Learn more',
    },
    services: [
      {
        title: 'Corporate law',
        description:
          'Comprehensive legal support for LLCs, joint-stock companies, and startups through every growth stage.',
        highlights: [
          'Drafting and revising articles of association and bylaws',
          'Due diligence before investments and acquisitions',
          'Preparing and negotiating key commercial agreements',
        ],
        details: [
          'Incorporation and registration of all company types',
          'Managing corporate changes and preparing shareholder meetings',
          'Advising on investments, M&A, and venture capital deals',
          'Regulatory compliance reviews and internal policies',
          'Representation in commercial and business disputes',
          'Drafting agreements with suppliers, distributors, and partners',
          'Protecting trade secrets and intellectual property',
        ],
      },
      {
        title: 'Real estate law',
        description:
          'Secure property transactions and safeguard ownership rights with full legal due diligence.',
        highlights: [
          'Land registry and encumbrance analysis',
          'Drafting purchase and lease agreements',
          'Resolving ownership and boundary disputes',
        ],
        details: [
          'Preparing preliminary and final sale contracts',
          'Drafting lease, rent, and use agreements',
          'Reviewing legal status of properties and encumbrances (due diligence)',
          'Representation in probate and inheritance proceedings',
          'Dividing co-owned property and settling neighbor relations',
          'Registering and removing rights with land registries',
          'Handling property disputes before courts and arbitration',
        ],
      },
      {
        title: 'Family law',
        description:
          'Discreet and efficient protection of your family with a focus on settlements, mediation, and children’s well-being.',
        highlights: [
          'Contested and uncontested divorces',
          'Custody and child support plans',
          'Mediation prior to court proceedings',
        ],
        details: [
          'Divorce proceedings: uncontested, contested, and international elements',
          'Drafting parenting plans, custody, and contact schedules',
          'Representation in child support proceedings and modifications',
          'Mediation and out-of-court settlements before litigation',
          'Protection from domestic violence and emergency measures',
          'Managing marital property and spousal assets',
          'Legal support for common-law partnerships',
        ],
      },
      {
        title: 'Contract law',
        description:
          'Contracts written in plain language with balanced obligations and protection of your core interests.',
        highlights: [
          'Legal analysis of existing agreements',
          'Negotiating high-risk clauses',
          'Regulatory and GDPR alignment',
        ],
        details: [
          'Drafting service, work-for-hire, licensing, and distribution agreements',
          'Redlining and reviewing partner-provided contracts',
          'Negotiating commercial and legal terms',
          'Developing contract templates and internal procedures',
          'Resolving contractual disputes and claims for damages',
          'Advising on digital agreements and e-commerce',
          'Legal support during contract termination',
        ],
      },
      {
        title: 'Litigation',
        description:
          'Experienced representation for complex lawsuits, arbitration, and enforcement at all court levels.',
        highlights: [
          'Dispute strategy and risk assessment',
          'Preparing submissions and evidence',
          'Out-of-court settlements when in your interest',
        ],
        details: [
          'Civil and administrative litigation, including commercial disputes',
          'Enforcement and misdemeanor proceedings, including appeals',
          'Representation before higher courts and arbitration panels',
          'Drafting claims, responses, appeals, and extraordinary remedies',
          'Strategic evidence gathering and witness preparation',
          'Negotiating out-of-court resolutions',
          'Cost and risk assessment before initiating proceedings',
        ],
      },
      {
        title: 'Employment law',
        description:
          'We advise employers and employees on rights, obligations, and resolving workplace disputes.',
        highlights: [
          'Full HR legal framework development',
          'Protecting employees from wrongful termination',
          'Compliance reviews and HR team training',
        ],
        details: [
          'Drafting employment contracts, policies, and amendments',
          'Advising on terminations and disciplinary procedures',
          'Representation in labour disputes and union negotiations',
          'Preventing workplace harassment and discrimination',
          'Risk assessments during reorganizations and M&A',
          'Claims for workplace injury compensation',
          'Training programmes for management and HR teams',
        ],
      },
    ],
    process: {
      heading: 'How collaboration works',
      description:
        'We guide you through clearly defined phases — from the initial consultation to complete delivery and follow-up.',
      steps: [
        {
          title: 'Introductory call',
          description:
            'Within 20 minutes we map your situation, objectives, and agree on the next steps.',
        },
        {
          title: 'Strategy and proposal',
          description:
            'You receive a work plan, timeline, and transparent fee structure — no hidden items.',
        },
        {
          title: 'Execution and support',
          description:
            'We carry out the agreed activities and remain available throughout the entire engagement.',
        },
      ],
    },
    guarantees: {
      heading: 'Why clients choose us',
      description:
        'Legal expertise combined with business understanding and a proactive mindset for every case.',
      items: [
        {
          title: 'Transparency',
          description: 'All fees and timelines are agreed before work begins.',
        },
        {
          title: 'Partnership',
          description: 'We work alongside your team and proactively suggest improvements.',
        },
        {
          title: 'Fast response',
          description: 'We guarantee an initial response within 24 hours to every enquiry.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently asked questions',
      lead:
        'Our clients’ most common questions about services, timelines, and collaboration. Need something else? Reach out — we respond within 24 hours.',
      items: [
        {
          question: 'How long does the engagement last after the initial consultation?',
          answer:
            'Contract reviews typically take 3–5 business days, while more complex matters come with a roadmap and clearly defined milestones.',
        },
        {
          question: 'Do you work with startups and freelancers?',
          answer:
            'Yes. We offer tailored packages for early-stage ventures — from core agreements and NDAs to ESOP packages and investor negotiations.',
        },
        {
          question: 'How do you structure your fees?',
          answer:
            'We are flexible: hourly billing, fixed-fee projects, or monthly retainers depending on your goals and scope.',
        },
      ],
    },
    moreCta: {
      heading: 'Can’t find what you need?',
      description:
        'We get back to you within one business day with a plan aligned to your priorities.',
      button: 'Contact us',
    },
    modal: {
      closeAria: 'Close service details',
      includedHeading: 'What’s included',
      assistanceTitle: 'Need support in this area?',
      assistanceDescription:
        'Get in touch for an in-depth consultation and discover how we can protect your interests.',
      assistanceCall: 'Call us',
      assistanceWrite: 'Write to us',
    },
  },
};

