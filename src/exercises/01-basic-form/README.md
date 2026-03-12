# Уровень 1: Основы — useForm, register, handleSubmit, formState

## Введение

На этом уровне вы глубоко изучите основные инструменты React Hook Form. После завершения вы сможете создавать полноценные формы с различными типами полей и управлять их состоянием.

---

## 1. Хук `useForm` — полное руководство

### Что возвращает `useForm`?

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  firstName: string
  lastName: string
  email: string
  age: number
  bio: string
  website: string
}

function MyForm() {
  const {
    register,           // Для регистрации полей
    handleSubmit,       // Для обработки отправки
    watch,              // Для отслеживания значений
    formState,          // Объект состояния формы
    setValue,           // Для установки значения поля
    getValues,          // Для получения значений
    reset,              // Для сброса формы
    trigger,            // Для ручной валидации
    setError,           // Для установки ошибки
    clearErrors,        // Для очистки ошибок
  } = useForm<FormData>()

  return <form>...</form>
}
```

### Параметры `useForm`

```tsx
useForm<FormData>({
  mode: 'onChange',        // Когда запускать валидацию
  reValidateMode: 'onChange', // Когда перевалидировать
  defaultValues: {         // Значения по умолчанию
    firstName: '',
    lastName: '',
  },
  shouldFocusError: true,  // Фокус на первом ошибочном поле
  criteriaMode: 'firstError', // Показывать первую или все ошибки
})
```

**Режимы валидации:**

| mode | Описание |
|------|----------|
| `'onSubmit'` | Валидация только при отправке (по умолчанию) |
| `'onChange'` | Валидация при каждом изменении |
| `'onBlur'` | Валидация при потере фокуса |
| `'all'` | Валидация при изменении и потере фокуса |

---

## 2. Регистрация полей через `register`

### Базовая регистрация

```tsx
<input {...register('fieldName')} />
```

### Регистрация с опциями

```tsx
<input
  {...register('age', {
    required: 'Возраст обязателен',
    min: { value: 18, message: 'Минимум 18 лет' },
    max: { value: 100, message: 'Максимум 100 лет' },
    valueAsNumber: true,  // Преобразовать в число
  })}
/>
```

### Обработчики событий

```tsx
<input
  {...register('email', {
    onChange: (e) => {
      console.log('Изменение:', e.target.value)
    },
    onBlur: (e) => {
      console.log('Потеря фокуса:', e.target.value)
    },
    setValueAs: (value) => value.trim(),  // Обработка перед установкой
  })}
/>
```

---

## 3. Различные типы полей

### Текстовые поля

```tsx
// Обычный текст
<input {...register('firstName')} />

// Email
<input type="email" {...register('email')} />

// Пароль
<input type="password" {...register('password')} />

// URL
<input type="url" {...register('website')} />

// Телефон
<input type="tel" {...register('phone')} />
```

### Числовые поля

```tsx
// Число с valueAsNumber
<input
  type="number"
  {...register('age', { valueAsNumber: true })}
/>

// Диапазон
<input
  type="range"
  min="0"
  max="100"
  {...register('rating', { valueAsNumber: true })}
/>
```

### Textarea

```tsx
<textarea
  {...register('bio')}
  rows={4}
  cols={50}
/>
```

### Select

```tsx
<select {...register('country')}>
  <option value="">Выберите страну</option>
  <option value="ru">Россия</option>
  <option value="us">USA</option>
  <option value="de">Germany</option>
</select>
```

### Radio

```tsx
<div>
  <label>
    <input type="radio" value="male" {...register('gender')} />
    Мужской
  </label>
  <label>
    <input type="radio" value="female" {...register('gender')} />
    Женский
  </label>
</div>
```

### Checkbox

```tsx
// Одиночный (boolean)
<input type="checkbox" {...register('agree')} />

// Множественный выбор (массив)
const { watch, setValue } = useForm()
const skills = watch('skills') || []

<input
  type="checkbox"
  value="react"
  checked={skills.includes('react')}
  onChange={(e) => {
    if (e.target.checked) {
      setValue('skills', [...skills, 'react'])
    } else {
      setValue('skills', skills.filter(s => s !== 'react'))
    }
  }}
/>
```

---

## 4. `formState` — состояние формы

### Получение состояния

```tsx
const { formState: { 
  errors,           // Объект ошибок валидации
  isDirty,          // Форма изменена
  dirtyFields,      // Какие поля изменены
  touchedFields,    // Какие поля затронуты
  isSubmitting,     // Идёт отправка
  isValid,          // Форма валидна
  isValidating,     // Идёт валидация
  submitCount,      // Количество отправок
} } = useForm()
```

### Пример использования

```tsx
function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormData>({ mode: 'onChange' })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Обязательно' })} />
      {errors.email && <span className="error">{errors.email.message}</span>}
      
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  )
}
```

---

## 5. `watch` — отслеживание значений

### Отслеживание одного поля

```tsx
const firstName = watch('firstName')
```

### Отслеживание нескольких полей

```tsx
const [firstName, lastName] = watch(['firstName', 'lastName'])
```

### Отслеживание всех полей

```tsx
const allValues = watch()
console.log(allValues) // { firstName: 'John', lastName: 'Doe' }
```

### Значение по умолчанию

```tsx
const value = watch('fieldName', 'default value')
```

### Пример: сила пароля в реальном времени

```tsx
function PasswordForm() {
  const { register, watch } = useForm()
  const password = watch('password', '')

  const getStrength = () => {
    if (password.length === 0) return { label: '—', color: '#888' }
    if (password.length < 6) return { label: 'Слабый', color: '#f44336' }
    if (password.length < 10) return { label: 'Средний', color: '#ff9800' }
    return { label: 'Сильный', color: '#4caf50' }
  }

  const strength = getStrength()

  return (
    <div>
      <input type="password" {...register('password')} />
      <div style={{ color: strength.color }}>
        Сила пароля: {strength.label}
      </div>
    </div>
  )
}
```

---

## 6. `setValue` и `getValues`

### `setValue` — установка значения

```tsx
const { setValue } = useForm()

