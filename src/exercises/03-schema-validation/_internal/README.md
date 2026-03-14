# Уровень 3: Валидация по схемам — Zod и Yup

## Введение

Валидация по схемам — это декларативный способ описания правил валидации всей формы в одном месте. Это делает код чище, типобезопаснее и легче для поддержки.

**Почему схемы лучше встроенной валидации?**

| Встроенная валидация | Валидация по схемам |
|---------------------|---------------------|
| Правила разбросаны по полям | Все правила в одном месте |
| Сложная кросс-полевая валидация | Легкая кросс-полевая валидация |
| Меньше типобезопасности | Полная типобезопасность |
| Сложно переиспользовать | Легко переиспользовать |

---

## Часть 1: Zod

### Что такое Zod?

**Zod** — это TypeScript-first библиотека для валидации схем с нулевыми зависимостями.

**Установка:**
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

---

### Основные типы Zod

#### Строки

```tsx
const schema = z.object({
  // Обязательная строка
  name: z.string(),
  
  // Email
  email: z.string().email('Неверный email'),
  
  // URL
  website: z.string().url('Неверный URL'),
  
  // UUID
  id: z.string().uuid('Неверный UUID'),
  
  // С длиной
  username: z.string().min(3).max(20),
  
  // С паттерном
  phone: z.string().regex(/^\+7\d{10}$/, 'Неверный формат'),
  
  // Опциональная
  bio: z.string().optional(),
  
  // С дефолтным значением
  role: z.string().default('user'),
})
```

#### Числа

```tsx
const schema = z.object({
  // Обязательное число
  age: z.number(),
  
  // С диапазоном
  rating: z.number().min(1).max(10),
  
  // Положительное
  price: z.number().positive('Цена должна быть положительной'),
  
  // Отрицательное
  balance: z.number().negative(),
  
  // Целое
  count: z.number().int('Должно быть целым числом'),
  
  // Опциональное
  discount: z.number().optional(),
})
```

#### Булевы значения

```tsx
const schema = z.object({
  agree: z.boolean().refine(v => v === true, 'Необходимо согласие'),
  newsletter: z.boolean().optional(),
})
```

#### Массивы

```tsx
const schema = z.object({
  // Массив строк
  tags: z.array(z.string()),
  
  // С минимальной длиной
  skills: z.array(z.string()).min(1, 'Выберите хотя бы один навык'),
  
  // Массив объектов
  contacts: z.array(z.object({
    type: z.string(),
    value: z.string(),
  })),
})
```

#### Enum (перечисления)

```tsx
const schema = z.object({
  // Zod enum
  role: z.enum(['admin', 'user', 'guest']),
  
  // TypeScript enum
  status: z.nativeEnum(Status),
})
```

#### Объекты

```tsx
const schema = z.object({
  // Вложенный объект
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.string().regex(/^\d{5}$/, 'Неверный индекс'),
  }),
  
  // Опциональный объект
  company: z.object({
    name: z.string(),
    position: z.string(),
  }).optional(),
})
```

---

### Кастомная валидация с `refine`

#### Одиночное refine

```tsx
const schema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], // К какому полю применить ошибку
  }
)
```

#### Несколько refine

```tsx
const schema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
}).refine(
  (data) => data.newPassword !== data.currentPassword,
  {
    message: 'Новый пароль должен отличаться',
    path: ['newPassword'],
  }
).refine(
  (data) => data.newPassword.length >= 8,
  {
    message: 'Минимум 8 символов',
    path: ['newPassword'],
  }
)
```

#### refine с асинхронностью

```tsx
const schema = z.object({
  username: z.string(),
}).refine(
  async (data) => {
    const response = await fetch(`/api/check-username?username=${data.username}`)
    const { available } = await response.json()
    return available
  },
  {
    message: 'Имя пользователя занято',
    path: ['username'],
  }
)
```

---

### Полная схема регистрации

