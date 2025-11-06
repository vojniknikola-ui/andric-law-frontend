'use client'
import React, { useEffect, useId, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Search,
  Briefcase,
  FileSignature,
  Gavel,
  ShieldCheck,
  CalendarClock,
  Handshake,
  Scale,
  FileText,
  Edit3,
  ArrowLeftRight,
  Hourglass,
  AlertTriangle,
  ClipboardCheck,
  UserCheck,
  UserMinus,
  OctagonAlert,
  Lock,
  Shield,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import type { SupportedLanguage } from '@/lib/i18n/translations';
import {
  boundedLevenshtein,
  buildNormalizedCorpus,
  getTokenThreshold,
  normalizeText,
  tokenize,
} from '@/lib/search/text-utils';

type CategoryKey = 'employment' | 'contracts' | 'litigation' | 'compliance';

interface GlossaryEntryCopy {
  term: string;
  shortDefinition: string;
  tip: string;
  tags: string[];
}

interface GlossaryEntry {
  id: string;
  category: CategoryKey;
  icon: LucideIcon;
  copy: Record<SupportedLanguage, GlossaryEntryCopy>;
}

const heroCopy: Record<
  SupportedLanguage,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    searchPlaceholder: string;
    filterLabel: string;
    tipLabel: string;
    noResults: string;
    resetFilter: string;
    allLabel: string;
    disclaimer: string;
  }
> = {
  bs: {
    eyebrow: 'Glosar',
    title: 'Pravni pojmovi objašnjeni jednostavno',
    subtitle: 'Kratka objašnjenja ključnih izraza koje susrećeš u ugovorima, pregovorima i radnim odnosima.',
    description:
      'Svaki pojam dolazi sa praktičnim kontekstom i savjetom šta provjeriti prije sljedećeg koraka.',
    metaTitle: 'Glosar pravnih pojmova - Andrić Law',
    metaDescription:
      'Objašnjenja pravnih pojmova kao što su otkazni rok, sporazumni raskid, ugovorna kazna, rok zastare i punomoć. Praktični savjeti iz advokatske prakse.',
    searchPlaceholder: 'Pretraži pojmove (npr. rok, raskid...)',
    filterLabel: 'Filtriraj po oblasti',
    tipLabel: 'Za provjeru',
    noResults: 'Nema pojmova koji odgovaraju pretrazi. Pokušaj drugi izraz ili resetuj filtere.',
    resetFilter: 'Resetuj filtere',
    allLabel: 'Svi pojmovi',
    disclaimer:
      'Informacije u glosaru služe za opšte informisanje i ne predstavljaju pravni savjet. Za konkretan slučaj kontaktiraj advokata.',
  },
  en: {
    eyebrow: 'Glossary',
    title: 'Legal terms made clear',
    subtitle:
      'Quick explanations of the phrases you encounter in contracts, negotiations, and employment matters.',
    description:
      'Each entry includes real-life context and a practical checklist for your next decision.',
    metaTitle: 'Legal glossary - Andrić Law',
    metaDescription:
      'Definitions of key legal terms including notice period, mutual termination, liquidated damages, statute of limitations, and power of attorney. Actionable advice from practice.',
    searchPlaceholder: 'Search terms (e.g. notice, termination...)',
    filterLabel: 'Filter by area',
    tipLabel: 'Checklist',
    noResults: 'No terms match your search. Try a different keyword or clear the filters.',
    resetFilter: 'Clear filters',
    allLabel: 'All terms',
    disclaimer:
      'The glossary offers general information and does not constitute legal advice. Speak with a lawyer about your specific matter.',
  },
};

const categoryLabels: Record<CategoryKey, Record<SupportedLanguage, string>> = {
  employment: {
    bs: 'Radni odnosi',
    en: 'Employment',
  },
  contracts: {
    bs: 'Ugovori',
    en: 'Contracts',
  },
  litigation: {
    bs: 'Sporovi',
    en: 'Disputes',
  },
  compliance: {
    bs: 'Formalnosti',
    en: 'Formalities',
  },
};

