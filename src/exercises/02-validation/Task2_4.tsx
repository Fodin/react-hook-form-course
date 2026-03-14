import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 2.4: Cross-field валидация
// ============================================

// TODO: Определите интерфейс ChangePasswordForm


// TODO: Инициализируйте useForm<ChangePasswordForm>


// TODO: Получите newPassword через watch для валидации confirmPassword


// TODO: Создайте onSubmit функцию


export function Task2_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.2.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
