'use client'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const allItems = [{ name: 'Početna', url: '/' }, ...items]

  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {allItems.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
              {index === allItems.length - 1 ? (
                <span className="font-semibold text-brand-900 dark:text-slate-100">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-ink-600 hover:text-cta-600 dark:text-slate-300 dark:hover:text-cta-400 transition-colors"
                >
                  {index === 0 ? <Home size={16} /> : item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
