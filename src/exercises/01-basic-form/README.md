# Уровень 1: Основы — useForm, register, handleSubmit, formState

## Введение

На этом уровне вы глубоко изучите основные инструменты React Hook Form. После завершения вы сможете
создавать полноценные формы с различными типами полей и управлять их состоянием.

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
    register, // Для регистрации полей
    handleSubmit, // Для обработки отправки
    watch, // Для отслеживания значений
    formState, // Объект состояния формы
    setValue, // Для установки значения поля
    getValues, // Для получения значений
    reset, // Для сброса формы
    trigger, // Для ручной валидации
    setError, // Для установки ошибки
    clearErrors, // Для очистки ошибок
  } = useForm<FormData>()

  return <form>...</form>
}
```

### Параметры `useForm`

```tsx
useForm<FormData>({
  mode: 'onChange', // Когда запускать валидацию
  reValidateMode: 'onChange', // Когда перевалидировать
  defaultValues: {
    // Значения по умолчанию
    firstName: '',
    lastName: '',
  },
  shouldFocusError: true, // Фокус на первом ошибочном поле
  criteriaMode: 'firstError', // Показывать первую или все ошибки
})
```

**Режимы валидации:**

| mode          | Описание                                                                     |
|---------------|------------------------------------------------------------------------------|
| `'onSubmit'`  | Валидация только при отправке (по умолчанию)                                 |
| `'onChange'`  | Валидация при каждом изменении                                               |
| `'onBlur'`    | Валидация при потере фокуса                                                  |
| `'onTouched'` | Валидация после первого blur, затем при каждом change. Оптимальный баланс UX |
| `'all'`       | Валидация при изменении и потере фокуса                                      |

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
    valueAsNumber: true, // Преобразовать в число
  })}
/>
```

### Обработчики событий и преобразование значений

```tsx
<input
  {...register('email', {
    onChange: e => {
      console.log('Изменение:', e.target.value)
    },
    onBlur: e => {
      console.log('Потеря фокуса:', e.target.value)
    },
    setValueAs: value => value.trim(), // Обработка перед установкой
  })}
/>
```

**Что такое `setValueAs`?**

`setValueAs` — это функция-трансформер, которая преобразует значение **перед** тем, как оно попадёт
в форму.

**Распространённые применения:**

```tsx
// Удаление пробелов по краям
setValueAs: value => value.trim()

// Приведение к верхнему регистру
setValueAs: value => value.toUpperCase()

// Преобразование в число (альтернатива valueAsNumber)
setValueAs: value => Number(value)

// Преобразование строки даты в объект Date
setValueAs: value => new Date(value)

// Удаление нецифровых символов из телефона
setValueAs: value => value.replace(/\D/g, '')
```

**Когда использовать:**

- Нормализация данных (trim, uppercase, lowercase)
- Преобразование типов (string → number, string → Date)
- Форматирование ввода (удаление лишних символов)

---

## 3. `handleSubmit` — обработка отправки формы

### Базовое использование

```tsx
const { handleSubmit } = useForm<FormData>()

const onSubmit = (data: FormData) => {
  console.log('Valid data:', data)
}

<form onSubmit={handleSubmit(onSubmit)}>
```

### Два callback: `onValid` и `onInvalid`

`handleSubmit` принимает **два** аргумента:

1. **`onValid`** (обязательный) — вызывается, когда форма прошла валидацию
2. **`onInvalid`** (опциональный) — вызывается, когда есть ошибки валидации

```tsx
const { handleSubmit } = useForm<FormData>()

const onValid = (data: FormData) => {
  console.log('Success:', data)
}

const onInvalid = (errors: FieldErrors<FormData>) => {
  console.log('Validation errors:', errors)
}

<form onSubmit={handleSubmit(onValid, onInvalid)}>
```

**Когда полезен `onInvalid`?**

