'use client'
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { renderRichText } from '@/lib/utils/richTextRenderer';
import { StructuredData } from '@/components/StructuredData';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { firmInfo } from '@/lib/firmInfo';
import { BASE_URL } from '@/lib/seo/constants';
import { BlogPost } from '@/lib/services/blogService';

const markdownComponents: Components = {
  h1: ({ node, children, ...props }) => (
    <h1
      {...props}
      className="text-[34px] sm:text-[38px] md:text-[42px] font-serif font-bold text-brand-900 dark:text-slate-50 mt-10 sm:mt-12 mb-6 leading-[1.15] tracking-tight"
    >
      {children}
    </h1>
  ),
  h2: ({ node, children, ...props }) => (
    <h2
      {...props}
      className="text-[26px] sm:text-[28px] md:text-[30px] font-serif font-semibold text-brand-900 dark:text-slate-50 mt-12 sm:mt-14 mb-5 leading-[1.25]"
    >
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3
      {...props}
      className="text-[20px] sm:text-[22px] md:text-[24px] font-serif font-semibold text-brand-900 dark:text-slate-100 mt-10 sm:mt-12 mb-4 leading-[1.35]"
    >
      {children}
    </h3>
  ),
  h4: ({ node, children, ...props }) => (
    <h4
      {...props}
      className="text-[18px] sm:text-[20px] md:text-[22px] font-serif font-semibold text-brand-900 dark:text-slate-100 mt-8 sm:mt-10 mb-3 leading-[1.4]"
    >
      {children}
    </h4>
  ),
  h5: ({ node, children, ...props }) => (
    <h5
      {...props}
      className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-ink-800 dark:text-slate-200 mt-6 sm:mt-8 mb-2 leading-[1.4]"
    >
      {children}
    </h5>
  ),
  h6: ({ node, children, ...props }) => (
    <h6
      {...props}
      className="text-[15px] sm:text-[16px] md:text-[18px] font-semibold text-ink-700 dark:text-slate-300 mt-6 mb-2 leading-[1.4]"
    >
      {children}
    </h6>
  ),
  p: ({ node, children, ...props }) => (
    <p
      {...props}
      className="text-[17px] sm:text-[18px] text-ink-800 dark:text-slate-100 leading-[1.8] mb-6"
    >
      {children}
    </p>
  ),
  a: ({ node, children, ...props }) => (
    <a
      {...props}
      className="text-link-600 dark:text-accent-300 font-semibold underline decoration-2 underline-offset-[4px] hover:text-link-700 hover:decoration-[3px] active:text-link-800 transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ node, children, ...props }) => (
    <strong {...props} className="font-semibold text-ink-900 dark:text-slate-50">
      {children}
    </strong>
  ),
  b: ({ node, children, ...props }) => (
    <strong {...props} className="font-semibold text-ink-900 dark:text-slate-50">
      {children}
    </strong>
  ),
  em: ({ node, children, ...props }) => (
    <em {...props} className="italic text-ink-700 dark:text-slate-200">
      {children}
    </em>
  ),
  i: ({ node, children, ...props }) => (
    <em {...props} className="italic text-ink-700 dark:text-slate-200">
      {children}
    </em>
  ),
  u: ({ node, children, ...props }) => (
    <u {...props} className="underline decoration-2 underline-offset-2">
      {children}
    </u>
  ),
  del: ({ node, children, ...props }) => (
    <del {...props} className="line-through text-gray-500 dark:text-slate-400">
      {children}
    </del>
  ),
  s: ({ node, children, ...props }) => (
    <span {...props} className="line-through text-gray-500 dark:text-slate-400">
      {children}
    </span>
  ),
  mark: ({ node, children, ...props }) => (
    <mark {...props} className="bg-yellow-200 px-1 rounded">
      {children}
    </mark>
  ),
  sub: ({ node, children, ...props }) => <sub {...props}>{children}</sub>,
  sup: ({ node, children, ...props }) => <sup {...props}>{children}</sup>,
  ul: ({ node, children, ...props }) => (
    <ul {...props} className="list-disc list-outside ml-6 my-6 sm:my-8 space-y-3 sm:space-y-4 marker:text-link-600 dark:marker:text-accent-300">
      {children}
    </ul>
  ),
  ol: ({ node, children, ...props }) => (
    <ol {...props} className="list-decimal list-outside ml-6 my-6 sm:my-8 space-y-3 sm:space-y-4 marker:text-link-600 dark:marker:text-accent-300">
      {children}
    </ol>
  ),
  li: ({ node, children, ...props }) => (
    <li
      {...props}
      className="text-[17px] sm:text-[18px] text-ink-800 dark:text-slate-100 leading-[1.8]"
      style={{ hyphens: 'auto' }}
    >
      {children}
    </li>
  ),
  blockquote: ({ node, children, ...props }) => (
    <blockquote
      {...props}
      className="border-l-[4px] sm:border-l-[5px] border-cta-600/80 bg-cta-50/40 dark:bg-slate-800/60 pl-5 sm:pl-8 pr-4 sm:pr-6 py-5 sm:py-6 my-8 sm:my-10 italic text-[17px] sm:text-[18px] text-ink-800 dark:text-slate-100 leading-[1.75] rounded-r-xl shadow-sm"
      style={{ hyphens: 'auto' }}
    >
      {children}
    </blockquote>
  ),
  code: ({ node, inline, children, ...props }: any) =>
    inline ? (
      <code {...props} className="bg-gray-100 dark:bg-slate-800 px-2 sm:px-2.5 py-0.5 rounded text-[15px] sm:text-[17px] text-brand-800 dark:text-accent-200 font-mono border border-gray-200 dark:border-slate-600">
        {children}
      </code>
    ) : (
      <code {...props} className="block bg-gray-900 text-gray-100 p-4 sm:p-6 rounded-xl overflow-x-auto my-6 sm:my-8 text-[14px] sm:text-[16px] leading-[1.6] shadow-lg">
        {children}
      </code>
    ),
  pre: ({ node, children, ...props }) => <pre {...props} className="bg-gray-900 text-gray-100 p-4 sm:p-6 rounded-xl overflow-x-auto my-6 sm:my-8 shadow-lg -mx-4 sm:mx-0">{children}</pre>,
  img: ({ node, alt, ...props }) => <img {...props} alt={alt ?? ''} className="rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg my-8 sm:my-10 w-full hover:shadow-xl transition-shadow duration-300 -mx-4 sm:mx-0 max-w-[calc(100%+2rem)] sm:max-w-full" />, 
  hr: ({ node, ...props }) => <hr {...props} className="border-0 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-10 sm:my-12" />,
  table: ({ node, children, ...props }) => <div className="overflow-x-auto my-8 sm:my-10 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm -mx-4 sm:mx-0"><table {...props} className="w-full border-collapse min-w-[600px] sm:min-w-0">{children}</table></div>,
  thead: ({ node, children, ...props }) => <thead {...props} className="bg-gradient-to-r from-gray-50 to-gray-100">{children}</thead>,
  th: ({ node, children, ...props }) => <th {...props} className="p-3 sm:p-4 text-left font-bold text-brand-900 border-b-2 border-gray-300 text-[15px] sm:text-[17px] whitespace-nowrap">{children}</th>,
  td: ({ node, children, ...props }) => <td {...props} className="p-3 sm:p-4 text-gray-700 border-b border-gray-200 text-[15px] sm:text-[16px]">{children}</td>,
};

