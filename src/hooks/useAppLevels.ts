import { useState, useCallback } from 'react'

type Level = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

interface LevelInfo {
  id: Level
  name: string
  description: string
}

const LEVELS: LevelInfo[] = [
  { id: '0', name: 'Setup', description: 'Настройка и первая форма' },
  { id: '1', name: 'Основы', description: 'useForm, register, handleSubmit' },
  { id: '2', name: 'Валидация', description: 'Built-in и custom валидация' },
  { id: '3', name: 'Схемы', description: 'Zod и Yup валидация' },
  { id: '4', name: 'Сложные поля', description: 'Controller, file upload' },
  { id: '5', name: 'Динамические', description: 'useFieldArray, wizard' },
  { id: '6', name: 'UX', description: 'Dirty, reset, a11y, performance' },
  { id: '7', name: 'Асинхронность', description: 'Async validation, API' },
  { id: '8', name: 'Продвинутые', description: 'Интеграции и финальный проект' },
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
