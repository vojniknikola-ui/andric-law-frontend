import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SupportedLanguage, translations, TranslationContent } from './translations';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  toggleLanguage: () => void;
  translations: TranslationContent;
  availableLanguages: SupportedLanguage[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'andriclaw.preferredLanguage';

const supportedLanguages = Object.keys(translations) as SupportedLanguage[];

const isSupportedLanguage = (value: unknown): value is SupportedLanguage =>
  typeof value === 'string' && supportedLanguages.includes(value as SupportedLanguage);

const detectInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return 'bs';
  }

  const urlParam = new URL(window.location.href).searchParams.get('lang');
  if (isSupportedLanguage(urlParam)) {
    return urlParam;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isSupportedLanguage(stored)) {
    return stored;
  }

  const navigatorLanguages = window.navigator.languages ?? [window.navigator.language];
  const match = navigatorLanguages.find((lang) => lang?.toLowerCase().startsWith('en'));
  if (match) {
    return 'en';
  }

  return 'bs';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => detectInitialLanguage());

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

      const url = new URL(window.location.href);
      if (language === 'bs') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', language);
      }
      const newUrl = `${url.pathname}${url.search}${url.hash}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [language]);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const ensureAlternateLink = (lang: SupportedLanguage) => {
      const attributeSelector = `link[rel="alternate"][hreflang="${lang}"]`;
      let linkElement = document.head.querySelector<HTMLLinkElement>(attributeSelector);
      const url = new URL(window.location.href);
      if (lang === 'bs') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }

      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'alternate');
        linkElement.setAttribute('hreflang', lang);
        document.head.appendChild(linkElement);
      }

      linkElement.href = `${url.origin}${url.pathname}${url.search}`;
    };

    supportedLanguages.forEach(ensureAlternateLink);
  }, [language]);

  const setLanguage = useCallback((newLanguage: SupportedLanguage) => {
    setLanguageState((current) => (current === newLanguage ? current : newLanguage));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === 'bs' ? 'en' : 'bs'));
  }, []);

  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      translations: translations[language],
      availableLanguages: supportedLanguages,
    }),
    [language, setLanguage, toggleLanguage],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
