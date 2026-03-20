# Уровень 2: Валидация — Built-in, Patterns, Custom

## Введение

Валидация — критически важная часть любой формы. React Hook Form предоставляет несколько способов
валидации: от простых встроенных правил до сложных кастомных функций.

---

## 1. Built-in правила валидации

### `required` — обязательное поле

```tsx
<input
  {...register('email', {
    required: 'Email обязателен',
  })}
/>

// С булевым значением (без сообщения)
<input
  {...register('email', {
    required: true,
  })}
/>
```

### `minLength` / `maxLength` — длина строки

```tsx
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
```

### `min` / `max` — диапазон чисел

```tsx
<input
  type="number"
  {...register('age', {
    required: 'Возраст обязателен',
    valueAsNumber: true,
    min: {
      value: 18,
      message: 'Минимум 18 лет',
    },
    max: {
      value: 100,
      message: 'Максимум 100 лет',
    },
  })}
/>
```

### `pattern` — RegExp паттерн

```tsx
<input
  {...register('email', {
    required: 'Email обязателен',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Неверный формат email',
    },
  })}
/>
```

---

## 2. Полезные RegExp паттерны

### Email

```tsx
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
```

### Российский телефон

```tsx
const phonePattern = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/
// Примеры: +7 999 123-45-67, +7(999)123-45-67, +79991234567
```

### URL

```tsx
const urlPattern = /^https?:\/\/.+\..+$/
```

### HEX цвет

```tsx
const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
// Примеры: #FFF, #FFFFFF, #3498db
```

### Slug (URL-friendly строка)

```tsx
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
// Примеры: my-page, article-123, blog-post
```

### Пароль (сложный)

```tsx
// Минимум 8 символов, заглавная, цифра, спецсимвол
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
```

---

## 3. Custom валидация через `validate`

### Одиночная функция

```tsx
<input
  {...register('password', {
    required: 'Пароль обязателен',
    validate: value => {
      if (value.length < 8) {
        return 'Минимум 8 символов'
      }
      if (!/[A-Z]/.test(value)) {
        return 'Должна быть заглавная буква'
      }
      if (!/\d/.test(value)) {
        return 'Должна быть цифра'
      }
      return true // Валидация прошла успешно
    },
  })}
/>
```

### Объект с несколькими проверками

```tsx
<input
  {...register('password', {
    required: 'Пароль обязателен',
    validate: {
      minLength: v => v.length >= 8 || 'Минимум 8 символов',
      uppercase: v => /[A-Z]/.test(v) || 'Должна быть заглавная буква',
      number: v => /\d/.test(v) || 'Должна быть цифра',
      special: v => /[!@#$%^&*]/.test(v) || 'Должен быть спецсимвол',
    },
  })}
/>
```

### Доступ к другим полям формы

```tsx
function PasswordForm() {
  const { register, getValues } = useForm()

  return (
    <form>
      <input {...register('password')} />

      <input
        {...register('confirmPassword', {
          validate: value => {
            const password = getValues('password')
            return value === password || 'Пароли не совпадают'
          },
        })}
      />
    </form>
  )
}
```

---

## 4. Cross-field валидация (несколько полей)

### Подтверждение пароля

```tsx
function RegistrationForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  return (
    <form>
      <input {...register('password', { required: 'Обязательно' })} />

      <input
        {...register('confirmPassword', {
          required: 'Обязательно',
          validate: {
            match: v => v === password || 'Пароли не совпадают',
          },
        })}
      />

      {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
    </form>
  )
}
```

### Новый пароль не должен совпадать с текущим

```tsx
function ChangePasswordForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  const currentPassword = watch('currentPassword')
  const newPassword = watch('newPassword')

  return (
    <form>
      <input {...register('currentPassword')} />

      <input
        {...register('newPassword', {
          validate: {
            different: v => v !== currentPassword || 'Новый пароль должен отличаться',
          },
        })}
      />

      <input
        {...register('confirmPassword', {
          validate: {
            match: v => v === newPassword || 'Пароли не совпадают',
          },
        })}
      />
    </form>
  )
}
```

---

## 5. Режимы валидации

### `mode` — когда запускать валидацию

```tsx
// Валидация при отправке (по умолчанию)
useForm({ mode: 'onSubmit' })

// Валидация при изменении
useForm({ mode: 'onChange' })

// Валидация при потере фокуса
useForm({ mode: 'onBlur' })

// Валидация при изменении и потере фокуса
useForm({ mode: 'all' })
```

### `reValidateMode` — когда перевалидировать после первой отправки

```tsx
useForm({
  mode: 'onChange',
  reValidateMode: 'onChange', // По умолчанию
})
```

### Рекомендации по выбору режима

| Режим      | Когда использовать                 |
| ---------- | ---------------------------------- |
| `onSubmit` | Простые формы, минимальный шум     |
| `onChange` | Формы с мгновенной обратной связью |
| `onBlur`   | Когда нужно проверить после ввода  |
| `all`      | Максимальная строгость             |

