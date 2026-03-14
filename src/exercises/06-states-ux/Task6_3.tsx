import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 6.3: Focus Management
// ============================================

// TODO: Определите интерфейс LoginForm


// TODO: Инициализируйте useForm<LoginForm>


// TODO: Создайте refs для полей


// TODO: Используйте useEffect для фокуса на первом ошибочном поле


// TODO: Создайте onSubmit функцию


export function Task6_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.6.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