- Логирование ошибок валидации в аналитику
- Показ toast-уведомления при неуспешной отправке
- Фокусировка на определённом элементе UI
- Отправка данных об ошибках на сервер для мониторинга

**Пример с аналитикой:**

```tsx
handleSubmit(
  (data) => {
    // Form is valid — send data
    api.submitForm(data)
  },
  (errors) => {
    // Form has errors — log to analytics
    analytics.track('form_validation_failed', {
      fields: Object.keys(errors),
    })
  }
)
```

### Асинхронная отправка

`handleSubmit` корректно обрабатывает асинхронные функции. Пока промис не разрешится, `isSubmitting`
будет `true`:

```tsx
const onSubmit = async (data: FormData) => {
  await api.sendData(data) // isSubmitting === true
  // isSubmitting === false after resolve/reject
}

<form onSubmit={handleSubmit(onSubmit)}>
  <button disabled={isSubmitting}>
    {isSubmitting ? 'Отправка...' : 'Отправить'}
  </button>
</form>
```

---

## 4. Различные типы полей

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
<textarea {...register('bio')} rows={4} cols={50}/>
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

**Типизация Select с TypeScript:**

```tsx
// Строгая типизация с литеральными типами
type Country = 'ru' | 'us' | 'de' | ''

interface FormData {
  country: Country
}

const { register } = useForm<FormData>()

// TypeScript проверит, что значения в option соответствуют типу
< select
{...
  register('country')
}
>
<
option
value = "" > Выберите
страну < /option>
<option value="ru">Россия</option>
<option value="us">USA</option>
<option value="de">Germany</option>
{/* <option value="invalid">❌ Ошибка компиляции!</option> */
}
</select>

// Альтернатива: использование enum
enum Country {
  Russia = 'ru',
  USA = 'us',
  Germany = 'de',
}

interface FormData {
  country: Country | ''
}
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

**Типизация Radio с TypeScript:**

```tsx
// Строгая типизация с литеральными типами
type Gender = 'male' | 'female' | 'other'

interface FormData {
  gender: Gender
}

const { register } = useForm<FormData>()

// TypeScript проверит значения
< div >
< label >
< input
type = "radio"
value = "male"
{...
  register('gender')
}
/>
Мужской
< /label>
<label>
  <input type="radio" value="female" {...register('gender')} />
  Женский
</label>
<label>
  <input type="radio" value="other" {...register('gender')} />
  Другое
</label>
{/* <input type="radio" value="invalid" {...register('gender')} /> ❌ Ошибка! */
}
</div>

// Использование констант для избежания опечаток
const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
} as const

type Gender = typeof GENDER_OPTIONS[keyof typeof GENDER_OPTIONS]

<
input
type = "radio"
value = { GENDER_OPTIONS.MALE }
{...
  register('gender')
}
/>
```

### Checkbox

**Одиночный чекбокс (boolean):**

```tsx
interface FormData {
  agree: boolean  // true если отмечен, false если нет
}

// Простая регистрация — React Hook Form автоматически даст boolean
<input type="checkbox" {...register('agree')} />

// С валидацией
<input
  type="checkbox"
  {...register('agree', {
    required: 'Необходимо согласие'
  })}
/>
```

**Множественный выбор (массив строк):**

Когда нужно выбрать несколько опций из списка (например, навыки, интересы).
React Hook Form автоматически собирает значения в массив, если несколько чекбоксов зарегистрированы
с одним именем:

```tsx
interface FormData {
  skills: string[]  // Массив выбранных значений: ['react', 'typescript']
}

const { register } = useForm<FormData>({
  defaultValues: {
    skills: []  // Инициализируем пустым массивом
  }
})

// Все чекбоксы используют одно имя — RHF соберёт отмеченные value в массив
< input
type = "checkbox"
value = "react"
{...
  register('skills')
}
/>
<label>React</label>

<input type="checkbox" value="typescript" {...register('skills')} />
<label>TypeScript</label>