const categoryIcons: Record<CategoryKey, LucideIcon> = {
  employment: Briefcase,
  contracts: FileSignature,
  litigation: Gavel,
  compliance: ShieldCheck,
};

type FilterOption = {
  key: CategoryKey | 'all';
  label: string;
  icon: LucideIcon;
};

type SearchableEntry = {
  entry: GlossaryEntry;
  normalizedText: string;
  tokens: string[];
};

const evaluateTokenMatch = (
  token: string,
  candidates: string[],
  normalizedText: string,
): number | null => {
  if (!token) {
    return 0;
  }

  if (normalizedText.includes(token)) {
    return token.length * 10;
  }

  const threshold = getTokenThreshold(token.length);
  if (threshold === 0) {
    return null;
  }

  let bestDistance: number | null = null;
  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    if (Math.abs(candidate.length - token.length) > threshold) {
      continue;
    }

    const distance = boundedLevenshtein(token, candidate, threshold);
    if (distance <= threshold) {
      if (bestDistance === null || distance < bestDistance) {
        bestDistance = distance;
        if (bestDistance === 0) {
          break;
        }
      }
    }
  }

  if (bestDistance === null) {
    return null;
  }

  return Math.max(1, token.length - bestDistance * 2) * 4;
};

const glossaryEntries: GlossaryEntry[] = [
  {
    id: 'notice-period',
    category: 'employment',
    icon: CalendarClock,
    copy: {
      bs: {
        term: 'Otkazni rok',
        shortDefinition:
          'Period između dostave otkaza i prestanka ugovora o radu. U tom vremenu zaposleni mora nastaviti da radi, a poslodavac da ispunjava sve obaveze.',
        tip: 'Provjeri da li ugovor ili kolektivni akt predviđa duži rok od zakonskog minimuma i evidentiraj datum kada je otkaz zaista uručen.',
        tags: ['rok', 'otkaz', 'radni odnos'],
      },
      en: {
        term: 'Notice period',
        shortDefinition:
          'The time between delivering a termination notice and the actual end of the employment contract. During that period the employee keeps working and the employer must honour all obligations.',
        tip: 'Check if your employment contract or collective agreement extends the statutory minimum and document the exact date the notice was served.',
        tags: ['notice', 'deadline', 'employment'],
      },
    },
  },
  {
    id: 'mutual-termination',
    category: 'contracts',
    icon: Handshake,
    copy: {
      bs: {
        term: 'Sporazumni raskid ugovora',
        shortDefinition:
          'Dogovor stranaka da ugovor prestane prije isteka roka. Obaveze se gase onog trenutka kada obje strane potpišu raskid i usaglase zatvaranje otvorenih stavki.',
        tip: 'U raskid ugradi tačan datum prestanka, popis obaveza koje se namiruju i potvrdu da nijedna strana nema dodatnih potraživanja.',
        tags: ['raskid', 'ugovor', 'sporazum'],
      },
      en: {
        term: 'Mutual termination',
        shortDefinition:
          'An agreement between parties to end a contract before its scheduled expiry. Obligations cease once both sides sign the termination and reconcile outstanding items.',
        tip: 'Include the effective termination date, a checklist of obligations being settled, and a statement that no further claims remain.',
        tags: ['termination', 'agreement', 'contract'],
      },
    },
  },
  {
    id: 'liquidated-damages',
    category: 'contracts',
    icon: Scale,
    copy: {
      bs: {
        term: 'Ugovorna kazna',
        shortDefinition:
          'Unaprijed dogovoreni iznos koji dužnik plaća ako ne ispuni obavezu na vrijeme ili u potpunosti. Često zamjenjuje dokazivanje stvarne štete i ubrzava naknadu.',
        tip: 'Provjeri da li je kazna razmjerna mogućoj šteti i precizno definiši šta se smatra kašnjenjem ili propustom.',
        tags: ['kazna', 'ugovor', 'odšteta'],
      },
      en: {
        term: 'Liquidated damages',
        shortDefinition:
          'A pre-agreed amount the obligor pays if a duty is not fulfilled on time or in full. It often replaces proving actual loss and speeds up compensation.',
        tip: 'Check whether the amount is proportionate to realistic damages and describe precisely what counts as delay or non-performance.',
        tags: ['damages', 'clause', 'delay'],
      },
    },
  },
  {
    id: 'statute-of-limitations',
    category: 'litigation',
    icon: Hourglass,
    copy: {
      bs: {
        term: 'Zastara potraživanja',
        shortDefinition:
          'Protekom zakonom određenog roka prestaje prisilna ostvarivost potraživanja; dužnik uspješno odbija isplatu prigovorom zastare.',
        tip: 'Evidentiraj datume dospijeća i prekide zastare (opomene, priznanja duga); ne odgađaj pokretanje postupka.',
        tags: ['zastara', 'rok', 'potraživanje'],
      },
      en: {
        term: 'Statute of limitations',
        shortDefinition:
          'Once the statutory period expires, the claim can no longer be enforced; the debtor can defeat payment by raising a limitation defence.',
        tip: 'Track due dates and events that interrupt limitation (warnings, acknowledgments) and initiate proceedings without delay.',
        tags: ['limitation', 'deadline', 'claim'],
      },
    },
  },
  {
    id: 'power-of-attorney',
    category: 'compliance',
    icon: ShieldCheck,
    copy: {
      bs: {
        term: 'Punomoć',
        shortDefinition:
          'Ovlašćenje kojim jedna osoba dopušta drugoj da je zastupa u određenim pravnim radnjama. Važi samo za obim i vremenski period naveden u dokumentu.',
        tip: 'Navedi precizne radnje za koje daješ ovlašćenje i zabilježi datum prestanka kako bi izbjegao zloupotrebu.',
        tags: ['ovlašćenje', 'dokument', 'formalnost'],
      },
      en: {
        term: 'Power of attorney',
        shortDefinition:
          'A mandate that authorises another person to act on your behalf for specific legal actions. It is valid only within the scope and duration set in the document.',
        tip: 'Define the permitted actions with precision and record an expiry date to prevent misuse.',
        tags: ['authorisation', 'document', 'proxy'],
      },
    },
  },
  {
    id: 'demand-letter',
    category: 'litigation',
    icon: Gavel,
    copy: {
      bs: {
        term: 'Opomena pred tužbu',
        shortDefinition:
          'Formalni dopis kojim povjerilac poziva dužnika da ispuni obavezu prije pokretanja spora. Često je zakonski uslov za kasniju tužbu ili izvršni postupak.',
        tip: 'U dopisu naznači rok za ispunjenje, način plaćanja i posljedice ako obaveza ostane neizmirena.',
        tags: ['upozorenje', 'spor', 'potraživanje'],
      },
      en: {
        term: 'Demand letter',
        shortDefinition:
          'A formal notice urging the debtor to fulfil an obligation before litigation begins. It is often a statutory prerequisite for filing a lawsuit or initiating enforcement.',
        tip: 'State a clear deadline, payment method, and the consequences of inaction in the letter.',
        tags: ['notice', 'dispute', 'claim'],
      },
    },
  },
  {
    id: 'pre-contract-agreement',
    category: 'contracts',
    icon: FileText,
    copy: {
      bs: {
        term: 'Predugovor',
        shortDefinition:
          'Obavezujući sporazum kojim se strane obavezuju zaključiti glavni ugovor s bitnim sastojcima u određenom roku. Nezaključenje glavnog ugovora povlači odgovornost.',
        tip: 'Upiši sve bitne elemente budućeg ugovora i rok za zaključenje; predvidi ugovornu kaznu ili pravo da tražiš zaključenje.',
        tags: ['predugovor', 'glavni ugovor', 'obaveza'],
      },
      en: {
        term: 'Pre-contract agreement',
        shortDefinition:
          'Binding agreement obligating the parties to execute the main contract with essential terms within a set timeframe. Failure to sign can trigger liability.',
        tip: 'List every essential element of the future contract, set a deadline, and add liquidated damages or the right to compel execution.',
        tags: ['pre-contract', 'main contract', 'obligation'],
      },
    },
  },
  {
    id: 'contract-addendum',
    category: 'contracts',
    icon: Edit3,
    copy: {
      bs: {
        term: 'Aneks ugovora',
        shortDefinition:
          'Pisana izmjena ili dopuna postojećeg ugovora koja proizvodi učinke kao i osnovni ugovor. Mora biti u istoj formi kao i ugovor koji se mijenja.',
        tip: 'U aneksu jasno naznači koje se klauzule mijenjaju i od kada; referenciraj tačne članske brojeve osnovnog ugovora.',
        tags: ['aneks', 'izmjena', 'dopuna'],
      },
      en: {
        term: 'Contract addendum',
        shortDefinition:
          'Written amendment or supplement to an existing contract that has the same force as the original agreement and must follow the same form.',
        tip: 'State exactly which clauses change and from when, referencing the original article numbers.',
        tags: ['addendum', 'amendment', 'supplement'],
      },
    },
  },
  {
    id: 'assignment-of-receivables',
    category: 'contracts',
    icon: ArrowLeftRight,
    copy: {
      bs: {
        term: 'Cesija (ustup potraživanja)',
        shortDefinition:
          'Prijenos potraživanja s dosadašnjeg vjerovnika na novog bez pristanka dužnika; dužnik se oslobađa ako plati starom vjerovniku prije uredne obavijesti.',
        tip: 'Uvijek pošalji dužniku pisanu obavijest o cesiji s instrukcijama plaćanja; uskladi prateću dokumentaciju (fakture, obračune).',
        tags: ['cesija', 'ustup', 'potraživanje'],
      },
      en: {
        term: 'Assignment of receivables',
        shortDefinition:
          'Transfer of a claim from the current creditor to a new one without debtor consent; the debtor is released if payment is made to the old creditor before proper notice.',
        tip: 'Send written notice to the debtor with payment instructions and align supporting documents (invoices, statements).',
        tags: ['assignment', 'transfer', 'receivable'],
      },
    },
  },
  {
    id: 'interim-measure',
    category: 'litigation',
    icon: AlertTriangle,
    copy: {
      bs: {
        term: 'Privremena mjera',
        shortDefinition:
          'Sudska mjera osiguranja radi sprječavanja nastanka nenadoknadive štete ili izigravanja naplate, zasniva se na vjerojatnosti tražbine i opasnosti od štete.',
        tip: 'Pripremi dokaze o postojanju tražbine i hitnosti (računi, ugovori, dopisi); predloži mjeru razmjernu tražbini.',
        tags: ['osiguranje', 'privremena mjera', 'hitnost'],
      },
      en: {
        term: 'Interim measure',
        shortDefinition:
          'Court-ordered security measure that prevents irreparable harm or frustrates enforcement, based on probable claim and risk of damage.',
        tip: 'Gather evidence of the claim and urgency (invoices, contracts, correspondence) and request a measure proportionate to the claim.',
        tags: ['security', 'interim measure', 'urgency'],
      },
    },
  },
  {
    id: 'enforceable-instrument',
    category: 'litigation',
    icon: ClipboardCheck,
    copy: {
      bs: {
        term: 'Izvršna isprava',
        shortDefinition:
          'Isprava podobna za ovrhu ili izvršenje (pravomoćna presuda, sudska ili notarska isprava s klauzulom izvršnosti). Omogućava prisilnu naplatu.',
        tip: 'Provjeri da je isprava izvršna (klauzula, rokovi, dostava); pravilno označi dužnika i iznos sa zateznim kamatama.',
        tags: ['izvršnost', 'ovrha', 'presuda'],
      },
      en: {
        term: 'Enforceable instrument',
        shortDefinition:
          'Document eligible for enforcement (final judgment, court or notarial deed with an enforcement clause) that allows compulsory collection.',
        tip: 'Confirm the instrument carries enforceability (clause, deadlines, service) and identify the debtor and amounts including default interest.',
        tags: ['enforcement', 'execution', 'judgment'],
      },
    },
  },
  {
    id: 'probationary-period',
    category: 'employment',
    icon: UserCheck,
    copy: {
      bs: {
        term: 'Probni rad',
        shortDefinition:
          'Ugovoreni period provjere radnika u kojem svaka strana može raskinuti ugovor pod olakšanim uslovima u rokovima i trajanju propisanim entitetskim zakonima (npr. u FBiH do 6 mjeseci).',
        tip: 'U ugovoru precizno naznači trajanje, kriterije uspješnosti i pravila raskida tokom probnog rada.',
        tags: ['probni rad', 'ugovor o radu', 'raskid'],
      },
      en: {
        term: 'Probationary period',
        shortDefinition:
          'Agreed trial period during which either party may terminate employment under simplified conditions within statutory limits (e.g., up to six months in FBiH).',
        tip: 'Specify duration, performance criteria, and termination rules for the probation in the contract.',
        tags: ['probation', 'employment contract', 'termination'],
      },
    },
  },
  {
    id: 'ordinary-dismissal',
    category: 'employment',
    icon: UserMinus,
    copy: {
      bs: {
        term: 'Redovni otkaz s otkaznim rokom',
        shortDefinition:
          'Raskid ugovora o radu uz obavezni otkazni rok zbog poslovnih, ličnih ili krivnih razloga propisanih zakonom i internim aktima.',
        tip: 'Donesi pisano obrazloženje, ispoštuj proceduru savjetovanja ili ponude drugog posla i uručivanja; vodi evidenciju o učinku.',
        tags: ['otkaz', 'otkazni rok', 'radni odnos'],
      },
      en: {
        term: 'Ordinary dismissal with notice',
        shortDefinition:
          'Termination of employment with a mandatory notice period for business, personal, or fault-based reasons defined by law and internal rules.',
        tip: 'Prepare written reasoning, follow consultation or redeployment procedures, and keep detailed performance records.',
        tags: ['dismissal', 'notice period', 'employment'],
      },
    },
  },
  {
    id: 'summary-dismissal',
    category: 'employment',
    icon: OctagonAlert,
    copy: {
      bs: {
        term: 'Izvanredni otkaz',
        shortDefinition:
          'Otkaz bez otkaznog roka zbog teške povrede radne obaveze ili drugih naročito važnih razloga, u kratkom zakonskom roku od saznanja za povredu.',
        tip: 'Dokumentuj činjenice (zapisnici, mailovi, CCTV), zatraži izjašnjenje radnika i poštuj prekluzivne rokove.',
        tags: ['izvanredni otkaz', 'teška povreda', 'rok'],
      },
      en: {
        term: 'Summary dismissal',
        shortDefinition:
          'Termination without notice due to serious misconduct or other particularly important reasons, within the short statutory period after learning of the breach.',
        tip: "Document the facts (minutes, emails, CCTV), request the employee's statement, and respect statutory deadlines.",
        tags: ['summary dismissal', 'gross misconduct', 'deadline'],
      },
    },
  },
  {
    id: 'non-compete-clause',
    category: 'employment',
    icon: Lock,
    copy: {
      bs: {
        term: 'Konkurencijska zabrana',
        shortDefinition:
          'Zabrana obavljanja konkurentske djelatnosti za vrijeme rada i nakon prestanka radnog odnosa, s ograničenjem trajanja i teritorija; post-ugovorna zabrana valjana je samo uz primjerenu naknadu.',
        tip: 'Definiši opseg, trajanje, teritorij, listu konkurenata i visinu naknade; dodaj ugovornu kaznu.',
        tags: ['non-compete', 'tajna', 'zabrana'],
      },
      en: {
        term: 'Non-compete clause',
        shortDefinition:
          'Restriction on performing competitive activities during and after employment, limited in duration and territory; post-employment bans require adequate compensation to be valid.',
        tip: 'Define scope, duration, territory, list of competitors, and compensation; include liquidated damages.',
        tags: ['non-compete', 'trade secrets', 'restriction'],
      },
    },
  },
  {
    id: 'non-disclosure-agreement',
    category: 'contracts',
    icon: Shield,
    copy: {
      bs: {
        term: 'Ugovor o povjerljivosti (NDA)',
        shortDefinition:
          'Obaveza čuvanja povjerljivih informacija, zabrana otkrivanja i korištenja izvan dogovorene svrhe, uz odgovornost za štetu i/ili ugovornu kaznu.',
        tip: 'Tačno označi šta je "povjerljivo", izuzetke (npr. javno poznato), rok čuvanja, način povrata ili brisanja podataka.',
        tags: ['NDA', 'povjerljivost', 'poslovna tajna'],
      },
      en: {
        term: 'Non-disclosure agreement (NDA)',
        shortDefinition:
          'Obligation to keep information confidential, prohibiting disclosure or use beyond the agreed purpose, backed by liability for damages and/or liquidated damages.',
        tip: 'Identify exactly what counts as confidential, note exceptions (e.g., public knowledge), define retention periods, and describe return or deletion of data.',
        tags: ['NDA', 'confidentiality', 'trade secret'],
      },
    },
  },
];

