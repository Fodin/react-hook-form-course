import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import styles from './LanguageToggle.module.css'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`${styles.button} ${isDark ? styles.buttonDark : styles.buttonLight}`}
      title={`Switch to ${language === 'ru' ? 'English' : 'Русский'}`}
    >
      {language === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
    </button>
  )
}
