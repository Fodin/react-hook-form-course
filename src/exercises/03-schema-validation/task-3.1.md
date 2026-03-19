# Задание 3.1: Базовая валидация с Zod

## Цель

Научиться использовать Zod схемы с React Hook Form.

## Требования

Создайте форму регистрации с Zod схемой:

1. `email` — email, обязательно
2. `password` — минимум 8 символов, обязательно
3. `confirmPassword` — должно совпадать с password
4. `age` — число от 18 до 120

Используйте `zodResolver` для интеграции с react-hook-form.

## Подсказка

```typescript
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  // ваша схема
})

type FormData = z.infer<typeof schema>
```
