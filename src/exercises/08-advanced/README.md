# Уровень 8: Продвинутые техники — Controller, Custom Hooks, Context, Persistence

## Введение

В этом уровне вы изучите продвинутые техники работы с React Hook Form: интеграцию с UI-библиотеками, создание кастомных хуков, разделение форм через Context и сохранение данных в localStorage.

---

## Часть 1: Интеграция с UI-библиотеками

### Controller для сторонних компонентов

**Controller** — это мост между неконтролируемыми компонентами React Hook Form и контролируемыми компонентами UI-библиотек.

```tsx
import { Controller, useForm } from 'react-hook-form'
import { TextField, Select, MenuItem } from '@mui/material'

function MyForm() {
  const { control } = useForm()

  return (
    <form>
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField {...field} label="First Name" error={!!error} helperText={error?.message} />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select {...field}>
            <MenuItem value="electronics">Электроника</MenuItem>
            <MenuItem value="clothing">Одежда</MenuItem>
          </Select>
        )}
      />
    </form>
  )
}
```

### Кастомный компонент TextField

```tsx
// Создаём переиспользуемый компонент
function FormTextField({ label, error, ...props }: any) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        style={{
          borderColor: error ? '#dc3545' : '#ddd',
          width: '100%',
          padding: '0.5rem',
          borderRadius: '4px',
        }}
        {...props}
      />
      {error && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{error}</span>}
    </div>
  )
}

// Использование с Controller
<Controller
  name="email"
  control={control}
  render={({ field, fieldState: { error } }) => (
    <FormTextField {...field} label="Email" error={error?.message} />
  )}
/>
```

### Компонент Button с loading

```tsx
function FormButton({ children, loading, ...props }: any) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        opacity: loading || props.disabled ? 0.7 : 1,
        cursor: loading || props.disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        paddingRight: loading ? '2rem' : undefined,
      }}
    >
      {children}
      {loading && (
        <span style={{
          position: 'absolute',
          right: '0.75rem',
        }}>
          ⏳
        </span>
      )}
    </button>
  )
}

// Использование
const { formState: { isSubmitting } } = useForm()

<FormButton type="submit" loading={isSubmitting}>
  Отправить
</FormButton>
```

---

## Часть 2: Кастомные хуки

### useFormPersist — сохранение в localStorage

```tsx
import { useState, useEffect } from 'react'

function useFormPersist<T extends Record<string, any>>(name: string, defaultValues?: T) {
  // Загрузка из localStorage
  const [stored, setStored] = useState<T>(() => {
    const saved = localStorage.getItem(`form-${name}`)
    return saved ? JSON.parse(saved) : defaultValues
  })

  // Сохранение в localStorage
  const save = (values: T) => {
    localStorage.setItem(`form-${name}`, JSON.stringify(values))
    setStored(values)
  }

  // Очистка
  const clear = () => {
    localStorage.removeItem(`form-${name}`)
    setStored(defaultValues || ({} as T))
  }

  return { stored, save, clear }
}

// Использование
function ArticleForm() {
  const { stored, save, clear } = useFormPersist('article', {
    title: '',
    content: '',
  })

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: stored,
  })

  const values = watch()

  // Автосохранение при изменении
  useEffect(() => {
    save(values)
  }, [values])

  const onSubmit = (data: any) => {
    console.log('Submitted:', data)
    clear() // Очистить после отправки
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Заголовок" />
      <textarea {...register('content')} placeholder="Содержание" />

      <button type="submit">Опубликовать</button>
      <button type="button" onClick={clear}>
        Очистить черновик
      </button>
    </form>
  )
}
```

### useDebounce — debounce для значений

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Использование
function SearchForm() {
  const { register, watch } = useForm()
  const query = watch('search')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      console.log('Searching for:', debouncedQuery)
      // API call
    }
  }, [debouncedQuery])

  return <input {...register('search')} placeholder="Поиск..." />
}
```

### useFieldValidation — кастомная валидация

```tsx
function useFieldValidation<T>(value: T, validations: Array<(v: T) => string | true>) {
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    for (const validate of validations) {
      const result = validate(value)
      if (result !== true) {
        setError(result)
        setIsValid(false)
        return
      }
    }
    setError(null)
    setIsValid(true)
  }, [value, validations])

  return { error, isValid }
}

