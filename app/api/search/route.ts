import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/services/strapiService';
import { searchBlogPosts, type HighlightSnippet } from '@/lib/search/blog-search';
import { buildNormalizedCorpus } from '@/lib/search/text-utils';

export const runtime = 'edge';

const MOCK_LAWS = [
  { id: 1, title: 'Zakon o obligacionim odnosima FBiH', excerpt: 'Osnovni zakon koji reguliše obligacione odnose između fizičkih i pravnih lica. Uređuje ugovore, odgovornost za štetu, naknadu štete i druge obligacione odnose.', slug: 'zor-fbih', category: 'zakoni' },
  { id: 2, title: 'Zakon o radu FBiH', excerpt: 'Reguliše radne odnose između poslodavaca i radnika, prava i obaveze iz radnog odnosa, zaštitu radnika, radno vrijeme, odmor i odsustva.', slug: 'zakon-o-radu', category: 'zakoni' },
  { id: 3, title: 'Zakon o osiguranju od odgovornosti za motorna vozila', excerpt: 'Uređuje obavezno osiguranje od odgovornosti za štetu pričinjenu trećim licima upotrebom motornih vozila. Definiše prava oštećenih, obaveze osiguravača i postupak naknade štete.', slug: 'zakon-osiguranje-vozila', category: 'zakoni' },
  { id: 4, title: 'Zakon o poljoprivrednom zemljištu FBiH', excerpt: 'Reguliše pravni režim poljoprivrednog zemljišta, način korištenja, zaštitu, zakup i prodaju poljoprivrednog zemljišta u Federaciji BiH.', slug: 'zakon-poljoprivredno-zemljiste', category: 'zakoni' },
];

const MOCK_CASES = [
  { id: 5, title: 'Presuda Vrhovnog suda FBiH - Otkaz ugovora o radu', excerpt: 'Analiza presude o nezakonitom otkazu ugovora o radu. Sud je utvrdio da poslodavac nije poštovao proceduru i donio odluku o poništenju otkaza.', slug: 'presuda-otkaz', category: 'sudska-praksa' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';
  const filter = searchParams.get('filter') || 'all';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  let results: any[] = [];
  const normalizedQuery = buildNormalizedCorpus(q);

  const snippetToPlainText = (snippet: HighlightSnippet | null): string | null => {
    if (!snippet) {
      return null;
    }
    const text = snippet.segments.map((segment) => segment.text).join('');
    if (!text) {
      return null;
    }
    return `${snippet.prefix ? '…' : ''}${text}${snippet.suffix ? '…' : ''}`;
  };

  const matchesMockEntry = (title: string, excerpt: string): boolean => {
    if (!normalizedQuery) {
      return false;
    }
    const normalizedTitle = buildNormalizedCorpus(title);
    const normalizedExcerpt = buildNormalizedCorpus(excerpt);
    return normalizedTitle.includes(normalizedQuery) || normalizedExcerpt.includes(normalizedQuery);
  };

  try {
    if (filter === 'all' || filter === 'vijesti-clanci') {
      const posts = await getBlogPosts();
      const matches = searchBlogPosts(posts, q);
      results = [
        ...results,
        ...matches.map((match) => ({
          id: match.post.id,
          title: match.post.title,
          slug: match.post.slug,
          category: 'vijesti-clanci' as const,
          similarity: match.similarity,
          matchedField: match.matchedField,
          snippet: snippetToPlainText(match.snippet ?? null),
          summary: match.post.summary,
          excerpt: match.post.summary || match.post.content,
        })),
      ];
    }

    if (filter === 'all' || filter === 'zakoni') {
      const zakoni = MOCK_LAWS.filter(z =>
        matchesMockEntry(z.title, z.excerpt)
      );
      results = [...results, ...zakoni];
    }

    if (filter === 'all' || filter === 'sudska-praksa') {
      const sudska = MOCK_CASES.filter(s =>
        matchesMockEntry(s.title, s.excerpt)
      );
      results = [...results, ...sudska];
    }

    const limitedResults = results
      .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
      .slice(0, 10);

    return NextResponse.json(
      { results: limitedResults },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
