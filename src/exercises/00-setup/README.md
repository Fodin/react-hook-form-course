# Уровень 0: Setup — Настройка и первая форма

## Введение в React Hook Form

Добро пожаловать в курс по **React Hook Form**! Это современная библиотека для управления формами в
React, которая использует хуки для предоставления простого и эффективного API.

### Почему React Hook Form?

Сравним с альтернативами:

| Библиотека          | Размер | Производительность | API             |
| ------------------- | ------ | ------------------ | --------------- |
| **React Hook Form** | ~12 KB | ⭐⭐⭐⭐⭐         | Хуки            |
| Formik              | ~16 KB | ⭐⭐⭐             | Компоненты/Хуки |
| Redux Form          | ~23 KB | ⭐⭐               | Redux           |

**Преимущества React Hook Form:**

1. **🚀 Производительность** — минимальное количество ререндеров благодаря неконтролируемым
   компонентам
2. **🎣 Простой API** — всего несколько хуков для работы с любыми формами
3. **📦 Маленький размер** — всего ~12 KB в продакшене
4. **🔧 TypeScript** — отличная поддержка типов из коробки
5. **✅ Валидация** — встроенная + поддержка схем (Zod, Yup, Joi)
6. **🌐 Сообщество** — более 35 000 звёзд на GitHub

---

## Основные концепции

### 1. Неконтролируемые vs Контролируемые компоненты

**React Hook Form использует неконтролируемые компоненты** — это ключ к производительности!

```tsx
// ❌ Контролируемый компонент (много ререндеров)
const [value, setValue] = useState('')
<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// ✅ Неконтролируемый компонент (минимум ререндеров)
const { register } = useForm()
<input {...register('fieldName')} />
```

В контролируемом подходе каждое изменение вызывает ререндер. В неконтролируемом — React Hook Form
напрямую работает с DOM.

### 2. Хук `useForm`

Это главный хук, который вы будете использовать в каждой форме:

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}

function MyForm() {
  const {
    register, // Регистрирует поля в форме
    handleSubmit, // Обрабатывает отправку
    watch, // Подписывается на значения
    formState, // Состояние формы (ошибки, валидность)
    setValue, // Устанавливает значение поля
    getValues, // Получает значения
    reset, // Сбрасывает форму
  } = useForm<FormData>()

  return <form>...</form>
}
```

### 3. Регистрация полей через `register`

```tsx
// Базовая регистрация
<input {...register('email')} />

// С опциями валидации
<input
  {...register('email', {
    required: 'Email обязателен',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Неверный формат email'
    }
  })}
/>
```

### 4. Обработка отправки через `handleSubmit`

```tsx
const onSubmit = (data: FormData) => {
  console.log(data) // { email: 'test@example.com', password: '123' }
}

;<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  <input {...register('password')} />
  <button type="submit">Отправить</button>
</form>
```

**Важно:** `handleSubmit` автоматически предотвращает стандартную отправку формы и собирает данные.

**Что это значит?**

- **Предотвращает стандартную отправку** — внутри вызывается `event.preventDefault()`, поэтому
  страница не перезагружается
- **Собирает данные** — автоматически извлекает значения из всех зарегистрированных полей и передает
  их в вашу функцию `onSubmit`
- **Запускает валидацию** — перед вызовом `onSubmit` проверяет все правила валидации; если есть
  ошибки, `onSubmit` не вызывается

Без React Hook Form вам пришлось бы писать это вручную:

```tsx
// ❌ Вручную (без React Hook Form)
const handleSubmit = (e: FormEvent) => {
  e.preventDefault() // Предотвращаем перезагрузку
  const formData = new FormData(e.currentTarget) // Собираем данные
  const data = Object.fromEntries(formData) // Преобразуем
  // Валидация вручную...
  onSubmit(data)
}

// ✅ С React Hook Form (всё автоматически)
<form onSubmit={handleSubmit(onSubmit)}>
```

---

## Пошаговое руководство: Первая форма

### Шаг 1: Создайте интерфейс данных

Определите, какие данные будет содержать ваша форма:

```typescript
interface LoginForm {
  email: string
  password: string
}
```

### Шаг 2: Инициализируйте `useForm`

```tsx
const { register, handleSubmit } = useForm<LoginForm>()
```

### Шаг 3: Зарегистрируйте поля

```tsx
<input {...register('email')} />
<input {...register('password')} />
```

### Шаг 4: Создайте обработчик отправки

```tsx
const onSubmit = (data: LoginForm) => {
  console.log('Данные формы:', data)
}
```

### Шаг 5: Подключите `handleSubmit` к форме

```tsx
<form onSubmit={handleSubmit(onSubmit)}>{/* поля */}</form>
```

---

## Полный пример кода

```tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginForm {
  email: string
  password: string
}

export function FirstForm() {
  const { register, handleSubmit } = useForm<LoginForm>()
  const [submittedData, setSubmittedData] = useState<LoginForm | null>(null)

  const onSubmit = (data: LoginForm) => {
    console.log('Form submitted:', data)
    setSubmittedData(data)
  }

  return (
    <div>
      <h2>Форма входа</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} placeholder="Введите email" />
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Введите пароль"
          />
        </div>

        <button type="submit">Войти</button>
      </form>

      {submittedData && (
        <div>
          <h3>Отправленные данные:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
```

---

## Частые ошибки новичков

### ❌ Ошибка 1: Забыли `type="submit"`

```tsx
// ❌ Неправильно
<button onClick={handleSubmit(onSubmit)}>Отправить</button>

// ✅ Правильно
<button type="submit">Отправить</button>
```

**Почему это неправильно:**

- При `onClick` форма не отправляется при нажатии Enter в полях ввода
- Не работает стандартное поведение браузера (навигация клавиатурой, доступность)
- `handleSubmit` не получает событие формы, а получает событие клика кнопки
- Нарушается семантика HTML — кнопка без `type` по умолчанию имеет `type="submit"`, но лучше явно
  указывать

### ❌ Ошибка 2: Не используют деструктуризацию

```tsx
// ❌ Неправильно
const form = useForm<FormData>()
form.register('email')

// ✅ Правильно
const { register } = useForm<FormData>()
register('email')
```

**Почему это неправильно:**

- Код становится многословным: `form.register`, `form.handleSubmit`, `form.formState`...
- Труднее читать, особенно при использовании многих методов
- В JSX приходится писать `{...form.register('email')}` вместо `{...register('email')}`
- Это общепринятая практика в React Hook Form — деструктуризация сразу

### ❌ Ошибка 3: Забывают передать тип в `useForm`

```tsx
// ❌ Неправильно (нет типизации)
const { register } = useForm()

// ✅ Правильно
const { register } = useForm<FormData>()
```

**Почему это неправильно:**

- TypeScript не знает, какие поля есть в форме — можно написать `register('неСуществующееПоле')`
- Нет автодополнения при вводе имен полей
- В `onSubmit` данные будут иметь тип `any` вместо типобезопасного `FormData`
- При рефакторинге легко пропустить переименование полей

---

## 📚 Дополнительные ресурсы

- [Официальная документация React Hook Form](https://react-hook-form.com/)
- [useForm API](https://react-hook-form.com/docs/useform)
- [register API](https://react-hook-form.com/docs/useform/register)
- [Примеры на React Hook Form](https://react-hook-form.com/get-started#Quickstart)

---

## Что дальше?

В следующем уровне вы изучите:

- Различные типы полей (text, number, checkbox, select)
- Методы `watch`, `setValue`, `getValues`
- Состояние формы через `formState`
