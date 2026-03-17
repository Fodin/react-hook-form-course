import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 6.5: Performance
// Task 6.5: Performance
// ============================================

// TODO: Определите интерфейс PerformanceForm
// TODO: Define PerformanceForm interface
// interface PerformanceForm { ... }

// TODO: Инициализируйте useForm<PerformanceForm>
// TODO: Initialize useForm<PerformanceForm>
// const { register, handleSubmit, watch } = useForm<PerformanceForm>()

// TODO: Получите значения через watch
// TODO: Get values via watch
// const values = watch()

// TODO: Считайте рендеры
// TODO: Count renders
// const [renders, setRenders] = useState(0)

// TODO: Используйте useMemo для оптимизации
// TODO: Use useMemo for optimization
// const memoizedValue = useMemo(() => { ... }, [values])

export function Task6_5() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.6.5')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