<input type="checkbox" value="nodejs" {...register('skills')} />
<label>Node.js</label>
```

При отправке `skills` будет содержать массив отмеченных значений, например
`['react', 'typescript']`.

---

## 5. `formState` — состояние формы

### Получение состояния

```tsx
const {
  formState: {
    errors, // Объект ошибок валидации
    isDirty, // Форма изменена
    dirtyFields, // Какие поля изменены
    touchedFields, // Какие поля затронуты
    isSubmitting, // Идёт отправка
    isValid, // Форма валидна
    isValidating, // Идёт валидация
    submitCount, // Количество отправок
  },
} = useForm()
```

### Пример использования

```tsx
function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
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

### ⚠️ ВАЖНО: Правильное использование `formState` (Proxy)

`formState` — это **Proxy-объект**. Это означает, что React Hook Form отслеживает, какие свойства вы
используете, и подписывает компонент только на них.

**Правила работы с `formState`:**

#### ✅ Правильно: Деструктуризация сразу

```tsx
// ✅ ПРАВИЛЬНО — деструктуризируем сразу при получении
const {
  formState: { errors, isDirty, isValid },
} = useForm()

// React Hook Form знает, что нужно отслеживать errors, isDirty, isValid
```

#### ❌ Неправильно: Сохранение в переменную без деструктуризации

```tsx
// ❌ НЕПРАВИЛЬНО — formState в переменной остаётся Proxy
const { formState } = useForm()

// Компонент НЕ будет перерисовываться при изменении errors!
< div > { formState.errors.email?.message }
</div>
```

#### ✅ Правильно: Условный доступ к свойствам

```tsx
// ✅ ПРАВИЛЬНО — доступ напрямую в JSX
const { formState } = useForm()

return (
  <div>
    {formState.errors.email && <span>{formState.errors.email.message}</span>}
    {formState.isSubmitting && <div>Загрузка...</div>}
  </div>
)
```

**Почему это работает?** Proxy отслеживает каждое обращение к `formState.errors` и
`formState.isSubmitting` в JSX.

#### ✅ Правильно: Использование в useEffect

```tsx
// ✅ ПРАВИЛЬНО — передаём formState целиком в зависимости
const { formState } = useForm()

useEffect(() => {
  console.log('Форма изменена:', formState.isDirty)
  console.log('Есть ошибки:', formState.errors)
}, [formState]) // formState целиком

// или деструктурированные значения
const {
  formState: { isDirty, errors },
} = useForm()

useEffect(() => {
  console.log('Форма изменена:', isDirty)
}, [isDirty, errors])
```

#### ❌ Частые ошибки

```tsx
// ❌ Копирование formState
const { formState } = useForm()
const state = formState // Proxy потерян!
console.log(state.errors) // Может не обновиться

// ❌ Деструктуризация позже
const { formState } = useForm()
const { errors } = formState // Слишком поздно! Proxy уже не работает корректно

// ✅ Деструктурируй сразу
const {
  formState: { errors },
} = useForm()
```

**Итог: Как правильно?**

1. **Деструктуризация сразу** — лучший вариант для производительности
2. **Прямой доступ в JSX** — работает, но менее оптимально
3. **НЕ сохраняйте formState в переменную** без немедленной деструктуризации

---

## 6. `watch` — отслеживание значений

### Зачем нужен `watch`?

`watch` позволяет **подписаться на изменения** значений формы и **реагировать на них в реальном
времени**.

**Типичные сценарии использования:**

- 📊 Показать превью или результат на основе введённых данных
- 🔍 Валидация зависимых полей (например, "Повторите пароль")
- 🎨 Изменение UI в зависимости от выбора (показать/скрыть поля)
- 💰 Расчёты в реальном времени (сумма, скидка)
- 🔤 Индикаторы (сила пароля, количество символов)

### `watch` vs `onChange` vs `getValues`