// Использование
function PasswordField() {
  const { watch } = useForm()
  const password = watch('password')

  const { error, isValid } = useFieldValidation(password, [
    v => v.length >= 8 || 'Минимум 8 символов',
    v => /[A-Z]/.test(v) || 'Должна быть заглавная буква',
    v => /\d/.test(v) || 'Должна быть цифра',
  ])

  return (
    <div>
      <input {...register('password')} type="password" />
      {!isValid && error && <span className="error">{error}</span>}
    </div>
  )
}
```

---

## Часть 3: FormContext (FormProvider)

### Разделение формы на подкомпоненты

```tsx
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

// Подкомпонент с useFormContext
function PersonalStep() {
  const { register } = useFormContext()

  return (
    <>
      <input {...register('firstName')} placeholder="Имя" />
      <input {...register('lastName')} placeholder="Фамилия" />
    </>
  )
}

function ContactStep() {
  const { register } = useFormContext()

  return (
    <>
      <input type="email" {...register('email')} placeholder="Email" />
      <input type="tel" {...register('phone')} placeholder="Телефон" />
    </>
  )
}

// Родительский компонент с FormProvider
function App() {
  const methods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit = (data: any) => {
    console.log('Submitted:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PersonalStep />
        <ContactStep />
        <button type="submit">Отправить</button>
      </form>
    </FormProvider>
  )
}
```

### Wizard с FormProvider

```tsx
function WizardForm() {
  const [step, setStep] = useState(1)

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  })

  const { handleSubmit, trigger } = methods

  const onNext = async () => {
    const fields = step === 1 ? ['email', 'password'] : ['firstName', 'lastName']

    const isValid = await trigger(fields)
    if (isValid) setStep(step + 1)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <AccountStep />}
        {step === 2 && <ProfileStep />}

        <div>
          {step > 1 && (
            <button type="button" onClick={() => setStep(s => s - 1)}>
              ←
            </button>
          )}
          {step < 2 ? (
            <button type="button" onClick={onNext}>
              →
            </button>
          ) : (
            <button type="submit">Отправить</button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
```

---

## Часть 4: localStorage Persistence

### Базовое сохранение

```tsx
function PersistentForm() {
  const { register, reset, watch } = useForm({
    defaultValues: () => {
      const saved = localStorage.getItem('my-form')
      return saved ? JSON.parse(saved) : { name: '', email: '' }
    },
  })

  const values = watch()

  useEffect(() => {
    localStorage.setItem('my-form', JSON.stringify(values))
  }, [values])

  return (
    <form>
      <input {...register('name')} />
      <input type="email" {...register('email')} />
    </form>
  )
}
```

### С подпиской на изменения

```tsx
function FormWithSubscription() {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { subject: '', body: '' },
  })

  // Загрузка при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('email-draft')
    if (saved) {
      reset(JSON.parse(saved))
    }
  }, [reset])

  // Сохранение при изменении
  useEffect(() => {
    const subscription = watch(value => {
      localStorage.setItem('email-draft', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (data: any) => {
    localStorage.removeItem('email-draft') // Очистить после отправки
    console.log('Sent:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('subject')} placeholder="Тема" />
      <textarea {...register('body')} placeholder="Текст письма" />
      <button type="submit">Отправить</button>
    </form>
  )
}
```

---

## Часть 5: Финальный проект — Форма регистрации

### Полная форма с валидацией и всеми техниками

```tsx
import { useState, useEffect } from 'react'
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Схема валидации
const schema = z
  .object({
    // Шаг 1: Аккаунт
    email: z.string().email('Неверный email'),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirm: z.string(),

    // Шаг 2: Профиль
    firstName: z.string().min(1, 'Обязательно'),
    lastName: z.string().min(1, 'Обязательно'),
    avatar: z.instanceof(FileList).optional(),

    // Шаг 3: Настройки
    newsletter: z.boolean().optional(),
    notifications: z.boolean().optional(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  })

type FormData = z.infer<typeof schema>

// Компонент шага 1
function AccountStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <div>
        <label>Confirm</label>
        <input type="password" {...register('confirm')} />
        {errors.confirm && <span className="error">{errors.confirm.message}</span>}
      </div>
    </>
  )
}

// Компонент шага 2
function ProfileStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()
  const [preview, setPreview] = useState<string | null>(null)
  const avatar = useWatch({ name: 'avatar' })

  useEffect(() => {
    if (avatar?.[0]) {
      const url = URL.createObjectURL(avatar[0])
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [avatar])

  return (
    <>
      <div>
        <label>First Name</label>
        <input {...register('firstName')} />
        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register('lastName')} />
        {errors.lastName && <span className="error">{errors.lastName.message}</span>}
      </div>

      <div>
        <label>Avatar</label>
        <input
          type="file"
          accept="image/*"
          {...register('avatar')}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) setPreview(URL.createObjectURL(file))
          }}
        />
        {preview && <img src={preview} alt="Preview" style={{ maxWidth: '150px' }} />}
      </div>
    </>
  )
}

// Компонент шага 3
function SettingsStep() {
  const { register, watch, setValue } = useFormContext<FormData>()

  return (
    <>
      <label>
        <input type="checkbox" {...register('newsletter')} />
        Подписаться на рассылку
      </label>

      <label>
        <input
          type="checkbox"
          checked={watch('notifications')}
          onChange={e => setValue('notifications', e.target.checked)}
        />
        Уведомления
      </label>
    </>
  )
}

// Главная форма
export function RegistrationWizard() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState<FormData | null>(null)

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      newsletter: false,
      notifications: false,
    },
  })

  const { handleSubmit, trigger } = methods

  const onNext = async () => {
    const fields =
      step === 1 ? ['email', 'password', 'confirm'] : step === 2 ? ['firstName', 'lastName'] : []

    const valid = await trigger(fields)
    if (valid) setStep(step + 1)
  }

  const onSubmit = (data: FormData) => {
    setSubmitted(data)
    console.log('Registered:', data)
  }

  if (submitted) {
    return (
      <div>
        <h2>🎉 Регистрация завершена!</h2>
        <pre>{JSON.stringify(submitted, null, 2)}</pre>
        <button
          onClick={() => {
            setSubmitted(null)
            setStep(1)
          }}
        >
          Начать заново
        </button>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Шаг {step} из 3</div>

        {step === 1 && <AccountStep />}
        {step === 2 && <ProfileStep />}
        {step === 3 && <SettingsStep />}

        <div>
          {step > 1 && (
            <button type="button" onClick={() => setStep(s => s - 1)}>
              ←
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={onNext}>
              →
            </button>
          ) : (
            <button type="submit">Завершить</button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
```

---

## Часть 6: useFormState — изоляция ререндеров

### Проблема

Когда вы читаете `formState` через `useForm`, **весь компонент** ререндерится при изменении любого подписанного свойства. В больших формах это может быть проблемой производительности — например, кнопка отправки ререндерится при каждом изменении ошибок в любом поле.

### Решение: useFormState

Хук `useFormState` позволяет подписаться на `formState` в **отдельном компоненте**, изолируя ререндеры:

```tsx
import { useForm, useFormState } from 'react-hook-form'

// Этот компонент ререндерится ТОЛЬКО когда меняются isSubmitting или isValid
function SubmitButton({ control }: { control: Control }) {
  const { isSubmitting, isValid } = useFormState({ control })

  return (
    <button type="submit" disabled={!isValid || isSubmitting}>
      {isSubmitting ? 'Отправка...' : 'Отправить'}
    </button>
  )
}

// Этот компонент ререндерится ТОЛЬКО когда меняются errors
function ErrorSummary({ control }: { control: Control }) {
  const { errors } = useFormState({ control })

  if (Object.keys(errors).length === 0) return null

  return (
    <div style={{ color: 'red' }}>
      {Object.entries(errors).map(([field, error]) => (
        <p key={field}>{error?.message as string}</p>
      ))}
    </div>
  )
}

// Родительский компонент НЕ подписан на formState — не ререндерится
function MyForm() {
  const { register, handleSubmit, control } = useForm({
    mode: 'onChange',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Обязательно' })} />
      <input {...register('name', { required: 'Обязательно' })} />

      <ErrorSummary control={control} />
      <SubmitButton control={control} />
    </form>
  )
}
```

### Опции useFormState

| Опция | Тип | Описание |
|-------|-----|----------|
| `control` | `Control` | Объект `control` из `useForm`. Необязателен внутри `FormProvider` |
| `name` | `string \| string[]` | Подписка на конкретные поля (фильтрация ререндеров) |
| `disabled` | `boolean` | Отключает подписку |
| `exact` | `boolean` | Точное совпадение имени поля (без вложенных) |

### useFormState vs formState из useForm

```tsx
// ❌ Весь компонент ререндерится при любом изменении formState
function App() {
  const { register, formState: { errors, isSubmitting } } = useForm()
  // ...всё ререндерится
}

// ✅ Только SubmitButton ререндерится при изменении isSubmitting
function SubmitButton({ control }) {
  const { isSubmitting } = useFormState({ control })
  return <button disabled={isSubmitting}>Send</button>
}
```

---

## Часть 7: subscribe — подписка без ререндеров

### Проблема

Иногда нужно **реагировать** на изменения формы, но **не ререндерить** компонент. Например: логирование, аналитика, синхронизация с внешним хранилищем, автосохранение.

### Метод subscribe

Метод `subscribe` возвращаемый из `useForm` позволяет подписаться на изменения `formState` и значений формы **без вызова ререндера**:

```tsx
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

function MyForm() {
  const { register, handleSubmit, subscribe } = useForm({
    defaultValues: { email: '', name: '' },
  })

  // Subscribe to isDirty changes — no re-renders
  useEffect(() => {
    const unsubscribe = subscribe({
      formState: { isDirty: true },
      callback: ({ formState, values }) => {
        console.log('isDirty:', formState.isDirty)
        console.log('Current values:', values)
      },
    })

    return unsubscribe
  }, [subscribe])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <input {...register('name')} />
      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Параметры subscribe

```tsx
const unsubscribe = subscribe({
  // Какие свойства formState отслеживать
  formState: {
    isDirty: true,
    isValid: true,
    errors: true,
    // ...любые свойства FormState
  },

  // Фильтр по именам полей (необязательно)
  name: ['email', 'password'],

  // Точное совпадение имени (необязательно)
  exact: true,

  // Callback вызывается при изменениях
  callback: ({ formState, values, name, type }) => {
    // formState — текущее состояние формы (только подписанные свойства)
    // values — текущие значения всех полей
    // name — имя изменённого поля
    // type — тип события ('change', 'blur' и т.д.)
  },
})

// Не забудьте отписаться при размонтировании
```

### Практические примеры

**Автосохранение без ререндеров:**

```tsx
function AutoSaveForm() {
  const { register, handleSubmit, subscribe } = useForm()

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: { isDirty: true },
      callback: ({ values, formState }) => {
        if (formState.isDirty) {
          // Save to localStorage without re-rendering
          localStorage.setItem('draft', JSON.stringify(values))
        }
      },
    })
    return unsubscribe
  }, [subscribe])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} />
      <textarea {...register('content')} />
      <button type="submit">Опубликовать</button>
    </form>
  )
}
```

**Аналитика:**

```tsx
useEffect(() => {
  const unsubscribe = subscribe({
    formState: { errors: true },
    callback: ({ formState }) => {
      // Track validation errors for analytics
      const errorFields = Object.keys(formState.errors || {})
      if (errorFields.length > 0) {
        analytics.track('form_validation_error', { fields: errorFields })
      }
    },
  })
  return unsubscribe
}, [subscribe])
```

### subscribe vs useFormState vs watch

| | Ререндер | Использование |
|---|---|---|
| `watch` / `useWatch` | Да | Отображение значений в JSX |
| `useFormState` | Да (изолировано) | Отображение formState в JSX (кнопки, ошибки) |
| `subscribe` | Нет | Side-effects: логи, аналитика, localStorage |

---

## Часть 8: Тестирование форм

### Подход к тестированию

Формы на React Hook Form тестируются как обычные React-компоненты с помощью `@testing-library/react`. Ключевой принцип — **тестировать поведение пользователя**, а не внутреннее состояние формы.

### Базовый тест: отправка формы

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

// Component under test
function LoginForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email
        <input {...register('email', { required: 'Обязательно' })} />
      </label>
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <label>
        Password
        <input type="password" {...register('password', { required: 'Обязательно' })} />
      </label>
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <button type="submit">Войти</button>
    </form>
  )
}

// Tests
test('submits form with valid data', async () => {
  const onSubmit = vi.fn()
  render(<LoginForm onSubmit={onSubmit} />)

  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
  await userEvent.type(screen.getByLabelText('Password'), 'secret123')
  await userEvent.click(screen.getByRole('button', { name: /войти/i }))

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      { email: 'test@example.com', password: 'secret123' },
      expect.anything() // second arg is the event
    )
  })
})

test('shows validation errors for empty fields', async () => {
  render(<LoginForm onSubmit={vi.fn()} />)

  await userEvent.click(screen.getByRole('button', { name: /войти/i }))

  await waitFor(() => {
    const alerts = screen.getAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})
```

### Тестирование async валидации

```tsx
test('shows error for taken username', async () => {
  // Mock API
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ available: false }),
  } as Response)

  render(<RegistrationForm onSubmit={vi.fn()} />)

  await userEvent.type(screen.getByLabelText('Username'), 'admin')
  await userEvent.tab() // trigger onBlur

  await waitFor(() => {
    expect(screen.getByText(/занято/i)).toBeInTheDocument()
  })

  vi.restoreAllMocks()
})
```

### Тестирование формы с defaultValues

```tsx
test('loads and displays default values', async () => {
  render(
    <EditForm
      defaultValues={{ name: 'Иван', email: 'ivan@example.com' }}
      onSubmit={vi.fn()}
    />
  )

  expect(screen.getByLabelText('Name')).toHaveValue('Иван')
  expect(screen.getByLabelText('Email')).toHaveValue('ivan@example.com')
})
```

### Best Practices тестирования

1. **Используйте `userEvent` вместо `fireEvent`** — `userEvent` точнее имитирует реальное поведение пользователя (focus, keydown, input, keyup, blur).

2. **Оборачивайте проверки в `waitFor`** — валидация в RHF асинхронна, даже для синхронных правил.

3. **Ищите элементы по роли и лейблу** — `getByRole`, `getByLabelText` вместо `getByTestId`.

4. **Не тестируйте внутреннее состояние RHF** — тестируйте то, что видит пользователь (ошибки, disabled-состояние кнопки, отправленные данные).

---

## Частые ошибки новичков

### ❌ Ошибка 1: Controller без field.onChange

```tsx
// ❌ Неправильно - значение не обновляется
<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select {...field} />
  )}
