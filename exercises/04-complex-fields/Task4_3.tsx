import { useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 4.3: Checkbox
// Task 4.3: Checkbox
// ============================================

// TODO: Определите интерфейс SkillsForm
// TODO: Define SkillsForm interface
// interface SkillsForm { ... }

// TODO: Инициализируйте useForm<SkillsForm>
// TODO: Initialize useForm<SkillsForm>
// const { register, handleSubmit } = useForm<SkillsForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: SkillsForm) => { ... }

export function Task4_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.4.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
