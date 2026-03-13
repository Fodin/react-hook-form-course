// Теория для каждого уровня курса
// Импортируем README.md как текст

export const theoryContent: Record<string, string> = {
  '0': `
# Уровень 0: Setup — Настройка и первая форма

## Введение в React Hook Form

**React Hook Form** — это современная библиотека для управления формами в React, которая использует хуки для предоставления простого и эффективного API.

### Почему React Hook Form?

| Библиотека | Размер | Производительность |
|------------|--------|-------------------|
| React Hook Form | ~12 KB | ⭐⭐⭐⭐⭐ |
| Formik | ~16 KB | ⭐⭐⭐ |
| Redux Form | ~23 KB | ⭐⭐ |

**Преимущества:**

1. **Производительность** — минимальное количество ре-рендеров
2. **Простой API** — всего несколько хуков
3. **Маленький размер** — всего ~12 KB
4. **TypeScript** — отличная поддержка типов
5. **Валидация** — встроенная + Zod, Yup

---

## Основные концепции

### 1. Неконтролируемые компоненты

React Hook Form использует неконтролируемые компоненты:

\`\`\`tsx
// ✅ Неконтролируемый компонент
const { register } = useForm()
<input {...register('fieldName')} />
\`\`\`

### 2. Хук useForm

\`\`\`tsx
const {
  register,      // Регистрирует поля
  handleSubmit,  // Обрабатывает отправку
  watch,         // Подписывается на значения
  formState,     // Состояние формы
} = useForm<FormData>()
\`\`\`

### 3. Регистрация полей

\`\`\`tsx
<input {...register('email')} />
\`\`\`

### 4. Обработка отправки

\`\`\`tsx
const onSubmit = (data) => console.log(data)

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  <button type="submit">Отправить</button>
</form>
\`\`\`
`,

  '1': `
# Уровень 1: Основы — useForm, register, handleSubmit

## 1. Хук useForm

\`\`\`tsx
const {
  register,      // Для регистрации полей
  handleSubmit,  // Для обработки отправки
  watch,         // Для отслеживания значений
  formState,     // Объект состояния формы
  setValue,      // Для установки значения поля
  getValues,     // Для получения значений
  reset,         // Для сброса формы
} = useForm<FormData>()
\`\`\`

## 2. Регистрация полей через register

\`\`\`tsx
// Базовая регистрация
<input {...register('email')} />

// С опциями валидации
<input
  {...register('email', {
    required: 'Email обязателен',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
      message: 'Неверный формат email'
    }
  })}
/>
\`\`\`

## 3. Обработка отправки

\`\`\`tsx
const onSubmit = (data: FormData) => {
  console.log(data)
}

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  <button type="submit">Отправить</button>
</form>
\`\`\`

## 4. watch — отслеживание значений

\`\`\`tsx
const { watch } = useForm()
const values = watch() // Все поля
const username = watch('username') // Конкретное поле
\`\`\`

## 5. setValue / getValues

\`\`\`tsx
const { setValue, getValues } = useForm()

setValue('email', 'test@example.com') // Установить значение
const email = getValues('email') // Получить значение
\`\`\`

## 6. formState

\`\`\`tsx
const { formState: { errors, isValid, isSubmitting, isDirty } } = useForm()
\`\`\`
`,

  '2': `
# Уровень 2: Валидация — Built-in, Patterns, Custom

## 1. Built-in правила валидации

### required — обязательное поле

\`\`\`tsx
<input
  {...register('email', {
    required: 'Email обязателен',
  })}
/>
\`\`\`

### minLength / maxLength

\`\`\`tsx
<input
  {...register('username', {
    required: 'Обязательно',
    minLength: {
      value: 3,
      message: 'Минимум 3 символа',
    },
    maxLength: {
      value: 20,
      message: 'Максимум 20 символов',
    },
  })}
/>
\`\`\`

### min / max для чисел

\`\`\`tsx
<input
  type="number"
  {...register('age', {
    required: 'Обязательно',
    min: {
      value: 18,
      message: 'Минимум 18 лет',
    },
    max: {
      value: 120,
      message: 'Максимум 120 лет',
    },
  })}
/>
\`\`\`

## 2. Pattern валидация

\`\`\`tsx
<input
  {...register('phone', {
    required: 'Обязательно',
    pattern: {
      value: /^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$/,
      message: 'Неверный формат телефона',
    },
  })}
/>
\`\`\`

## 3. Custom валидация

\`\`\`tsx
<input
  type="password"
  {...register('password', {
    required: 'Обязательно',
    validate: {
      minLength: v => v.length >= 8 || 'Минимум 8 символов',
      uppercase: v => /[A-Z]/.test(v) || 'Нужна заглавная буква',
      number: v => /\\d/.test(v) || 'Нужна цифра',
      special: v => /[!@#$%^&*]/.test(v) || 'Нужен спецсимвол',
    },
  })}
/>
\`\`\`

## 4. Cross-field валидация

\`\`\`tsx
const { watch } = useForm()
const newPassword = watch('newPassword')

<input
  type="password"
  {...register('confirmPassword', {
    validate: value => 
      value === newPassword || 'Пароли не совпадают',
  })}
/>
\`\`\`
`,

  '3': `
# Уровень 3: Схемы — Zod и Yup

## 1. Zod схема

\`\`\`tsx
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  confirmPassword: z.string(),
  age: z.number().min(18).max(120),
})

type FormData = z.infer<typeof schema>

const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
})
\`\`\`

## 2. Yup схема

\`\`\`tsx
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  age: yup.number().min(18).max(120),
})

const { register, handleSubmit } = useForm({
  resolver: yupResolver(schema),
})
\`\`\`

## 3. refine для сложной валидации

\`\`\`tsx
const schema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
}).refine(data => data.newPassword !== data.currentPassword, {
  message: 'Новый пароль должен отличаться',
  path: ['newPassword'],
})
\`\`\`
`,

  '4': `
# Уровень 4: Сложные поля — Controller, Radio, Select, Checkbox, File

## 1. Controller для кастомных компонентов

\`\`\`tsx
import { Controller } from 'react-hook-form'

<Controller
  name="category"
  control={control}
  defaultValue=""
  render={({ field }) => (
    <Select
      value={field.value}
      onChange={field.onChange}
      options={categories}
    />
  )}
/>
\`\`\`

## 2. Radio кнопки

\`\`\`tsx
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
\`\`\`

## 3. Select

\`\`\`tsx
<select {...register('country')}>
  <option value="">Выберите страну</option>
  <option value="us">USA</option>
  <option value="ru">Russia</option>
</select>
\`\`\`

## 4. Checkbox

### Одиночный

\`\`\`tsx
<input type="checkbox" {...register('agree')} />
\`\`\`

### Множественный

\`\`\`tsx
const { watch, setValue } = useForm()
const skills = watch('skills', [])

const handleSkillChange = (skill: string, checked: boolean) => {
  if (checked) {
    setValue('skills', [...skills, skill])
  } else {
    setValue('skills', skills.filter(s => s !== skill))
  }
}

<input
  type="checkbox"
  value="React"
  checked={skills.includes('React')}
  onChange={(e) => handleSkillChange('React', e.target.checked)}
/>
\`\`\`

## 5. File Upload

\`\`\`tsx
<input
  type="file"
  accept="image/*"
  {...register('avatar', {
    validate: {
      type: v => v[0]?.type.startsWith('image/'),
      size: v => v[0]?.size < 2 * 1024 * 1024,
    },
  })}
/>
\`\`\`
`,

  '5': `
# Уровень 5: Динамические формы — useFieldArray, Wizard

## 1. useFieldArray

\`\`\`tsx
import { useForm, useFieldArray } from 'react-hook-form'

const { control, register, handleSubmit } = useForm()
const { fields, append, remove } = useFieldArray({
  control,
  name: 'emails',
})

<form onSubmit={handleSubmit(onSubmit)}>
  {fields.map((field, index) => (
    <div key={field.id}>
      <input {...register(\`emails.\${index}.value\`)} />
      <button type="button" onClick={() => remove(index)}>✕</button>
    </div>
  ))}
  <button type="button" onClick={() => append({ value: '' })}>
    + Добавить
  </button>
</form>
\`\`\`

## 2. Условные поля

\`\`\`tsx
const contactMethod = watch('contactMethod')

<select {...register('contactMethod')}>
  <option value="email">Email</option>
  <option value="phone">Телефон</option>
</select>

{contactMethod === 'email' && (
  <input {...register('email')} />
)}
{contactMethod === 'phone' && (
  <input {...register('phone')} />
)}
\`\`\`

## 3. Зависимые поля

\`\`\`tsx
const country = watch('country')
const cities = country ? citiesByCountry[country] : []

useEffect(() => {
  setValue('city', '') // Сбросить город при смене страны
}, [country])

<select {...register('city')}>
  {cities.map(city => (
    <option key={city} value={city}>{city}</option>
  ))}
</select>
\`\`\`

## 4. Wizard (multi-step форма)

\`\`\`tsx
const [step, setStep] = useState(1)

const onNext = async () => {
  const valid = await trigger(['email', 'name'])
  if (valid) setStep(s => s + 1)
}

{step === 1 && <Step1 />}
{step === 2 && <Step2 />}

<button type="button" onClick={onNext}>Далее</button>
\`\`\`
`,

  '6': `
# Уровень 6: Состояния и UX — Dirty, Touched, Reset, A11y

## 1. Dirty / Touched

\`\`\`tsx
const { formState: { dirtyFields, touchedFields, isDirty } } = useForm()

// dirtyFields.name === true — поле изменено
// touchedFields.name === true — поле было сфокусировано и потеряло фокус
// isDirty === true — форма изменена
\`\`\`

## 2. Reset и defaultValues

\`\`\`tsx
const { reset } = useForm({
  defaultValues: {
    username: '',
    email: '',
  },
})

// Заполнить форму
reset({ username: 'John', email: 'john@example.com' })

// Сбросить к начальным значениям
reset()
\`\`\`

## 3. Focus management

\`\`\`tsx
useEffect(() => {
  const firstError = Object.keys(errors)[0]
  if (firstError) {
    document.getElementById(firstError)?.focus()
  }
}, [errors])
\`\`\`

## 4. Accessibility (ARIA)

\`\`\`tsx
<input
  {...register('email')}
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <span id="email-error" role="alert">
    {errors.email.message}
  </span>
)}
\`\`\`

## 5. Performance

\`\`\`tsx
// ❌ watch() вызывает ре-рендер всех полей
const values = watch()

// ✅ useWatch для отдельных полей
const email = useWatch({ name: 'email' })
\`\`\`
`,

  '7': `
# Уровень 7: Асинхронность — Async валидация, API

## 1. Async валидация

\`\`\`tsx
const validateUsername = async (value: string) => {
  await new Promise(r => setTimeout(r, 500))
  const busy = ['admin', 'user', 'test']
  return busy.includes(value) ? 'Занято' : true
}

<input
  {...register('username', {
    required: 'Обязательно',
    validate: validateUsername,
  })}
/>
\`\`\`

## 2. Загрузка данных (Edit mode)

\`\`\`tsx
const { reset } = useForm()

useEffect(() => {
  fetch('/api/user/1')
    .then(res => res.json())
    .then(data => reset(data))
}, [])
\`\`\`

## 3. Submit с loading/error

\`\`\`tsx
const { formState: { isSubmitting } } = useForm()

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Отправка...' : 'Отправить'}
</button>
\`\`\`

## 4. Debounce для автосохранения

\`\`\`tsx
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(values))
  }, 1000)
  return () => clearTimeout(timer)
}, [values])
\`\`\`
`,

  '8': `
# Уровень 8: Продвинутые техники

## 1. Интеграция с UI-библиотекой

\`\`\`tsx
<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      label="Email"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )}
/>
\`\`\`

## 2. Кастомные хуки

\`\`\`tsx
function useFormPersist(name: string, defaultValues: any) {
  const [stored, setStored] = useState(() => {
    const saved = localStorage.getItem(name)
    return saved ? JSON.parse(saved) : defaultValues
  })

  const save = (data: any) => {
    localStorage.setItem(name, JSON.stringify(data))
    setStored(data)
  }

  const clear = () => {
    localStorage.removeItem(name)
    setStored(defaultValues)
  }

  return { stored, save, clear }
}
\`\`\`

## 3. FormContext

\`\`\`tsx
const formMethods = useForm()

<FormProvider {...formMethods}>
  <PersonalStep />
  <ContactStep />
</FormProvider>

// В подкомпонентах:
const { register } = useFormContext()
\`\`\`

## 4. localStorage Persistence

\`\`\`tsx
const { reset } = useForm()

useEffect(() => {
  const saved = localStorage.getItem('draft')
  if (saved) reset(JSON.parse(saved))
}, [])

useEffect(() => {
  const subscription = watch((data) => {
    localStorage.setItem('draft', JSON.stringify(data))
  })
  return () => subscription.unsubscribe()
}, [watch])
\`\`\`
`,
}
