import { Link } from 'react-router-dom';

import { useLanguage, useTheme } from 'src/hooks';

import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import type { TranslationKey } from '../translations';

import styles from './LevelSidebar.module.css';

export interface LevelInfo {
  id: string;
  name: string;
  descriptionKey: string;
}

interface LevelSidebarProps {
  levels: LevelInfo[];
  currentLevel: string;
}

export function LevelSidebar({ levels, currentLevel }: LevelSidebarProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <div>
      <nav className={styles.nav}>
        {levels.map(level => (
          <Link
            key={level.id}
            to={`/level/${level.id}`}
            className={`
              ${styles.button}
              ${
              currentLevel === level.id
                ? isDark
                  ? styles.buttonActiveDark
                  : styles.buttonActiveLight
                : isDark
                  ? styles.buttonInactiveDark
                  : styles.buttonInactiveLight
            }
            `}
          >
            <div className={styles.buttonTitle}>
              {t('nav.level')} {level.id}:{' '}
              {t(`nav.${level.name.toLowerCase()}` as TranslationKey) || level.name}
            </div>
            <div className={styles.buttonDescription}>
              {t(`level.${level.id}.desc` as TranslationKey)}
            </div>
          </Link>
        ))}
      </nav>

      <div className={`${styles.toggles} ${isDark ? styles.togglesDark : styles.togglesLight}`}>
        <ThemeToggle/>
        <LanguageToggle/>
      </div>
    </div>
  );
}
