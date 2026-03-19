# Уровень 6: Состояния и UX — Dirty, Touched, Reset, Focus, A11y

## Введение

Хороший UX формы — это не только валидация. Это понимание состояния формы, управление фокусом, доступность и оптимизация производительности. В этом уровне вы изучите все аспекты создания удобных форм.

---

## Часть 1: Dirty / Touched States

### Что такое Dirty и Touched?

| Состояние | Описание            | Когда меняется            |
| --------- | ------------------- | ------------------------- |
| `dirty`   | Поле было изменено  | При изменении значения    |
| `touched` | Поле было затронуто | При потере фокуса (blur)  |
| `isDirty` | Форма была изменена | При изменении любого поля |

### Получение состояния

```tsx
function MyForm() {
  const {
    register,
    formState: {
      dirtyFields, // Какие поля изменены
      touchedFields, // Какие поля затронуты
      isDirty, // Форма изменена
      isSubmitted, // Форма отправлена
    },
  } = useForm()

  return (
    <form>
      <input {...register('name')} />

      <div>Dirty: {dirtyFields.name ? '✅' : '❌'}</div>
      <div>Touched: {touchedFields.name ? '✅' : '❌'}</div>
      <div>Форма изменена: {isDirty ? 'Да' : 'Нет'}</div>
    </form>
  )
}
```

### Практическое применение

```tsx
// Показывать ошибку только после того, как поле затронуто
<input {...register('email', { required: 'Обязательно' })} />
{
  touchedFields.email && errors.email && <span className="error">{errors.email.message}</span>
}

// Или показывать только если поле изменено и невалидно
{
  dirtyFields.email && errors.email && <span className="error">{errors.email.message}</span>
}
```

### getFieldState — состояние конкретного поля

Метод `getFieldState` позволяет получить состояние отдельного поля: `isDirty`, `isTouched` и `error`. Это удобно, когда нужно проверить состояние поля императивно (например, в обработчике событий), а не через `formState.dirtyFields` / `formState.touchedFields`.

```tsx
const { getFieldState, formState } = useForm({
  defaultValues: { email: '', name: '' },
})

// Получить состояние поля
const { isDirty, isTouched, invalid, error } = getFieldState('email', formState)

console.log(isDirty) // true, если поле было изменено
console.log(isTouched) // true, если поле потеряло фокус
console.log(invalid) // true, если поле невалидно
console.log(error) // объект ошибки или undefined
```

> **Важно:** Второй аргумент `formState` обязателен. Без него RHF не сможет отследить подписку на состояние, и компонент не будет ререндериться при изменениях.

```tsx
// ❌ Неправильно — без formState компонент не обновится
const { isDirty } = getFieldState('email')

// ✅ Правильно — передаём formState
const { isDirty } = getFieldState('email', formState)
```

### Визуальная индикация

```tsx
<input
  {...register('name')}
  style={{
    borderColor: dirtyFields.name ? (errors.name ? '#dc3545' : '#28a745') : '#ddd',
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
  keepErrors: false, // Сохранить ошибки
  keepDirty: false, // Сохранить dirty состояние
  keepValues: false, // Сохранить значения
  keepDefaultValues: false,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
})
```

### resetField — сброс конкретного поля

Метод `resetField` позволяет сбросить одно конкретное поле, не затрагивая остальную форму. Это полезно, когда нужно очистить только одно поле (например, после выбора файла или при смене категории).

```tsx
const { resetField } = useForm({
  defaultValues: { email: 'user@example.com', name: 'John' },
})

// Сброс к defaultValue
resetField('email') // email вернётся к 'user@example.com'

// Сброс к новому значению
resetField('email', { defaultValue: 'new@example.com' })

// С опциями — сохранить dirty/touched/error состояние
resetField('email', {
  keepDirty: true,
  keepTouched: true,
  keepError: true,
  defaultValue: '',
})
```

> **Разница между `reset` и `resetField`:** `reset` сбрасывает всю форму и все её состояния (`isDirty`, `touchedFields`, `errors` и т.д.). `resetField` работает точечно — сбрасывает только указанное поле.

### isSubmitSuccessful — отслеживание успешной отправки

`isSubmitSuccessful` — это свойство `formState`, которое становится `true` после того, как `onSubmit` (onValid callback) выполнился без ошибок. Это удобный способ показать success-сообщение или сбросить форму после успешной отправки.

