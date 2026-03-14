import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 5.2: Условные поля
// ============================================

// TODO: Определите интерфейс ContactForm


// TODO: Инициализируйте useForm<ContactForm>


// TODO: Получите contactMethod через watch


// TODO: Создайте onSubmit функцию


export function Task5_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.5.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
