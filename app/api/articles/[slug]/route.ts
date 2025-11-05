import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { blobs } = await list({ prefix: `articles/${slug}.json` });
    
    if (blobs.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const response = await fetch(blobs[0].url);
    const article = await response.json();

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
