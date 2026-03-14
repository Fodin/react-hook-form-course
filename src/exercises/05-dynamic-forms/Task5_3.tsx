import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 5.3: Зависимые поля
// ============================================

// TODO: Определите интерфейс LocationForm


// TODO: Определите citiesByCountry объект


// TODO: Инициализируйте useForm<LocationForm>


// TODO: Получите country через watch


// TODO: Создайте onSubmit функцию


export function Task5_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.5.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
