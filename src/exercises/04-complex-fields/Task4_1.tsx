import { Controller, useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 4.1: Controller для кастомных компонентов
// ============================================

// TODO: Определите интерфейс CountryForm


// TODO: Создайте кастомный компонент Select


// TODO: Инициализируйте useForm<CountryForm>


// TODO: Создайте onSubmit функцию


export function Task4_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.4.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
