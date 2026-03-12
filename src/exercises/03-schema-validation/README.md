# Уровень 3: Валидация по схемам

## 3.1 Zod + React Hook Form

**Zod** — это TypeScript-first библиотека для валидации схем.

### Установка

```bash
npm install zod @hookform/resolvers
```

### Базовый пример

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 1. Создайте схему
const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
})

// 2. Выведите тип из схемы
type FormData = z.infer<typeof schema>

// 3. Используйте с useForm
const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

## 3.2 Yup + React Hook Form

**Yup** — альтернативная библиотека для валидации схем.

### Установка

```bash
npm install yup @hookform/resolvers
```

### Базовый пример

```tsx
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// 1. Создайте схему
const schema = yup.object({
  email: yup.string().email('Неверный email').required('Обязательно'),
  password: yup.string().min(8, 'Минимум 8 символов').required('Обязательно'),
})

// 2. Выведите тип из схемы (для TypeScript)
type FormData = yup.InferType<typeof schema>

// 3. Используйте с useForm
const { register, handleSubmit } = useForm<FormData>({
  resolver: yupResolver(schema),
})
```

## 3.3 Сложные схемы

### Zod примеры

```tsx
const schema = z.object({
  // Строки
  email: z.string().email(),
  username: z.string().min(3).max(20),
  
  // Числа
  age: z.number().min(18).max(120),
  price: z.number().positive(),
  
  // Массивы
  tags: z.array(z.string()).min(1),
  
  // Enum
  role: z.enum(['admin', 'user', 'guest']),
  
  // Union
  contact: z.union([
    z.object({ type: z.literal('email'), value: z.string().email() }),
    z.object({ type: z.literal('phone'), value: z.string() }),
  ]),
  
  // Объекты
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.string().regex(/^\d{5}$/),
  }),
})
```

### Yup примеры

```tsx
const schema = yup.object({
  // Строки
  email: yup.string().email(),
  username: yup.string().min(3).max(20),
  
  // Числа
  age: yup.number().min(18).max(120),
  price: yup.number().positive(),
  
  // Массивы
  tags: yup.array().of(yup.string()).min(1),
  
  // Enum
  role: yup.string().oneOf(['admin', 'user', 'guest']),
  
  // Объекты
  address: yup.object({
    city: yup.string(),
    street: yup.string(),
    zip: yup.string().matches(/^\d{5}$/),
  }),
})
```

## 3.4 Кастомные сообщения и i18n

```tsx
// Zod с кастомными сообщениями
const schema = z.object({
  email: z.string({
    required_error: 'Email обязателен',
    invalid_type_error: 'Должна быть строка',
  }).email('Неверный формат email'),
})

// Или через refine для сложных случаев
const schema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})
```

## 3.5 Zod vs Yup

| Критерий | Zod | Yup |
|----------|-----|-----|
| Размер | ~12KB | ~14KB |
| TypeScript | First-class | Хорошая |
| API | Функциональный | Цепочки |
| Производительность | Быстрее | Медленнее |
| Сообщества | Большое | Очень большое |

---

## 📝 Задания

Смотрите файл `task.md` для подробных заданий.
