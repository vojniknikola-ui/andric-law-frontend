'use client'
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { StructuredData } from '@/components/StructuredData';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { BASE_URL } from '@/lib/seo/constants';
import { BlogPost } from '@/lib/services/blogService';

interface BlogProps {
  initialPosts?: BlogPost[]
}

const Blog: React.FC<BlogProps> = ({ initialPosts = [] }) => {
  const posts = initialPosts;
  const isLoading = false;
  const isError = false;
  const { language } = useTranslations();
  const localeCode = language === 'bs' ? 'bs-BA' : 'en-US';

  useEffect(() => {
    document.title = 'Članci - Andrić Law | Pravni savjeti i vijesti';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Najnovije vijesti, članci i stručni savjeti iz svijeta prava. Pratiš promjene u zakonodavstvu i praktične vodiče.');
    }
  }, []);

  const structuredData = useMemo(() => {
    if (!posts || posts.length === 0) {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          inLanguage: localeCode,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Početna', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
          ],
        },
      ];
    }

    const itemList = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      inLanguage: localeCode,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${BASE_URL}/article/${post.slug}`,
        name: post.title,
      })),
    };

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        inLanguage: localeCode,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Početna', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
        ],
      },
      itemList,
    ];
  }, [localeCode, posts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cta-600 mx-auto mb-4"></div>
          <div className="text-xl text-ink-600">Učitavanje članaka...</div>
        </div>
      </div>
    );
  }

  if (isError || !posts) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-2xl font-bold text-ink-900 mb-2">Greška pri učitavanju</h1>
          <p className="text-ink-600 mb-6">Došlo je do greške pri učitavanju članaka.</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Pokušaj ponovo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StructuredData data={structuredData} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white font-semibold text-sm uppercase tracking-[0.4em] animate-hero">Članci</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-2 font-serif text-white drop-shadow-lg animate-hero animation-delay-200">Pravni savjeti i vijesti</h1>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto animate-hero animation-delay-400">Najnovije vijesti, članci i savjeti iz svijeta prava</p>
        </div>
      </section>

      <div className="py-12 md:py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-ink-600">Trenutno nema objavljenih članaka.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map(post => (
                <article
                  key={post.id}
                  className="card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                >
                  {post.imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        width="400"
                        height="224"
                      />
                    </div>
                  )}
                  <div className="p-6 flex h-full flex-col">
                    <h2 className="text-[22px] font-semibold text-brand-900 mb-4 font-serif leading-snug tracking-tight group-hover:text-link-600 transition">
                      <Link href={`/article/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    {post.summary && (
                      <p className="text-ink-800 dark:text-slate-100 mb-5 line-clamp-4 text-[16px] leading-[1.75]">
                        {post.summary}
                      </p>
                    )}
                    
                    <div className="mt-auto flex items-center gap-4 text-sm text-ink-700 dark:text-slate-200 mb-5 pb-4 border-t border-line-200/80 dark:border-slate-700 pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-cta-600" />
                        <span>{post.date}</span>
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User size={16} className="text-cta-600" />
                          <span>{post.author.name}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/article/${post.slug}`}
                        className="inline-flex items-center gap-2 text-link-600 font-semibold hover:gap-3 transition-all"
                      >
                        Pročitaj više
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