```tsx
const {
  handleSubmit,
  reset,
  formState: { isSubmitSuccessful },
} = useForm()

// Показать сообщение об успехе
{isSubmitSuccessful && <div role="status">Форма успешно отправлена!</div>}

// Сброс формы после успешной отправки
useEffect(() => {
  if (isSubmitSuccessful) {
    reset()
  }
}, [isSubmitSuccessful, reset])
```

> **Подводный камень:** Если `onSubmit` выбросит исключение, `isSubmitSuccessful` останется `false`. Если вы делаете API-запросы в `onSubmit`, убедитесь что ошибки обрабатываются корректно.

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

### setFocus — программная установка фокуса

RHF предоставляет метод `setFocus` для программной установки фокуса на поле по имени. Это удобнее, чем работать с DOM напрямую, потому что RHF уже знает о всех зарегистрированных полях.

```tsx
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function MyForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm()

  // Фокус на первое поле при монтировании
  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  // Фокус на первое поле с ошибкой после неудачного submit
  const onInvalid = (errors) => {
    const firstError = Object.keys(errors)[0]
    if (firstError) setFocus(firstError)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <input {...register('email', { required: 'Обязательно' })} />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <input {...register('password', { required: 'Обязательно' })} />
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

### setFocus с опциями

`setFocus` принимает второй аргумент — объект с опцией `shouldSelect`. Если `shouldSelect: true`, текст в поле будет выделен:

```tsx
// Просто фокус
setFocus('email')

// Фокус + выделение текста в поле
setFocus('email', { shouldSelect: true })
```

> **Важно:** `setFocus` работает только с полями, зарегистрированными через `register`. Для полей через `Controller` фокус зависит от реализации компонента.

### Кастомный хук для фокуса

С `setFocus` можно написать лаконичный хук, не прибегая к DOM:

```tsx
import { UseFormSetFocus, FieldErrors, FieldValues } from 'react-hook-form'

function useFocusOnError<T extends FieldValues>(
  errors: FieldErrors<T>,
  setFocus: UseFormSetFocus<T>,
) {
  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof T
    if (firstError) {
      setFocus(firstError as any)
    }
  }, [errors, setFocus])
}

// Использование
function MyForm() {
  const {
    setFocus,
    formState: { errors },
  } = useForm()
  useFocusOnError(errors, setFocus)
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
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Форма регистрации" noValidate>
      {/* Сообщение об общих ошибках */}
      {isSubmitted && Object.keys(errors).length > 0 && (
        <div role="alert" aria-live="assertive" style={{ color: '#dc3545' }}>
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
        <span id="email-error" className="error" role="alert" aria-live="polite">
          {errors.email.message}
        </span>
      )}

      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Основные ARIA атрибуты

| Атрибут            | Описание                      | Пример                           |
| ------------------ | ----------------------------- | -------------------------------- |
| `aria-label`       | Текстовая метка               | `aria-label="Форма входа"`       |
| `aria-invalid`     | Поле невалидно                | `aria-invalid={!!errors.email}`  |
| `aria-describedby` | Связь с описанием             | `aria-describedby="email-error"` |
| `aria-live`        | Обновления в реальном времени | `aria-live="polite"`             |
| `role="alert"`     | Важное сообщение              | `role="alert"`                   |
| `noValidate`       | Отключить нативную валидацию  | `<form noValidate>`              |

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
// ❌ Плохо: watch() вызывает ререндер при любом изменении
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
{
  showEmail && <input {...register('email')} />
}
```

### delayError — задержка появления ошибок

Опция `delayError` в `useForm` задерживает отображение ошибок на указанное количество миллисекунд. Это улучшает UX при валидации в реальном времени (`mode: 'onChange'`), потому что пользователь не видит мелькающие ошибки пока печатает.

```tsx
const { register, formState: { errors } } = useForm({
  mode: 'onChange',
  delayError: 500, // Ошибка появится через 500ms после прекращения ввода
})
```

Без `delayError` при `mode: 'onChange'` пользователь увидит ошибку "Минимум 6 символов" уже после первого введённого символа. С `delayError: 500` ошибка появится только если пользователь перестал печатать на 500ms — то есть когда он, скорее всего, закончил ввод.

> **Когда использовать:** `delayError` полезен в сочетании с `mode: 'onChange'` или `mode: 'all'`. При `mode: 'onBlur'` или `mode: 'onSubmit'` в нём нет необходимости, потому что ошибки и так не появляются во время ввода.

```tsx
// Типичная комбинация для лучшего UX
const { register } = useForm({
  mode: 'onChange', // Валидация при каждом изменении
  delayError: 300, // Но ошибки показываем с задержкой
})
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
import { useEffect } from 'react'
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
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    resetField,
    getFieldState,
    watch,
    formState,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    delayError: 500, // Ошибки появляются с задержкой для лучшего UX
    shouldFocusError: true,
  })

  const {
    errors,
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
    touchedFields,
    dirtyFields,
    submitCount,
  } = formState

  // Фокус на первое поле при монтировании
  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  // Сброс формы после успешной отправки
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

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
  }

  // Фокус на первое ошибочное поле при неудачной отправке
  const onInvalid = (errors: any) => {
    const firstError = Object.keys(errors)[0] as keyof FormData
    if (firstError) setFocus(firstError)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
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
            borderColor:
              touchedFields.name && errors.name ? '#dc3545' : dirtyFields.name ? '#28a745' : '#ddd',
          }}
        />
        {touchedFields.name && errors.name && (
          <span id="name-error" className="error" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Поле Email с кнопкой сброса через resetField */}
      <div>
        <label htmlFor="email">Email</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {getFieldState('email', formState).isDirty && (
            <button type="button" onClick={() => resetField('email')}>
              Сбросить
            </button>
          )}
        </div>
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
          Сбросить всё
        </button>
      </div>

      {/* Сообщение об успехе через isSubmitSuccessful */}
      {isSubmitSuccessful && (
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
          Форма успешно отправлена!
        </div>
      )}
    </form>
  )
}
```

---

## Частые ошибки новичков

### ❌ Ошибка 1: Деструктуризация не из formState

```tsx
// ❌ Неправильно - деструктуризация напрямую из useForm
const { errors, isDirty, isValid } = useForm()

