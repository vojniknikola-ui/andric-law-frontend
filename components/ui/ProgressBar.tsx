'use client'
import { useEffect, useState } from 'react'

export const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / totalHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-gray-200 dark:bg-slate-800">
      <div
        className="h-full bg-gradient-to-r from-cta-600 to-accent-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