interface ArticleDetailProps {
  slug: string;
  initialArticle?: BlogPost;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ slug, initialArticle }) => {
  const post = initialArticle;
  const isLoading = false;
  const isError = !post;
  const error = isError ? new Error('Article not found') : null;
  const { language } = useTranslations();
  const localeCode = language === 'bs' ? 'bs-BA' : 'en-US';

  const processedContent = useMemo(() => {
    if (!post?.content) {
      return '';
    }

    if (typeof post.content === 'string') {
      return post.content;
    }

    return renderRichText(post.content);
  }, [post?.content]);

  const articleBodyText = useMemo(() => {
    if (!post) {
      return undefined;
    }

    const rawContent = processedContent || post.summary || '';
    if (!rawContent) {
      return undefined;
    }

    return rawContent
      .replace(/<[^>]*>/g, ' ')
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
      .replace(/[#*_`>~]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, [processedContent, post]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Andrić Law`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && post.summary) {
        metaDescription.setAttribute('content', post.summary.substring(0, 155));
      }
    }
  }, [post]);

  const structuredData = useMemo(() => {
    if (!post) {
      return [];
    }

    const articleUrl = `${BASE_URL}/article/${post.slug}`;
    const imageUrl =
      post.imageUrl && post.imageUrl.startsWith('http')
        ? post.imageUrl
        : post.imageUrl
        ? `${BASE_URL}${post.imageUrl}`
        : undefined;

    const blogPosting = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${articleUrl}#blogPosting`,
      inLanguage: localeCode,
      headline: post.title,
      description: post.summary || articleBodyText || post.title,
      image: imageUrl,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      mainEntityOfPage: articleUrl,
      articleBody: articleBodyText,
      wordCount: articleBodyText ? articleBodyText.split(/\s+/).length : undefined,
      isPartOf: {
        '@type': 'Blog',
        name: 'Andrić Law Blog',
        url: `${BASE_URL}/blog`,
      },
      author: {
        '@type': 'Person',
        name: post.author?.name || firmInfo.founder,
      },
      publisher: {
        '@type': 'Organization',
        name: firmInfo.name,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}${firmInfo.logo}`,
        },
      },
    };

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      inLanguage: localeCode,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Početna',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${BASE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: articleUrl,
        },
      ],
    };

    return [breadcrumb, blogPosting];
  }, [articleBodyText, localeCode, post]);

  if (isLoading || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cta-600 mx-auto mb-4"></div>
          <div className="text-xl text-ink-600">Učitavanje članka...</div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-2xl font-bold text-ink-900 mb-2">Greška pri učitavanju</h1>
          <p className="text-ink-600 mb-6">{error instanceof Error ? error.message : 'Članak nije pronađen'}</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-link-600 font-semibold hover:gap-3 transition-all">
            <ArrowLeft size={20} />
            Nazad na blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50">
      <StructuredData data={structuredData} />
      <div className="py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-ink-700 dark:text-slate-200">
              <li><Link href="/" className="hover:text-link-600 transition-colors">Početna</Link></li>
              <ChevronRight size={14} className="text-gray-400" />
              <li><Link href="/blog" className="hover:text-link-600 transition-colors">Blog</Link></li>
              <ChevronRight size={14} className="text-gray-400" />
              <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none" title={post?.title}>{post?.title}</li>
            </ol>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-700 hover:text-link-600 mb-6 font-semibold transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Nazad na blog
          </Link>

          <article className="card overflow-hidden">
            {post.imageUrl && (
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="800"
                  height="384"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}
            
            <div className="p-5 sm:p-6 md:p-8 lg:p-12">
              <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold text-[#1A1A1A] mb-4 font-serif leading-[1.2] tracking-tight">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[15px] text-ink-700 dark:text-slate-200 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500 rounded-full flex items-center justify-center">
                    <Calendar size={18} className="sm:w-5 sm:h-5 text-white" />
                  </div>
                  <time dateTime={post.publishedAt} className="font-medium">
                    Ažurirano: {post.date}
                  </time>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-900 rounded-full flex items-center justify-center">
                      <User size={18} className="sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                )}
              </div>

              {post.summary && (
                <div className="bg-cta-600/10 border-l-4 border-cta-600 p-5 sm:p-6 rounded-r-xl mb-8 sm:mb-10 shadow-sm">
                  <p className="text-[18px] sm:text-[19px] text-[#1A1A1A] leading-[1.65] font-normal">
                    {post.summary}
                  </p>
                </div>
              )}

              <div className="article-content max-w-[720px] md:max-w-[760px] mx-auto px-1 sm:px-0 space-y-6 sm:space-y-7">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                  skipHtml={false}
                  unwrapDisallowed={false}
                >
                  {processedContent}
                </ReactMarkdown>
              </div>
            </div>
          </article>

          <div className="mt-12 card p-8 md:p-10 text-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-white">Trebate pravnu pomoć?</h2>
            <p className="text-lg md:text-xl mb-8 text-white">
              Kontaktirajte nas za besplatnu inicijalnu konsultaciju
            </p>
            <Link
              href="/contact"
              className="btn-secondary inline-block transition-transform duration-300 hover:-translate-y-1"
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
