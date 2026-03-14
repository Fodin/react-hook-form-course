import { useState, useCallback } from 'react'
import { useLanguage } from '../hooks/useLanguage'

type Level = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

interface LevelInfo {
  id: Level
  name: string
  descriptionKey: string
}

const LEVELS: LevelInfo[] = [
  { id: '0', name: 'setup', descriptionKey: 'level.0.desc' },
  { id: '1', name: 'basics', descriptionKey: 'level.1.desc' },
  { id: '2', name: 'validation', descriptionKey: 'level.2.desc' },
  { id: '3', name: 'schemas', descriptionKey: 'level.3.desc' },
  { id: '4', name: 'complex', descriptionKey: 'level.4.desc' },
  { id: '5', name: 'dynamic', descriptionKey: 'level.5.desc' },
  { id: '6', name: 'ux', descriptionKey: 'level.6.desc' },
  { id: '7', name: 'async', descriptionKey: 'level.7.desc' },
  { id: '8', name: 'advanced', descriptionKey: 'level.8.desc' },
]

interface UseAppLevelsReturn {
  currentLevel: Level
  levels: LevelInfo[]
  setCurrentLevel: (level: string) => void
}

/**
 * Хук для управления уровнями приложения
 */
export function useAppLevels(): UseAppLevelsReturn {
  const [currentLevel, setCurrentLevel] = useState<Level>('0')

  const handleSetCurrentLevel = useCallback((level: string) => {
    setCurrentLevel(level as Level)
  }, [])

  return {
    currentLevel,
    levels: LEVELS,
    setCurrentLevel: handleSetCurrentLevel,
  }
}
