import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 3.4: refine и сообщения
// Task 3.4: refine and Messages
// ============================================

// TODO: Создайте схему Zod с .refine() для cross-field валидации
// TODO: Create Zod schema with .refine() for cross-field validation
// const schema = z.object({ ... }).refine((data) => ..., { message: '...' })

// TODO: Выведите тип FormData из схемы
// TODO: Derive FormData type from schema
// type FormData = z.infer<typeof schema>

// TODO: Инициализируйте useForm с zodResolver
// TODO: Initialize useForm with zodResolver
// const { register, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) })

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: FormData) => { ... }

export function Task3_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.3.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
