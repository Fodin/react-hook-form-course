import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Task 0.1: First Form
// ============================================

// TODO: Define LoginForm interface
// interface LoginForm { ... }

export function Task0_1() {
  const { t } = useLanguage()
  
  // TODO: Initialize useForm<LoginForm>
  // const { register, handleSubmit } = useForm<LoginForm>()

  // TODO: Create onSubmit function
  // const onSubmit = (data: LoginForm) => { ... }

  return (
    <div className="exercise-container">
      <h2>{t('task.0.1')}</h2>

      {/* TODO: Create form below */}
      
    </div>
  )
}
