import { useEffect, type ReactNode, useCallback } from 'react'

import { translations, type Language, type TranslationKey } from '../translations'
import { LanguageContext } from './useLanguage'
import { useLocalStorage } from './useLocalStorage'

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useLocalStorage<Language>('rhf-course-language', 'ru')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] || translations.en[key] || key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