// ✅ Правильно - из formState
const {
  formState: { errors, isDirty, isValid },
} = useForm()
```

**Почему это ошибка:** `formState` — это Proxy-объект, который отслеживает подписки. Прямая деструктуризация ломает эту систему.

---

### ❌ Ошибка 2: reset без defaultValues

```tsx
// ❌ Неправильно - reset с пустыми значениями
reset()

// ✅ Правильно - с defaultValues
const { reset } = useForm({
  defaultValues: { name: '', email: '' },
})
reset({ name: 'John', email: 'john@example.com' })
```

**Почему это ошибка:** Без `defaultValues` форма может некорректно определять `isDirty` состояние.

---

### ❌ Ошибка 3: Работа с фокусом через DOM вместо setFocus

```tsx
// ❌ Неправильно - обращение к DOM напрямую
useEffect(() => {
  const firstError = Object.keys(errors)[0]
  if (firstError) {
    document.getElementById(firstError)?.focus()
  }
}, [errors])

// ✅ Правильно - использовать setFocus из RHF
const { setFocus } = useForm()
const onInvalid = (errors) => {
  const firstError = Object.keys(errors)[0]
  if (firstError) setFocus(firstError)
}
```

**Почему это ошибка:** `setFocus` уже знает о всех зарегистрированных полях и не требует привязки к `id`. Кроме того, `shouldFocusError: true` (включён по умолчанию) автоматически фокусирует первое ошибочное поле при submit.

---

### ❌ Ошибка 4: watch() вызывает лишние ререндеры

```tsx
// ❌ Неправильно - watch всех полей
const values = watch()
console.log('Render', values)

// ✅ Правильно - useWatch для отдельных полей
const name = useWatch({ name: 'name' })
```

**Почему это ошибка:** `watch()` подписывается на все изменения формы, вызывая ререндер всего компонента.

---

### ❌ Ошибка 5: Игнорирование touchedFields

```tsx
// ❌ Неправильно - показывать ошибку сразу
{
  errors.email && <span className="error">{errors.email.message}</span>
}

// ✅ Правильно - после касания
{
  touchedFields.email && errors.email && <span className="error">{errors.email.message}</span>
}
```

**Почему это ошибка:** Пользователь видит ошибку до того, как закончил ввод, что ухудшает UX.

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [formState документация](https://react-hook-form.com/docs/useform/formstate)
- [reset документация](https://react-hook-form.com/docs/useform/reset)
- [resetField документация](https://react-hook-form.com/docs/useform/resetfield)
- [setFocus документация](https://react-hook-form.com/docs/useform/setfocus)
- [getFieldState документация](https://react-hook-form.com/docs/useform/getfieldstate)
- [useWatch документация](https://react-hook-form.com/docs/usewatch)
- [ARIA для форм](https://www.w3.org/WAI/tutorials/forms/)