const categories: CategoryKey[] = ['employment', 'contracts', 'litigation', 'compliance'];

export const Glossary: React.FC = () => {
  const { language } = useLanguage();
  const hero = heroCopy[language];
  const searchFieldId = useId();
  const filterFieldId = useId();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const normalizedSearchValue = buildNormalizedCorpus(searchTerm);
  const hasActiveSearch = normalizedSearchValue.length > 0;

  useEffect(() => {
    setActiveCategory('all');
    setSearchTerm('');
  }, [language]);

  useEffect(() => {
    document.title = hero.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', hero.metaDescription);
    }
  }, [hero.metaDescription, hero.metaTitle]);

  const categoryOptions = useMemo(
    () =>
      categories.map((key) => ({
        key,
        label: categoryLabels[key][language],
        icon: categoryIcons[key],
      })),
    [language],
  );
  const searchIndex = useMemo<SearchableEntry[]>(() => {
    return glossaryEntries.map((entry) => {
      const copy = entry.copy[language];
      const tokenPool = new Set<string>();
      const addTokens = (value: string) => {
        tokenize(value).forEach((token) => tokenPool.add(token));
      };

      addTokens(copy.term);
      addTokens(copy.shortDefinition);
      addTokens(copy.tip);
      copy.tags.forEach(addTokens);
      Object.values(categoryLabels[entry.category]).forEach(addTokens);
      addTokens(entry.category);
      addTokens(entry.id.replace(/-/g, ' '));

      const combinedText = [
        copy.term,
        copy.shortDefinition,
        copy.tip,
        copy.tags.join(' '),
        ...Object.values(categoryLabels[entry.category]),
        entry.category,
        entry.id.replace(/-/g, ' '),
      ].join(' ');

      return {
        entry,
        normalizedText: buildNormalizedCorpus(combinedText),
        tokens: Array.from(tokenPool),
      };
    });
  }, [language]);
  const filterOptions = useMemo<FilterOption[]>(
    () => [
      { key: 'all', label: hero.allLabel, icon: BookOpen },
      ...categoryOptions,
    ],
    [categoryOptions, hero.allLabel],
  );

  const filteredEntries = useMemo(() => {
    const scopedEntries = searchIndex.filter(
      ({ entry }) => activeCategory === 'all' || entry.category === activeCategory,
    );

    if (!normalizedSearchValue) {
      return scopedEntries.map(({ entry }) => entry);
    }

    const queryTokens = tokenize(searchTerm);
    if (queryTokens.length === 0) {
      return scopedEntries.map(({ entry }) => entry);
    }

    const ranked: Array<{ entry: GlossaryEntry; score: number }> = [];

    scopedEntries.forEach((item) => {
      let score = item.normalizedText.includes(normalizedSearchValue)
        ? normalizedSearchValue.length * 12
        : 0;

      for (const token of queryTokens) {
        const tokenScore = evaluateTokenMatch(token, item.tokens, item.normalizedText);
        if (tokenScore === null) {
          return;
        }

        score += tokenScore;
      }

      ranked.push({ entry: item.entry, score });
    });

    ranked.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      const copyA = a.entry.copy[language];
      const copyB = b.entry.copy[language];
      return copyA.term.localeCompare(copyB.term);
    });

    return ranked.map(({ entry }) => entry);
  }, [activeCategory, language, normalizedSearchValue, searchIndex, searchTerm]);

  return (
    <div className="bg-surface pb-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 py-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-cta-700 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-accent-500 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 text-center md:px-6 lg:px-8">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
            <BookOpen className="h-4 w-4" />
            {hero.eyebrow}
          </span>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{hero.title}</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl">{hero.subtitle}</p>
          <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">{hero.description}</p>
        </div>
      </section>

      <section className="mx-auto mt-[-4rem] max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="card -mt-20 rounded-3xl border border-white/40 bg-white/90 p-8 shadow-hard backdrop-blur transition dark:border-slate-700 dark:bg-slate-900/90">
          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <label
                htmlFor={searchFieldId}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-slate-300"
              >
                {hero.searchPlaceholder}
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-link-600/80 dark:text-slate-300" />
                <input
                  id={searchFieldId}
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={hero.searchPlaceholder}
                  className="w-full rounded-2xl border border-line-200 bg-white/90 py-4 pl-14 pr-4 text-base text-ink-900 shadow-soft outline-none transition focus:border-primary-900 focus:ring-2 focus:ring-primary-900/15 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full sm:max-w-xs">
                  <label
                    htmlFor={filterFieldId}
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-link-600"
                  >
                    {hero.filterLabel}
                  </label>
                  <div className="relative mt-2">
                    <select
                      id={filterFieldId}
                      value={activeCategory}
                      onChange={(event) =>
                        setActiveCategory(event.target.value as CategoryKey | 'all')
                      }
                      className="w-full appearance-none rounded-2xl border border-line-200 bg-white/80 py-3 pl-4 pr-11 text-sm font-semibold text-ink-700 shadow-soft outline-none transition focus:border-primary-900 focus:ring-2 focus:ring-primary-900/15 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                    >
                      {filterOptions.map(({ key, label }) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-link-600/70 dark:text-slate-300" />
                  </div>
                </div>
                {(activeCategory !== 'all' || hasActiveSearch) && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                    className="inline-flex items-center self-start text-xs font-semibold uppercase tracking-[0.3em] text-link-600 transition hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-slate-200 dark:hover:text-slate-100 sm:self-end"
                  >
                    {hero.resetFilter}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {filteredEntries.length === 0 ? (
            <div className="card col-span-full flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
              <p className="text-lg font-semibold text-brand-900 dark:text-slate-100">
                {hero.noResults}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('');
                }}
                className="btn-secondary text-sm font-semibold"
              >
                {hero.resetFilter}
              </button>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const copy = entry.copy[language];
              const CategoryIcon = categoryIcons[entry.category];
              return (
                <article
                  key={entry.id}
                  className="card rounded-2xl border border-line-200/80 p-6 shadow-medium transition hover:-translate-y-1 hover:shadow-hard dark:border-slate-700"
                >
                  <header className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-900 dark:bg-slate-800 dark:text-slate-100">
                        <entry.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h2 className="text-2xl font-bold text-brand-900 dark:text-slate-50">
                          {copy.term}
                        </h2>
                        <div className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-link-600">
                          <CategoryIcon className="h-4 w-4" />
                          {categoryLabels[entry.category][language]}
                        </div>
                      </div>
                    </div>
                  </header>
                  <p className="mt-4 text-base leading-relaxed text-ink-900 dark:text-slate-200">
                    {copy.shortDefinition}
                  </p>
                  <div className="mt-4 rounded-xl border border-dashed border-line-200 p-4 text-sm text-ink-700 dark:border-slate-700 dark:text-slate-200">
                    <p className="font-semibold text-link-600">{hero.tipLabel}</p>
                    <p className="mt-1 leading-relaxed">{copy.tip}</p>
                  </div>
                  <footer className="mt-4 flex flex-wrap gap-2">
                    {copy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-link-600 dark:bg-slate-800/80 dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </footer>
                </article>
              );
            })
          )}
        </div>

        <div className="mt-10">
          <div className="rounded-2xl border border-dashed border-line-200 bg-primary-50/60 p-6 text-sm leading-relaxed text-ink-700 shadow-soft dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
            {hero.disclaimer}
          </div>
        </div>
      </section>
    </div>
  );
};
