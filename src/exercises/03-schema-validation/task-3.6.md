# Задание 3.6: superRefine и discriminatedUnion

## Цель

Научиться использовать продвинутые возможности Zod для сложной валидации.

## Требования

Создайте форму обратной связи с условными полями:

1. Поле `contactMethod` — radio: `'email'` | `'phone'` | `'telegram'`
2. В зависимости от выбора показывать:
   - email — поле `email` (валидация email)
   - phone — поле `phone` (минимум 10 цифр)
   - telegram — поле `telegram` (начинается с @)
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

## Чеклист

- [ ] `discriminatedUnion` используется для условных полей контакта
- [ ] `superRefine` проверяет зависимость длины message от rating
- [ ] При выборе email показывается только поле email
- [ ] При выборе phone показывается только поле phone
- [ ] При выборе telegram показывается только поле telegram
- [ ] При rating < 3 message требует минимум 50 символов

## Как проверить себя

1. Выберите email — появится поле email, поля phone/telegram скрыты
2. Введите невалидный email — ошибка
3. Переключите на phone — поле email исчезнет, появится phone
4. Введите rating = 2 и message из 25 символов — ошибка (нужно 50)
5. Введите rating = 4 и message из 25 символов — ок
6. Заполните все корректно — форма отправляется