/>

// ✅ Правильно - явно указываем onChange
<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      onChange={(selected) => field.onChange(selected?.value)}
    />
  )}
/>
```

**Почему это ошибка:** Сторонние компоненты могут возвращать объекты вместо простых значений.

---

### ❌ Ошибка 2: FormProvider без context

```tsx
// ❌ Неправильно - useFormContext не работает
function Child() {
  const { register } = useFormContext() // ошибка!
}
function Parent() {
  const { register } = useForm()
  return <Child />
}

// ✅ Правильно - оборачиваем в FormProvider
function Parent() {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <Child />
    </FormProvider>
  )
}
```

**Почему это ошибка:** `useFormContext` работает только внутри `FormProvider`.

---

### ❌ Ошибка 3: localStorage без JSON.parse

```tsx
// ❌ Неправильно - строка вместо объекта
const saved = localStorage.getItem('form')
defaultValues: saved

// ✅ Правильно - парсим JSON
const saved = localStorage.getItem('form')
defaultValues: saved ? JSON.parse(saved) : { name: '' }
```

**Почему это ошибка:** `localStorage` хранит только строки, объекты нужно сериализовать.

---

### ❌ Ошибка 4: Автосохранение без debounce

```tsx
// ❌ Неправильно - сохранение на каждое изменение
useEffect(() => {
  localStorage.setItem('draft', JSON.stringify(values))
}, [values])

// ✅ Правильно - с debounce
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(values))
  }, 1000)
  return () => clearTimeout(timer)
}, [values])
```

**Почему это ошибка:** Частые записи в localStorage могут вызвать проблемы с производительностью.

---

### ❌ Ошибка 5: Кастомный хук без зависимостей

```tsx
// ❌ Неправильно - нет зависимостей
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    // нет cleanup и зависимостей
  })
  return debounced
}

// ✅ Правильно - с зависимостями
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
```

**Почему это ошибка:** Без зависимостей эффект может выполняться некорректно или вызывать утечки.

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [Controller документация](https://react-hook-form.com/docs/useform/controller)
- [FormProvider документация](https://react-hook-form.com/docs/formprovider)
- [useFormContext документация](https://react-hook-form.com/docs/useformcontext)
- [useFormState документация](https://react-hook-form.com/docs/useformstate)
- [subscribe документация](https://react-hook-form.com/docs/useform/subscribe)
- [Testing документация](https://react-hook-form.com/advanced-usage#TestingForm)
