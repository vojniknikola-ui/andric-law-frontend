import { Fragment } from 'react';
import SearchFilters from './SearchFilters';
import { getBlogPosts } from '@/lib/services/strapiService';
import {
  searchBlogPosts,
  type BlogSearchResult,
  type HighlightSegment,
  type HighlightSnippet,
} from '@/lib/search/blog-search';
import { buildNormalizedCorpus } from '@/lib/search/text-utils';

type Category = 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' | 'all';

type SearchResultItem = {
  id: string;
  title: string;
  slug: string;
  category: Category;
  href: string;
  excerpt?: string | null;
  similarity?: number;
  matchField?: 'title' | 'summary' | 'content' | null;
  titleSegments?: HighlightSegment[];
  snippet?: HighlightSnippet | null;
};

const MOCK_DATA = {
  zakoni: [
    {
      id: 1,
      title: 'Zakon o obligacionim odnosima FBiH',
      excerpt:
        'Osnovni zakon koji reguliše obligacione odnose između fizičkih i pravnih lica. Uređuje ugovore, odgovornost za štetu, naknadu štete i druge obligacione odnose.',
      slug: 'zor-fbih',
    },
    {
      id: 2,
      title: 'Zakon o radu FBiH',
      excerpt:
        'Reguliše radne odnose između poslodavaca i radnika, prava i obaveze iz radnog odnosa, zaštitu radnika, radno vrijeme, odmor i odsustva.',
      slug: 'zakon-o-radu',
    },
    {
      id: 3,
      title: 'Zakon o osiguranju od odgovornosti za motorna vozila',
      excerpt:
        'Uređuje obavezno osiguranje od odgovornosti za štetu pričinjenu trećim licima upotrebom motornih vozila. Definiše prava oštećenih, obaveze osiguravača i postupak naknade štete.',
      slug: 'zakon-osiguranje-vozila',
    },
    {
      id: 4,
      title: 'Zakon o poljoprivrednom zemljištu FBiH',
      excerpt:
        'Reguliše pravni režim poljoprivrednog zemljišta, način korištenja, zaštitu, zakup i prodaju poljoprivrednog zemljišta u Federaciji BiH.',
      slug: 'zakon-poljoprivredno-zemljiste',
    },
  ],
  'sudska-praksa': [
    {
      id: 5,
      title: 'Presuda Vrhovnog suda FBiH - Otkaz ugovora o radu',
      excerpt:
        'Analiza presude o nezakonitom otkazu ugovora o radu. Sud je utvrdio da poslodavac nije poštovao proceduru i donio odluku o poništenju otkaza.',
      slug: 'presuda-otkaz',
    },
  ],
} as const;

const MATCH_FIELD_LABEL: Record<'title' | 'summary' | 'content', string> = {
  title: 'Naslov',
  summary: 'Sažetak',
  content: 'Sadržaj',
};

const fallbackExcerpt = (value?: string | null, maxLength = 200): string => {
  if (!value) {
    return '';
  }
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
};

const renderSegments = (segments: HighlightSegment[] | undefined, fallback: string) => {
  if (!segments || segments.length === 0) {
    return fallback;
  }
  return segments.map((segment, index) =>
    segment.highlight ? (
      <mark key={`${segment.text}-${index}`} className="rounded-sm bg-yellow-100 px-0.5 text-inherit">
        {segment.text}
      </mark>
    ) : (
      <Fragment key={`${segment.text}-${index}`}>{segment.text}</Fragment>
    ),
  );
};

const renderSnippet = (snippet: HighlightSnippet | null, fallback?: string | null) => {
  if (!snippet) {
    if (!fallback) {
      return null;
    }
    return fallbackExcerpt(fallback);
  }

  return (
    <>
      {snippet.prefix ? '…' : ''}
      {snippet.segments.map((segment, index) =>
        segment.highlight ? (
          <mark key={`${segment.text}-${index}`} className="rounded-sm bg-yellow-100 px-0.5 text-inherit">
            {segment.text}
          </mark>
        ) : (
          <Fragment key={`${segment.text}-${index}`}>{segment.text}</Fragment>
        ),
      )}
      {snippet.suffix ? '…' : ''}
    </>
  );
};

