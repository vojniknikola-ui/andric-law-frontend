import { useLanguage } from './LanguageProvider';
import { TranslationContent, SupportedLanguage } from './translations';

interface UseTranslationsResult {
  t: TranslationContent;
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  toggleLanguage: () => void;
  availableLanguages: SupportedLanguage[];
}

export const useTranslations = (): UseTranslationsResult => {
  const { translations, language, setLanguage, toggleLanguage, availableLanguages } =
    useLanguage();

  return {
    t: translations,
    language,
    setLanguage,
    toggleLanguage,
    availableLanguages,
  };
};
