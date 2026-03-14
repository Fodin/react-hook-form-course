import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 3.2: Валидация с Yup
// ============================================

// TODO: Создайте схему Yup


// TODO: Выведите тип FormData из схемы


// TODO: Инициализируйте useForm с yupResolver


// TODO: Создайте onSubmit функцию


export function Task3_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.3.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