const normalizeBlogResults = (results: BlogSearchResult[]): SearchResultItem[] =>
  results.map((result) => ({
    id: `blog-${result.post.id}`,
    title: result.post.title,
    slug: result.post.slug,
    category: 'vijesti-clanci',
    href: `/article/${result.post.slug}`,
    excerpt: result.post.summary || result.post.content,
    similarity: result.similarity,
    matchField: result.matchedField,
    titleSegments: result.titleSegments,
    snippet: result.snippet ?? null,
  }));

const searchMockSection = (
  entries: readonly { id: number; title: string; excerpt: string; slug: string }[],
  query: string,
  category: Extract<Category, 'zakoni' | 'sudska-praksa'>,
): SearchResultItem[] => {
  const normalizedQuery = buildNormalizedCorpus(query);
  if (!normalizedQuery) {
    return [];
  }

  return entries
    .filter((entry) => {
      const normalizedTitle = buildNormalizedCorpus(entry.title);
      const normalizedExcerpt = buildNormalizedCorpus(entry.excerpt);
      return normalizedTitle.includes(normalizedQuery) || normalizedExcerpt.includes(normalizedQuery);
    })
    .map((entry) => ({
      id: `${category}-${entry.id}`,
      title: entry.title,
      slug: entry.slug,
      category,
      href: getCategoryLink({ category, slug: entry.slug }),
      excerpt: entry.excerpt,
    }));
};

async function searchContent(query: string, filter: Category): Promise<SearchResultItem[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [];
  }

  const includeBlog = filter === 'all' || filter === 'vijesti-clanci';
  const includeZakoni = filter === 'all' || filter === 'zakoni';
  const includeCases = filter === 'all' || filter === 'sudska-praksa';

  const results: SearchResultItem[] = [];

  if (includeBlog) {
    const posts = await getBlogPosts();
    const blogResults = searchBlogPosts(posts, trimmedQuery);
    results.push(...normalizeBlogResults(blogResults));
  }

  if (includeZakoni) {
    results.push(...searchMockSection(MOCK_DATA.zakoni, trimmedQuery, 'zakoni'));
  }

  if (includeCases) {
    results.push(...searchMockSection(MOCK_DATA['sudska-praksa'], trimmedQuery, 'sudska-praksa'));
  }

  return results
    .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
    .slice(0, 20);
}

export default async function SearchResults({
  query,
  filter,
}: {
  query?: string;
  filter?: string;
}) {
  if (!query) {
    return <p className="text-gray-600">Unesite pojam za pretragu</p>;
  }

  const activeFilter = (filter || 'vijesti-clanci') as Category;
  const results = await searchContent(query, activeFilter);

  return (
    <>
      <SearchFilters currentFilter={activeFilter} query={query} />

      <div className="mt-8">
        {results.length === 0 ? (
          <p className="text-gray-600">Nema rezultata za "{query}"</p>
        ) : (
          <>
            <p className="mb-4 text-sm text-gray-600">Pronađeno {results.length} rezultata</p>
            <div className="space-y-4">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.href}
                  className="block rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded px-2 py-1 text-xs ${getCategoryColor(result.category)}`}>
                      {getCategoryLabel(result.category)}
                    </span>
                    {typeof result.similarity === 'number' && (
                      <span className="text-xs font-medium text-blue-700">
                        Sličnost {(result.similarity ?? 0).toFixed(0)}%
                        {result.matchField ? ` · ${MATCH_FIELD_LABEL[result.matchField]}` : ''}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    {renderSegments(result.titleSegments, result.title)}
                  </h2>
                  <p className="line-clamp-3 text-gray-600">
                    {renderSnippet(result.snippet, result.excerpt)}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function getCategoryLink(result: { category: Category; slug: string }) {
  if (result.category === 'zakoni') return `/zakoni/${result.slug}`;
  if (result.category === 'sudska-praksa') return `/sudska-praksa/${result.slug}`;
  return `/article/${result.slug}`;
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'zakoni':
      return 'bg-blue-100 text-blue-800';
    case 'sudska-praksa':
      return 'bg-purple-100 text-purple-800';
    case 'vijesti-clanci':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getCategoryLabel(category: string) {
  switch (category) {
    case 'zakoni':
      return 'Zakoni i podzakonski akti';
    case 'sudska-praksa':
      return 'Sudska praksa';
    case 'vijesti-clanci':
      return 'Vijesti i članci';
    default:
      return 'Ostalo';
  }
}
