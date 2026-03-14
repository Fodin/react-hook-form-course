import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Task 1.1: Registration Form
// ============================================

// TODO: Define RegistrationForm interface
// interface RegistrationForm { ... }

export function Task1_1() {
  const { t } = useLanguage()
  
  // TODO: Initialize useForm<RegistrationForm>
  // const { register, handleSubmit } = useForm<RegistrationForm>()

  // TODO: Create onSubmit function
  // const onSubmit = (data: RegistrationForm) => { ... }

  return (
    <div className="exercise-container">
      <h2>{t('task.1.1')}</h2>

      {/* TODO: Create form below */}
      
    </div>
  )
}
