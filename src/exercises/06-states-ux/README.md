# Уровень 6: Состояния и UX — Dirty, Touched, Reset, Focus, A11y

## Введение

Хороший UX формы — это не только валидация. Это понимание состояния формы, управление фокусом, доступность и оптимизация производительности. В этом уровне вы изучите все аспекты создания удобных форм.

---

## Часть 1: Dirty / Touched States

### Что такое Dirty и Touched?

| Состояние | Описание | Когда меняется |
|-----------|----------|----------------|
| `dirty` | Поле было изменено | При изменении значения |
| `touched` | Поле было затронуто | При потере фокуса (blur) |
| `isDirty` | Форма была изменена | При изменении любого поля |

### Получение состояния

```tsx
function MyForm() {
  const {
    register,
    formState: {
      dirtyFields,      // Какие поля изменены
      touchedFields,    // Какие поля затронуты
      isDirty,          // Форма изменена
      isSubmitted,      // Форма отправлена
    },
  } = useForm()

  return (
    <form>
      <input {...register('name')} />
      
      <div>
        Dirty: {dirtyFields.name ? '✅' : '❌'}
      </div>
      <div>
        Touched: {touchedFields.name ? '✅' : '❌'}
      </div>
      <div>
        Форма изменена: {isDirty ? 'Да' : 'Нет'}
      </div>
    </form>
  )
}
```

### Практическое применение

```tsx
// Показывать ошибку только после того, как поле затронуто
<input {...register('email', { required: 'Обязательно' })} />
{touchedFields.email && errors.email && (
  <span className="error">{errors.email.message}</span>
)}

// Или показывать только если поле изменено и невалидно
{dirtyFields.email && errors.email && (
  <span className="error">{errors.email.message}</span>
)}
```

### Визуальная индикация

```tsx
<input
  {...register('name')}
  style={{
    borderColor: dirtyFields.name
      ? errors.name ? '#dc3545' : '#28a745'
      : '#ddd',
  }}
/>
```

---

## Часть 2: Reset и Default Values

### Установка default values

```tsx
// При инициализации
const { register } = useForm({
  defaultValues: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  },
})

// Асинхронная загрузка
const { reset } = useForm()

useEffect(() => {
  fetch('/api/user/1')
    .then(res => res.json())
    .then(data => reset(data))
}, [reset])
```

### Метод reset

```tsx
const { reset } = useForm()

// Сброс к default values
reset()

// Сброс с новыми значениями
reset({
  firstName: 'Jane',
  lastName: 'Smith',
})

// С опциями
reset(values, {
  keepErrors: false,      // Сохранить ошибки
  keepDirty: false,       // Сохранить dirty состояние
  keepValues: false,      // Сохранить значения
  keepDefaultValues: false,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
})
```

### Отслеживание изменений

```tsx
const { watch, reset, formState: { isDirty } } = useForm()

const values = watch()

useEffect(() => {
  if (isDirty) {
    console.log('Форма изменена:', values)
  }
}, [values])

// Кнопка сброса активна только если форма изменена
<button type="button" onClick={() => reset()} disabled={!isDirty}>
  Сбросить
</button>
```

---

## Часть 3: Focus Management

### Зачем нужен focus management?

При ошибке валидации пользователь должен сразу понять, где проблема. Автоматический фокус на первом ошибочном поле улучшает UX.

### Ручная установка фокуса

```tsx
import { useEffect } from 'react'

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      const element = document.getElementById(firstError)
      element?.focus()
    }
  }, [errors])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input id="email" {...register('email')} />
      {errors.email && <span className="error">{errors.email.message}</span>}
      
      <input id="password" {...register('password')} />
      {errors.password && <span className="error">{errors.password.message}</span>}
      
      <button type="submit">Отправить</button>
    </form>
  )
}
```

### shouldFocusError (встроено в RHF)

```tsx
// По умолчанию включено
const { register } = useForm({
  shouldFocusError: true,
})

// Отключить
const { register } = useForm({
  shouldFocusError: false,
})
```

### Кастомный хук для фокуса

```tsx
function useFocusOnError(errors: any) {
  useEffect(() => {
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      const element = document.getElementById(firstError)
      element?.focus()
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [errors])
}

// Использование
function MyForm() {
  const { formState: { errors } } = useForm()
  useFocusOnError(errors)
  // ...
}
```

---

## Часть 4: Accessibility (A11y)

### ARIA атрибуты для форм

```tsx
function AccessibleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Форма регистрации"
      noValidate
    >
      {/* Сообщение об общих ошибках */}
      {isSubmitted && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          style={{ color: '#dc3545' }}
        >
          Пожалуйста, исправьте ошибки в форме
        </div>
      )}

      {/* Поле с aria-invalid */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register('email', { required: 'Обязательно' })}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      
      {/* Сообщение об ошибке с role="alert" */}
      {errors.email && (
        <span
          id="email-error"
          className="error"
          role="alert"
          aria-live="polite"
        >
          {errors.email.message}
        </span>
      )}

      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Основные ARIA атрибуты

| Атрибут | Описание | Пример |
|---------|----------|--------|
| `aria-label` | Текстовая метка | `aria-label="Форма входа"` |
| `aria-invalid` | Поле невалидно | `aria-invalid={!!errors.email}` |
| `aria-describedby` | Связь с описанием | `aria-describedby="email-error"` |
| `aria-live` | Обновления в реальном времени | `aria-live="polite"` |
| `role="alert"` | Важное сообщение | `role="alert"` |
| `noValidate` | Отключить нативную валидацию | `<form noValidate>` |

### Keyboard navigation

```tsx
// Отправка по Enter
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('name')} />
  <button type="submit">Отправить</button>