// Установить значение
setValue('firstName', 'John')

// С опциями
setValue('firstName', 'John', {
  shouldValidate: true,  // Запустить валидацию
  shouldDirty: true,     // Пометить как dirty
  shouldTouch: true,     // Пометить как touched
})
```

### `getValues` — получение значений

```tsx
const { getValues } = useForm()

// Получить все значения
const allValues = getValues()

// Получить конкретное поле
const email = getValues('email')

// Получить несколько полей
const [email, password] = getValues(['email', 'password'])
```

### Пример: кнопки управления формой

```tsx
function ProductForm() {
  const { register, setValue, getValues, reset } = useForm()

  const fillTestData = () => {
    setValue('title', 'Тестовый товар')
    setValue('description', 'Описание')
    setValue('price', 999)
  }

  const doublePrice = () => {
    const currentPrice = getValues('price')
    setValue('price', currentPrice * 2)
  }

  return (
    <form>
      <input {...register('title')} />
      <input {...register('price', { valueAsNumber: true })} />
      
      <button type="button" onClick={fillTestData}>
        Заполнить тестовыми
      </button>
      <button type="button" onClick={doublePrice}>
        Удвоить цену
      </button>
      <button type="button" onClick={() => reset()}>
        Очистить
      </button>
    </form>
  )
}
```

---

## 7. `reset` — сброс формы

```tsx
const { reset } = useForm()

// Сброс к начальным значениям
reset()

// Сброс с новыми значениями
reset({
  firstName: 'John',
  lastName: 'Doe',
})

// С опциями
reset(values, {
  keepErrors: false,
  keepDirty: false,
  keepValues: false,
})
```

---

## Полный пример: Форма регистрации

```tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  age: number
  bio: string
  website: string
}

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
    setValue,
    reset,
  } = useForm<RegistrationForm>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 18,
      bio: '',
      website: '',
    },
  })

  const [submittedData, setSubmittedData] = useState<RegistrationForm | null>(null)

  const onSubmit = (data: RegistrationForm) => {
    console.log('Registered:', data)
    setSubmittedData(data)
  }

  const fillTestData = () => {
    setValue('firstName', 'John')
    setValue('lastName', 'Doe')
    setValue('email', 'john@example.com')
    setValue('age', 25)
  }

  return (
    <div>
      <h2>Форма регистрации</h2>

      {/* Индикаторы состояния */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f0f0' }}>
        <span>Изменена: {isDirty ? '✅' : '❌'}</span>
        <span style={{ marginLeft: '1rem' }}>Валидна: {isValid ? '✅' : '❌'}</span>
        <span style={{ marginLeft: '1rem' }}>
          Отправка: {isSubmitting ? '⏳' : '✓'}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Имя *</label>
          <input {...register('firstName', { required: 'Обязательно' })} />
          {errors.firstName && <span className="error">{errors.firstName.message}</span>}
        </div>

        <div>
          <label>Фамилия *</label>
          <input {...register('lastName', { required: 'Обязательно' })} />
          {errors.lastName && <span className="error">{errors.lastName.message}</span>}
        </div>

        <div>
          <label>Email *</label>
          <input type="email" {...register('email', { required: 'Обязательно' })} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div>
          <label>Возраст *</label>
          <input
            type="number"
            {...register('age', {
              required: 'Обязательно',
              valueAsNumber: true,
              min: { value: 18, message: 'Минимум 18' },
            })}
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        <div>
          <label>О себе</label>
          <textarea {...register('bio')} rows={4} />
        </div>

        <div>
          <label>Сайт</label>
          <input type="url" {...register('website')} placeholder="https://..." />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
          </button>
          <button type="button" onClick={fillTestData} style={{ marginLeft: '0.5rem' }}>
            Заполнить
          </button>
          <button type="button" onClick={reset} style={{ marginLeft: '0.5rem' }}>
            Сбросить
          </button>
        </div>
      </form>

      {submittedData && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f5e9' }}>
          <h3>Данные отправлены:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
```

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [useForm документация](https://react-hook-form.com/docs/useform)
- [register документация](https://react-hook-form.com/docs/useform/register)
- [watch документация](https://react-hook-form.com/docs/useform/watch)
- [formState документация](https://react-hook-form.com/docs/useform/formstate)
- [setValue документация](https://react-hook-form.com/docs/useform/setvalue)
