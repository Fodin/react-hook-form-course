import { useTheme, useLanguage, useScrollToTop } from '../hooks'

import styles from './ScrollToTop.module.css'

export function ScrollToTop() {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const scrollToTop = useScrollToTop()

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.button} ${isDark ? styles.buttonDark : styles.buttonLight}`}
    >
      <span>↑</span>
      <span>{t('scroll.top')}</span>
    </button>
  )
}