| Метод       | Когда использовать                         | Вызывает ререндер? |
|-------------|--------------------------------------------|--------------------|
| `watch`     | Нужно **отображать** значение в UI         | ✅ Да               |
| `onChange`  | Нужно **выполнить действие** при изменении | ❌ Нет              |
| `getValues` | Нужно **получить** значение один раз       | ❌ Нет              |

**Пример различий:**

```tsx
const { register, watch, getValues } = useForm()

// ✅ watch — подписка с ререндером
const password = watch('password')
  // При каждом изменении password компонент перерисуется
  < div > Длина
:
{
  password.length
}
символов < /div>

// ✅ onChange — действие без ререндера
<input
  {...register('email', {
    onChange: (e) => {
      console.log('Email изменён:', e.target.value)
      // Компонент НЕ перерисовывается
    }
  })}
/>

// ✅ getValues — получение текущего значения
const handleClick = () => {
  const currentEmail = getValues('email')
  console.log('Email сейчас:', currentEmail)
  // Читаем значение в момент клика, без подписки
}
```

**Ключевое отличие `watch` от `getValues`:**

> The difference between `watch` and `getValues` is that `getValues` will not trigger re-renders or
> subscribe to input changes.

- `watch('email')` — **подписка**: компонент перерисуется при каждом изменении email
- `getValues('email')` — **моментальное чтение**: просто получаем текущее значение без подписки

### Варианты использования `watch`

**Отслеживание одного поля:**

```tsx
const firstName = watch('firstName')
```

**Отслеживание нескольких полей:**

```tsx
const [firstName, lastName] = watch(['firstName', 'lastName'])
```

**Отслеживание всех полей:**

```tsx
const allValues = watch()
console.log(allValues) // { firstName: 'John', lastName: 'Doe' }
```

**Значение по умолчанию:**

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
      <div style={{ color: strength.color }}>Сила пароля: {strength.label}</div>
    </div>
  )
}
```

---

## 7. `setValue` и `getValues`

### `setValue` — установка значения

```tsx
const { setValue } = useForm()

// Установить значение
setValue('firstName', 'John')

// С опциями
setValue('firstName', 'John', {
  shouldValidate: true, // Запустить валидацию
  shouldDirty: true, // Пометить как dirty
  shouldTouch: true, // Пометить как touched
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
      <button type="button" onClick={reset}>
        Очистить
      </button>
    </form>
  )
}
```

---

## 8. `reset` — сброс формы

```tsx
const { reset } = useForm()

// Сброс к начальным значениям (из defaultValues)
reset()

// Сброс с новыми значениями
reset({
  firstName: 'John',
  lastName: 'Doe',
})

// С опциями
reset(values, {
  keepErrors: false, // boolean - сохранить ли ошибки валидации
  keepDirty: false, // boolean - сохранить ли флаги dirty для полей
  keepValues: false, // boolean - сохранить ли текущие значения полей
  keepDefaultValues: false, // boolean - сохранить ли defaultValues
  keepIsSubmitted: false, // boolean - сохранить ли статус isSubmitted
  keepTouched: false, // boolean - сохранить ли флаги touched
  keepIsValid: false, // boolean - сохранить ли статус isValid
  keepSubmitCount: false, // boolean - сохранить ли счётчик submitCount
})
```

**Когда вызывать `reset` напрямую, а когда через функцию?**

```tsx
// ✅ Правильно — передаём функцию напрямую
<button type="button" onClick={reset}>
  Очистить
</button>

// ✅ Тоже правильно — если нужно передать параметры
<button type="button" onClick={() => reset({ email: '' })}>
  Очистить с пустым email
</button>

// ⚠️ Избыточно, но работает
<button type="button" onClick={() => reset()}>
  Очистить
</button>
```

**Когда использовать каждую опцию:**

```tsx
// После успешной отправки — полный сброс
reset()

