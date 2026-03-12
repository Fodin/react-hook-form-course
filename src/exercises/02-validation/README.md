# Уровень 2: Валидация

## 2.1 Built-in валидация

React Hook Form поддерживает встроенные правила валидации:

```tsx
<input 
  {...register('email', {
    required: 'Email обязателен',
    minLength: { value: 5, message: 'Минимум 5 символов' },
    maxLength: { value: 50, message: 'Максимум 50 символов' },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Неверный формат email'
    },
  })} 
/>
```

### Правила валидации

| Правило | Описание | Пример |
|---------|----------|--------|
| `required` | Обязательное поле | `required: 'Обязательно'` |
| `minLength` | Минимальная длина | `minLength: { value: 3, message: '...' }` |
| `maxLength` | Максимальная длина | `maxLength: { value: 50, message: '...' }` |
| `min` | Минимальное значение | `min: { value: 18, message: '...' }` |
| `max` | Максимальное значение | `max: { value: 100, message: '...' }` |
| `pattern` | RegExp паттерн | `pattern: { value: /regex/, message: '...' }` |
| `validate` | Кастомная функция | `validate: (v) => v.length > 0` |

## 2.2 Custom валидация

Функция `validate` позволяет создавать сложные правила:

```tsx
<input 
  {...register('password', {
    validate: {
      minLength: (v) => v.length >= 8 || 'Минимум 8 символов',
      uppercase: (v) => /[A-Z]/.test(v) || 'Должна быть заглавная буква',
      number: (v) => /\d/.test(v) || 'Должна быть цифра',
    }
  })} 
/>
```

## 2.3 Cross-field валидация

Валидация нескольких полей:

```tsx
const { watch, register } = useForm()
const password = watch('password')

<input 
  {...register('confirmPassword', {
    validate: (value) => value === password || 'Пароли не совпадают'
  })} 
/>
```

## 2.4 mode валидации

```tsx
// Валидация при изменении (по умолчанию: 'onSubmit')
useForm({ mode: 'onChange' })

// Валидация при потере фокуса
useForm({ mode: 'onBlur' })

// Валидация при изменении и потере фокуса
useForm({ mode: 'all' })
```

---

## 📝 Задания

Смотрите файл `task.md` для подробных заданий.
