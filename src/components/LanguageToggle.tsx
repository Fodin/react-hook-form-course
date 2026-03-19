import { useLanguage } from '../hooks'

import styles from './LanguageToggle.module.css'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  return (
    <button
      onClick={toggleLanguage}
      className={styles.button}
      title={`Switch to ${language === 'ru' ? 'English' : 'Русский'}`}
    >
      {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
    </button>
  )
}
