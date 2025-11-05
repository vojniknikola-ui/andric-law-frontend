import React from 'react';
import { useTranslations } from '@/lib/i18n/useTranslations';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, availableLanguages, t } = useTranslations();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs font-semibold uppercase tracking-wide text-ink-500 sm:block dark:text-slate-400">
        {t.language.switcherLabel}
      </span>
      <div className="flex rounded-full border border-line-200 bg-white p-1 shadow-sm dark:border-slate-600 dark:bg-slate-800">
        {availableLanguages.map((option) => {
          const isActive = option === language;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setLanguage(option)}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cta-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
                isActive
                  ? 'bg-brand-900 text-white dark:bg-slate-600'
                  : 'text-ink-600 hover:text-brand-900 dark:text-slate-200 dark:hover:text-slate-50'
              }`}
              aria-pressed={isActive}
              aria-label={t.language.toggleTo[option]}
            >
              {option.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