// После успешной отправки — сброс к новым данным (режим редактирования)
reset(dataFromServer)

// Отмена изменений, но сохранить ошибки
reset(defaultValues, { keepErrors: true })

// Сброс формы, но оставить флаги touched (пользователь уже взаимодействовал)
reset(defaultValues, { keepTouched: true })
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
        <span style={{ marginLeft: '1rem' }}>Отправка: {isSubmitting ? '⏳' : '✓'}</span>
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
          <textarea {...register('bio')} rows={4}/>
        </div>

        <div>
          <label>Сайт</label>
          <input type="url" {...register('website')} placeholder="https://..."/>
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

## Частые ошибки новичков

### ❌ Ошибка 1: Неправильное использование valueAsNumber

```tsx
// ❌ Неправильно - age будет строкой
<input type="number" {...register('age')} />

// ✅ Правильно - преобразуем в число
<input type="number" {...register('age', { valueAsNumber: true })} />
```

**Почему это ошибка:** Без `valueAsNumber: true` числовые поля возвращают строки, что может вызвать
проблемы при валидации и отправке данных.

---

### ❌ Ошибка 2: Watch без значения по умолчанию

```tsx
// ❌ Неправильно - undefined до первого рендера
const value = watch('field')
  < p > { value.length }
</p> // Ошибка!

// ✅ Правильно - с дефолтным значением
const value = watch('field', '')
  < p > { value.length }
</p> // Работает!
```

**Почему это ошибка:** `watch` возвращает `undefined` пока поле не зарегистрировано. Нужно указывать
значение по умолчанию.

---

### ❌ Ошибка 3: setValue без инициализации поля

```tsx
// ❌ Неправильно - поле не зарегистрировано
setValue('email', 'test@example.com')

// ✅ Правильно - сначала register, потом setValue
< input
{...
  register('email')
}
/>
setValue('email', 'test@example.com')
```

**Почему это ошибка:** `setValue` работает только с зарегистрированными полями. Поле должно быть
зарегистрировано через `register`.

---

### ❌ Ошибка 4: getValues в JSX для отображения данных

```tsx
// ❌ Неправильно - значение не будет обновляться в UI
const values = getValues()
  < p > { values.email }
</p>

// ✅ Правильно - watch подписывается на изменения и обновляет UI
const email = watch('email')
  < p > { email }
</p>

// ✅ Также правильно - getValues в обработчиках (не в JSX)
const onSubmit = () => {
  const values = getValues()
  console.log(values)
}
```

**Почему это ошибка:** `getValues()` читает текущее значение **без подписки** на изменения —
компонент не будет перерисовываться при вводе. Для отображения данных в UI используйте `watch`, а
`getValues` — только в обработчиках событий.

---

### ❌ Ошибка 5: Условный доступ к formState

```tsx
// ❌ Неправильно - условный доступ не подписывает Proxy
const { formState } = useForm()
if (someCondition) {
  console.log(formState.errors) // Proxy не подпишется
}

// ✅ Правильно - деструктуризация в render-фазе подписывает Proxy
const { formState: { errors, isDirty, isValid } } = useForm()
< p > { errors.email?.message }
</p>
```

**Почему это важно:** RHF использует Proxy для отслеживания, какие свойства `formState` вы читаете.
Деструктуризация в render-фазе гарантирует подписку и ререндер при изменении.

**Почему это ошибка:** `formState` — это Proxy объект. Нужно деструктуризировать конкретные свойства
для правильной подписки на изменения.

---

## 📚 Дополнительные ресурсы

- [useForm документация](https://react-hook-form.com/docs/useform)
- [register документация](https://react-hook-form.com/docs/useform/register)
- [watch документация](https://react-hook-form.com/docs/useform/watch)
- [formState документация](https://react-hook-form.com/docs/useform/formstate)
- [setValue документация](https://react-hook-form.com/docs/useform/setvalue)
