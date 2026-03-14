import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Task 0.2: Display Data
// ============================================

// TODO: Define LoginForm interface
// interface LoginForm { ... }

export function Task0_2() {
  const { t } = useLanguage()
  
  // TODO: Initialize useForm<LoginForm>
  // const { register, handleSubmit } = useForm<LoginForm>()

  // TODO: Create onSubmit function
  // const onSubmit = (data: LoginForm) => { ... }

  return (
    <div className="exercise-container">
      <h2>{t('task.0.2')}</h2>

      {/* TODO: Create form below */}
      
    </div>
  )
}