</form>

// Фокус на следующем поле после Enter
<input
  {...register('name')}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.getElementById('email')?.focus()
    }
  }}
/>
```

---

## Часть 5: Performance оптимизация

### Проблема с watch()

```tsx
// ❌ Плохо: watch() вызывает ре-рендер при любом изменении
const values = watch()
console.log('Render', values)

// ✅ Хорошо: useWatch для отдельных полей
const name = useWatch({ name: 'name' })
```

### useWatch вместо watch

```tsx
import { useWatch } from 'react-hook-form'

function OptimizedForm() {
  const { control, register } = useForm()
  
  // Подписка только на одно поле
  const name = useWatch({
    control,
    name: 'name',
    defaultValue: '',
  })

  return (
    <div>
      <input {...register('name')} />
      <div>Вы ввели: {name}</div>
    </div>
  )
}
```

### Мемоизация компонентов

```tsx
import { memo } from 'react'
import { useWatch } from 'react-hook-form'

const PriceDisplay = memo(({ control }: { control: any }) => {
  const price = useWatch({ control, name: 'price' })
  console.log('PriceDisplay render')
  return <div>Цена: {price}</div>
})

function MyForm() {
  const { control, register } = useForm()
  
  return (
    <form>
      <input {...register('price', { valueAsNumber: true })} />
      <PriceDisplay control={control} />
    </form>
  )
}
```

### shouldUnregister

```tsx
// По умолчанию false (поля регистрируются навсегда)
const { register } = useForm({ shouldUnregister: false })

// true — поля unregister при размонтировании
const { register } = useForm({ shouldUnregister: true })

// Для conditional полей лучше true
{showEmail && <input {...register('email')} />}
```

### Сравнение производительности

```tsx
// ❌ Медленно: watch всех полей
const allValues = watch()

// ✅ Быстро: useWatch для конкретных полей
const email = useWatch({ name: 'email' })
const password = useWatch({ name: 'password' })

// ✅ Очень быстро: memo + useWatch
const MemoizedField = memo(({ control, name }) => {
  const value = useWatch({ control, name })
  return <div>{value}</div>
})
```

---

## Полный пример: Форма с отличным UX

```tsx
import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
})

type FormData = z.infer<typeof schema>

export function UXForm() {
  const [submitCount, setSubmitCount] = useState(0)
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isDirty,
      isSubmitting,
      isSubmitted,
      touchedFields,
      dirtyFields,
    },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldFocusError: true,
  })

  // Автофокус на первой ошибке
  useEffect(() => {
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
    }
  }, [errors])

  // Индикатор силы пароля
  const password = watch('password', '')
  const getPasswordStrength = () => {
    if (password.length === 0) return { label: '', color: '#888' }
    if (password.length < 8) return { label: 'Слабый', color: '#dc3545' }
    if (password.length < 12) return { label: 'Средний', color: '#ffc107' }
    return { label: 'Сильный', color: '#28a745' }
  }
  const strength = getPasswordStrength()

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000))
    console.log('Submitted:', data)
    setSubmitCount(c => c + 1)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Форма регистрации"
      noValidate
    >
      {/* Статус бар */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f0f0' }}>
        <span>Изменена: {isDirty ? '✅' : '❌'}</span>
        <span style={{ marginLeft: '1rem' }}>Отправлено: {submitCount} раз</span>
      </div>

      {/* Поле Name */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          style={{
            borderColor: touchedFields.name && errors.name
              ? '#dc3545'
              : dirtyFields.name
              ? '#28a745'
              : '#ddd',
          }}
        />
        {touchedFields.name && errors.name && (
          <span id="name-error" className="error" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Поле Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {touchedFields.email && errors.email && (
          <span id="email-error" className="error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Поле Password с индикатором */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={!!errors.password}
        />
        <div style={{ color: strength.color, fontSize: '0.875rem' }}>
          Сила пароля: {strength.label}
        </div>
        {touchedFields.password && errors.password && (
          <span className="error" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Кнопки */}
      <div style={{ marginTop: '1rem' }}>
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          style={{ opacity: isSubmitting || !isDirty ? 0.6 : 1 }}
        >
          {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          disabled={!isDirty}
          style={{ marginLeft: '0.5rem' }}
        >
          Сбросить
        </button>
      </div>

      {/* Сообщение об успехе */}
      {isSubmitted && Object.keys(errors).length === 0 && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#d1e7dd',
            color: '#0f5132',
            borderRadius: '4px',
          }}
        >
          ✅ Форма успешно отправлена!
        </div>
      )}
    </form>
  )
}
```

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [formState документация](https://react-hook-form.com/docs/useform/formstate)
- [reset документация](https://react-hook-form.com/docs/useform/reset)
- [useWatch документация](https://react-hook-form.com/docs/usewatch)
- [ARIA для форм](https://www.w3.org/WAI/tutorials/forms/)
