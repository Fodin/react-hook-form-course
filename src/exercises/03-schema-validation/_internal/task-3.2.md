# Задание 3.2: Валидация с Yup

## Цель
Научиться использовать Yup схемы.

## Требования
Перепишите форму из задания 3.1 используя Yup вместо Zod.

Сравните ощущения от использования двух библиотек.

## Подсказка

```typescript
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  // ваша схема
})
```
