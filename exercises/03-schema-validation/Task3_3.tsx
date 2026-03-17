import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 3.3: Сложные схемы
// Task 3.3: Complex Schemas
// ============================================

// TODO: Создайте сложную схему Zod с объектами, массивами, enum
// TODO: Create complex Zod schema with objects, arrays, enum
// const schema = z.object({ ... })

// TODO: Выведите тип FormData из схемы
// TODO: Derive FormData type from schema
// type FormData = z.infer<typeof schema>

// TODO: Инициализируйте useForm с zodResolver
// TODO: Initialize useForm with zodResolver
// const { register, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) })

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: FormData) => { ... }

export function Task3_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.3.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