```tsx
import { z } from 'zod'

const registrationSchema = z.object({
  // Личная информация
  firstName: z.string().min(1, 'Обязательно'),
  lastName: z.string().min(1, 'Обязательно'),
  email: z.string().email('Неверный email'),
  age: z.number().min(18, 'Минимум 18 лет').max(120, 'Максимум 120 лет'),
  
  // Пароль
  password: z.string()
    .min(8, 'Минимум 8 символов')
    .regex(/[A-Z]/, 'Должна быть заглавная буква')
    .regex(/\d/, 'Должна быть цифра')
    .regex(/[!@#$%^&*]/, 'Должен быть спецсимвол'),
  
  confirmPassword: z.string(),
  
  // Адрес
  address: z.object({
    country: z.string().min(1, 'Обязательно'),
    city: z.string().min(1, 'Обязательно'),
    zip: z.string().regex(/^\d{5}$/, 'Неверный индекс'),
  }),
  
  // Навыки
  skills: z.array(z.string()).min(1, 'Выберите хотя бы один'),
  
  // Роль
  role: z.enum(['developer', 'designer', 'manager']),
  
  // Согласие
  agree: z.boolean().refine(v => v === true, 'Необходимо согласие'),
})

// Кросс-полевая валидация
.refine(
  (data) => data.password === data.confirmPassword,
  { message: 'Пароли не совпадают', path: ['confirmPassword'] }
)

type RegistrationForm = z.infer<typeof registrationSchema>
```

---

## Часть 2: Yup

### Что такое Yup?

**Yup** — это проверенная временем библиотека для валидации схем с цепочечным API.

**Установка:**
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

// 2. Выведите тип
type FormData = yup.InferType<typeof schema>

