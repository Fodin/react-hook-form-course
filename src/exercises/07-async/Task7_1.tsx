import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 7.1: Async Валидация
// ============================================

// TODO: Определите интерфейс RegistrationForm


// TODO: Определите busyUsernames массив


// TODO: Инициализируйте useForm<RegistrationForm>


// TODO: Создайте состояние для статуса проверки


// TODO: Создайте async функцию validateUsername


// TODO: Создайте onSubmit функцию


export function Task7_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