---

## 6. Отображение ошибок

### Базовое отображение

```tsx
;<input {...register('email', { required: 'Обязательно' })} />
{
  errors.email && <span className="error">{errors.email.message}</span>
}
```

### Стилизованное отображение

```tsx
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    {...register('email', { required: 'Обязательно' })}
    style={{
      borderColor: errors.email ? '#dc3545' : '#ddd',
    }}
  />
  {errors.email && (
    <span
      style={{
        color: '#dc3545',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
        display: 'block',
      }}
    >
      {errors.email.message}
    </span>
  )}
</div>
```

### Несколько ошибок для одного поля

По умолчанию RHF показывает только **первую** ошибку поля. Чтобы показать **все** ошибки
одновременно, используйте `criteriaMode: 'all'`:

```tsx
const { register, formState: { errors } } = useForm({
  criteriaMode: 'all'  // Собирать все ошибки, а не только первую
})

<input
  {...register('password', {
    validate: {
      minLength: v => v.length >= 8 || 'Минимум 8 символов',
      uppercase: v => /[A-Z]/.test(v) || 'Должна быть заглавная',
      number: v => /\d/.test(v) || 'Должна быть цифра',
    },
  })}
/>

{errors.password?.types && (
  <div style={{ color: '#dc3545', fontSize: '0.875rem' }}>
    {Object.entries(errors.password.types).map(([key, message]) => (
      <div key={key}>{message}</div>
    ))}
  </div>
)}
```

> **Важно:** при `criteriaMode: 'all'` все ошибки доступны через `errors.field.types` (объект), а не
> через `errors.field.message` (строка).

---

## 7. Полный пример: Форма регистрации с валидацией

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  username: string
  email: string
  age: number
  password: string
}

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    console.log('Registered:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input
          {...register('username', {
            required: 'Обязательное поле',
            minLength: { value: 3, message: 'Минимум 3 символа' },
            maxLength: { value: 20, message: 'Максимум 20 символов' },
          })}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Обязательное поле',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Неверный формат email' },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          {...register('age', {
            valueAsNumber: true,
            required: 'Обязательное поле',
            min: { value: 18, message: 'Минимум 18 лет' },
            max: { value: 120, message: 'Максимум 120 лет' },
          })}
        />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'Обязательное поле',
            minLength: { value: 6, message: 'Минимум 6 символов' },
            validate: {
              uppercase: v => /[A-Z]/.test(v) || 'Должна быть заглавная буква',
              number: v => /\d/.test(v) || 'Должна быть цифра',
            },
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}
```

---

## Частые ошибки новичков

### ❌ Ошибка 1: required без сообщения

```tsx
// ❌ Неправильно - пользователь не поймёт, что не так
<input {...register('email', { required: true })} />

// ✅ Правильно - с понятным сообщением
<input {...register('email', { required: 'Email обязателен' })} />
```

**Почему это ошибка:** Булево значение `true` не даёт пользователю информации о том, что нужно
заполнить поле.

---

### ❌ Ошибка 2: Pattern без экранирования

```tsx
// ❌ Неправильно - спецсимволы не экранированы
pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/

// ✅ Правильно - с флагами для регистронезависимости
pattern: {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Неверный формат email'
}
```

**Почему это ошибка:** Без флага `i` паттерн будет регистрозависимым. Также важно оборачивать в
объект с `message`.

---

### ❌ Ошибка 3: validate функция без return

```tsx
// ❌ Неправильно - нет return true при успехе
validate: value => {
  if (value.length < 8) {
    return 'Минимум 8 символов'
  }
  // нет return для успешного случая
}

// ✅ Правильно - явно возвращаем true
validate: value => {
  if (value.length < 8) {
    return 'Минимум 8 символов'
  }
  return true
}
```

**Почему это ошибка:** Функция валидации должна возвращать `true` при успехе или строку с ошибкой
при неудаче.

---

### ❌ Ошибка 4: validate без доступа к другим полям

```tsx
// ❌ Неправильно - нет доступа к password
validate: value => value === password // password не определён

// ✅ Правильно - используем getValues
const { getValues } = useForm()
validate: value => {
  const password = getValues('password')
  return value === password || 'Пароли не совпадают'
}
```

**Почему это ошибка:** Для кросс-полевой валидации нужно использовать `getValues` или `watch`.

---

### ❌ Ошибка 5: Игнорирование valueAsNumber

```tsx
// ❌ Неправильно - число приходит как строка
<input type="number" {...register('age')} />

// ✅ Правильно - преобразуем в число
<input type="number" {...register('age', { valueAsNumber: true })} />
```

**Почему это ошибка:** Без `valueAsNumber: true` числовые поля возвращаются как строки, что может
вызвать проблемы при валидации.

---

## 📚 Дополнительные ресурсы

- [Валидация в React Hook Form](https://react-hook-form.com/docs/useform/register#rules)
- [RegExp документация](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Валидация по схемам (Уровень 3)](../03-schema-validation/README.md)
