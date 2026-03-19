# Задание 3.6: superRefine и discriminatedUnion

## Цель

Научиться использовать продвинутые возможности Zod для сложной валидации.

## Требования

Создайте форму обратной связи с условными полями:

1. Поле `contactMethod` — radio: `'email'` | `'phone'` | `'telegram'`
2. В зависимости от выбора показывать:
   - email → поле `email` (валидация email)
   - phone → поле `phone` (минимум 10 цифр)
   - telegram → поле `telegram` (начинается с @)
3. Поле `message` — textarea (обязательное, минимум 20 символов)
4. Поле `rating` — number (1-5, обязательное)
5. Используйте `discriminatedUnion` для условных полей
6. Используйте `superRefine` для дополнительной проверки: если rating < 3, то message должен быть минимум 50 символов

## Интерфейс данных

```typescript
type ContactMethod = 'email' | 'phone' | 'telegram'

interface FeedbackForm {
  contactMethod: ContactMethod
  email?: string
  phone?: string
  telegram?: string
  message: string
  rating: number
}
```

## Подсказка

```typescript
import { z } from 'zod'

const contactSchema = z.discriminatedUnion('contactMethod', [
  z.object({
    contactMethod: z.literal('email'),
    email: z.string().email('Неверный email'),
  }),
  z.object({
    contactMethod: z.literal('phone'),
    phone: z.string().regex(/^\d{10,}$/, 'Минимум 10 цифр'),
  }),
  z.object({
    contactMethod: z.literal('telegram'),
    telegram: z.string().startsWith('@', 'Должен начинаться с @'),
  }),
])
```
