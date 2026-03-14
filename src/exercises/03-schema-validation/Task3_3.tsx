import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 3.3: Сложные схемы
// ============================================

// TODO: Создайте сложную схему Zod с объектами, массивами, enum


// TODO: Выведите тип FormData из схемы


// TODO: Инициализируйте useForm с zodResolver


// TODO: Создайте onSubmit функцию


export function Task3_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.3.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
