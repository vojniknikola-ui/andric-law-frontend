import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'articles/' });
    
    const articles = await Promise.all(
      blobs
        .filter(blob => blob.pathname.endsWith('.json'))
        .map(async (blob) => {
          const response = await fetch(blob.url);
          return response.json();
        })
    );

    return NextResponse.json(articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const article = await request.json();
    const slug = article.slug || `article-${Date.now()}`;
    
    const articleData = {
      ...article,
      id: slug,
      slug,
      publishedAt: article.publishedAt || new Date().toISOString(),
      date: new Date().toLocaleDateString('bs-BA'),
    };

    await put(`articles/${slug}.json`, JSON.stringify(articleData), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json(articleData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
