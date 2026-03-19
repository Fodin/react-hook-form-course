import { useLanguage } from 'src/hooks'

// ============================================
// Задание 0.1: Первая форма
// Task 0.1: First Form
// ============================================

// TODO: Определите интерфейс LoginForm с полями email и password
// TODO: Define LoginForm interface with email and password fields

// TODO: Инициализируйте useForm с типом LoginForm
// TODO: Initialize useForm with LoginForm type

// TODO: Создайте функцию onSubmit для вывода данных в console.log
// TODO: Create onSubmit function to log form data via console.log

export function Task0_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.0.1')}</h2>

      {/* TODO: Создайте форму с полями email и password и кнопкой "Войти" */}
      {/* TODO: Create form with email and password fields and "Войти" button */}

    </div>
  )
}
