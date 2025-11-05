'use client'

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cta-600 focus:px-6 focus:py-3 focus:text-white focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-cta-400"
    >
      Preskoči na sadržaj
    </a>
  )
}