// 3. Используйте с useForm
const { register, handleSubmit } = useForm<FormData>({
  resolver: yupResolver(schema),
})
```

---

### Основные типы Yup

#### Строки

```tsx
const schema = yup.object({
  // Обязательная строка
  name: yup.string().required('Обязательно'),
  
  // Email
  email: yup.string().email('Неверный email').required('Обязательно'),
  
  // URL
  website: yup.string().url('Неверный URL'),
  
  // С длиной
  username: yup.string().min(3).max(20),
  
  // С паттерном
  phone: yup.string().matches(/^\+7\d{10}$/, 'Неверный формат'),
  
  // Опциональная
  bio: yup.string(),
  
  // С дефолтным значением
  role: yup.string().default('user'),
  
  // Один из значений
  status: yup.string().oneOf(['active', 'inactive']),
})
```

#### Числа

```tsx
const schema = yup.object({
  // Обязательное число
  age: yup.number().required('Обязательно'),
  
  // С диапазоном
  rating: yup.number().min(1).max(10),
  
  // Положительное
  price: yup.number().positive('Цена должна быть положительной'),
  
  // Целое
  count: yup.number().integer('Должно быть целым числом'),
  
  // Опциональное
  discount: yup.number(),
})
```

#### Булевы значения

```tsx
const schema = yup.object({
  agree: yup.boolean().oneOf([true], 'Необходимо согласие'),
  newsletter: yup.boolean(),
})
```

#### Массивы

```tsx
const schema = yup.object({
  // Массив строк
  tags: yup.array().of(yup.string()),
  
  // С минимальной длиной
  skills: yup.array().of(yup.string()).min(1, 'Выберите хотя бы один'),
  
  // Массив объектов
  contacts: yup.array().of(
    yup.object({
      type: yup.string(),
      value: yup.string(),
    })
  ),
})
```

#### Объекты

```tsx
const schema = yup.object({
  // Вложенный объект
  address: yup.object({
    city: yup.string().required('Обязательно'),
    street: yup.string().required('Обязательно'),
    zip: yup.string().matches(/^\d{5}$/, 'Неверный индекс'),
  }),
  
  // Опциональный объект
  company: yup.object({
    name: yup.string(),
    position: yup.string(),
  }),
})
```

---

### Кастомная валидация с `test`

```tsx
const schema = yup.object({
  password: yup.string(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  
  // Кастомный test
  username: yup.string().test(
    'is-available',
    'Имя занято',
    async (value) => {
      const response = await fetch(`/api/check-username?username=${value}`)
      const { available } = await response.json()
      return available
    }
  ),
})
```

---

## Часть 3: Сравнение Zod vs Yup

| Критерий | Zod | Yup |
|----------|-----|-----|
| **Размер** | ~12 KB | ~14 KB |
| **TypeScript** | First-class, отличный вывод типов | Хороший, но иногда требует аннотаций |
| **API** | Функциональный, композируемый | Цепочечный, выразительный |
| **Производительность** | Быстрее | Медленнее |
| **Асинхронная валидация** | Через `refine` | Через `test` |
| **Сообщество** | Большое, растущее | Очень большое, зрелое |
| **Документация** | Отличная | Хорошая |

### Когда выбирать Zod?

- ✅ Новый TypeScript проект
- ✅ Важна типобезопасность
- ✅ Нужна лучшая производительность
- ✅ Предпочитаете функциональный API

### Когда выбирать Yup?

- ✅ JavaScript проект
- ✅ Уже используете Yup в проекте
- ✅ Любите цепочечный API
- ✅ Нужно много готовых примеров

---

## Часть 4: Интеграция с React Hook Form

### Полный пример с Zod

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: 'Пароли не совпадают', path: ['confirmPassword'] }
)

type FormData = z.infer<typeof schema>

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    console.log('Submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <label>Confirm Password</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
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

### ❌ Ошибка 1: Не импортировали resolver

```tsx
// ❌ Неправильно - забыли resolver
import { z } from 'zod'
const { register } = useForm({ resolver: zodResolver(schema) }) // zodResolver не импортирован

// ✅ Правильно - импортируем resolver
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const { register } = useForm({ resolver: zodResolver(schema) })
```

**Почему это ошибка:** Без `zodResolver` или `yupResolver` схема не будет интегрирована с React Hook Form.

---

### ❌ Ошибка 2: .refine() без path

```tsx
// ❌ Неправильно - ошибка не привязана к полю
.refine((data) => data.password === data.confirm, {
  message: 'Пароли не совпадают'
})

// ✅ Правильно - указываем path
.refine((data) => data.password === data.confirm, {
  message: 'Пароли не совпадают',
  path: ['confirm']
})
```

**Почему это ошибка:** Без `path` ошибка не будет отображена в `errors.confirmPassword`, а будет в `errors.root`.

---

### ❌ Ошибка 3: Неправильный type inference

```tsx
// ❌ Неправильно - тип не выведен из схемы
type FormData = {
  email: string
  password: string
}
const schema = z.object({ email: z.string(), password: z.string() })

// ✅ Правильно - используем z.infer
const schema = z.object({
  email: z.string(),
  password: z.string(),
})
type FormData = z.infer<typeof schema>
```

**Почему это ошибка:** Ручное описание типа может рассинхронизироваться со схемой. `z.infer` гарантирует актуальность.

---

### ❌ Ошибка 4: .optional() вместо .nullable()

```tsx
// ❌ Неправильно - undefined не то же самое что null
bio: z.string().optional() // может быть undefined

// ✅ Правильно - если нужно null
bio: z.string().nullable() // может быть null
```

**Почему это ошибка:** `optional()` делает поле `string | undefined`, а `nullable()` — `string | null`. Это разные типы.

---

### ❌ Ошибка 5: Минимум 1 элемент в массиве без сообщения

```tsx
// ❌ Неправильно - непонятная ошибка
skills: z.array(z.string()).min(1)

// ✅ Правильно - с сообщением
skills: z.array(z.string()).min(1, 'Выберите хотя бы один навык')
```

**Почему это ошибка:** Пользователь должен понимать, что именно не так с формой.

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [Zod документация](https://zod.dev/)
- [Yup документация](https://github.com/jquense/yup)
- [@hookform/resolvers](https://react-hook-form.com/docs/useform/resolver)
- [Zod GitHub](https://github.com/colinhacks/zod)
