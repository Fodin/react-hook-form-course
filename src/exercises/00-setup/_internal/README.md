# Уровень 0: Setup — Настройка и первая форма

## Введение в React Hook Form

Добро пожаловать в курс по **React Hook Form**! Это современная библиотека для управления формами в React, которая использует хуки для предоставления простого и эффективного API.

### Почему React Hook Form?

Сравним с альтернативами:

| Библиотека | Размер | Производительность | API |
|------------|--------|-------------------|-----|
| **React Hook Form** | ~12 KB | ⭐⭐⭐⭐⭐ | Хуки |
| Formik | ~16 KB | ⭐⭐⭐ | Компоненты/Хуки |
| Redux Form | ~23 KB | ⭐⭐ | Redux |

**Преимущества React Hook Form:**

1. **🚀 Производительность** — минимальное количество ре-рендеров благодаря неконтролируемым компонентам
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
// ❌ Контролируемый компонент (много ре-рендеров)
const [value, setValue] = useState('')
<input value={value} onChange={(e) => setValue(e.target.value)} />

// ✅ Неконтролируемый компонент (минимум ре-рендеров)
const { register } = useForm()
<input {...register('fieldName')} />
```

В контролируемом подходе каждое изменение вызывает ре-рендер. В неконтролируемом — React Hook Form напрямую работает с DOM.

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
    register,           // Регистрирует поля в форме
    handleSubmit,       // Обрабатывает отправку
    watch,              // Подписывается на значения
    formState,          // Состояние формы (ошибки, валидность)
    setValue,           // Устанавливает значение поля
    getValues,          // Получает значения
    reset,              // Сбрасывает форму
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

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  <input {...register('password')} />
  <button type="submit">Отправить</button>
</form>
```

**Важно:** `handleSubmit` автоматически предотвращает стандартную отправку формы и собирает данные.

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
<form onSubmit={handleSubmit(onSubmit)}>
  {/* поля */}
</form>
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
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Введите email"
          />
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

### ❌ Ошибка 2: Не используют деструктуризацию

```tsx
// ❌ Неправильно
const form = useForm<FormData>()
form.register('email')

// ✅ Правильно
const { register } = useForm<FormData>()
register('email')
```

### ❌ Ошибка 3: Забывают передать тип в `useForm`

```tsx
// ❌ Неправильно (нет типизации)
const { register } = useForm()

// ✅ Правильно
const { register } = useForm<FormData>()
```

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [Официальная документация React Hook Form](https://react-hook-form.com/)
- [useForm API](https://react-hook-form.com/docs/useform)
- [register API](https://react-hook-form.com/docs/useform/register)
- [CodeSandbox примеры](https://codesandbox.io/s/react-hook-form-get-started-f659w)

---

## Что дальше?

В следующем уровне вы изучите:
- Различные типы полей (text, number, checkbox, select)
- Методы `watch`, `setValue`, `getValues`
- Состояние формы через `formState`
