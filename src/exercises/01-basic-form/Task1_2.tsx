import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 1.2: Watch для отслеживания
// ============================================

// TODO: Определите интерфейс LoginForm


// TODO: Инициализируйте useForm<LoginForm>


// TODO: Используйте watch для отслеживания значений


// TODO: Создайте onSubmit функцию


export function Task1_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.1.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
