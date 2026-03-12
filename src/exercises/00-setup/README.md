# Уровень 0: Setup

## Введение

Добро пожаловать в курс по **React Hook Form**! Это библиотека для управления формами в React, которая предоставляет простой и эффективный способ работы с формами.

### Почему React Hook Form?

- 🚀 **Производительность** — минимальное количество ре-рендеров
- 🎣 **Hooks API** — удобный и интуитивный API
- 📦 **Маленький размер** — всего ~12KB
- 🔧 **TypeScript** — отличная поддержка типов
- ✅ **Валидация** — встроенная и через схемы (Zod, Yup)

## Установка зависимостей

```bash
npm install react-hook-form @hookform/resolvers zod yup
```

## Базовый пример

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit">Отправить</button>
    </form>
  )
}
```

## Основные концепции

### `useForm<T>`

Главный хук, который возвращает объекты и функции для работы с формой:

```tsx
const {
  register,           // Для регистрации полей
  handleSubmit,       // Для обработки отправки
  formState,          // Состояние формы (errors, isValid, и т.д.)
  watch,              // Для отслеживания значений
  setValue,           // Для установки значений
  reset,              // Для сброса формы
} = useForm<FormData>()
```

### `register`

Регистрирует поле в форме:

```tsx
<input {...register('fieldName')} />
```

### `handleSubmit`

Обработчик отправки формы:

```tsx
const onSubmit = (data: FormData) => {
  console.log(data) // Данные формы
}

<form onSubmit={handleSubmit(onSubmit)}>
```

---

## 📝 Задания

Переходите к файлу `task.md` для получения заданий.
