# Задание 6.6: setFocus, resetField и getFieldState

## Цель

Научиться использовать продвинутые методы управления полями формы.

## Требования

Создайте форму редактирования профиля:

1. Поля: `name`, `email`, `phone` (все обязательные)
2. При монтировании — автофокус на поле `name` через `setFocus`
3. При неудачном submit — фокус на первое поле с ошибкой через `onInvalid` callback
4. Рядом с каждым полем кнопка "Сбросить" — сбрасывает это поле через `resetField`
5. Под каждым полем показывать статус через `getFieldState`:
   - "Изменено" если `isDirty`
   - "Затронуто" если `isTouched`
6. Используйте `delayError: 500` для плавного появления ошибок

## Интерфейс данных

```typescript
interface ProfileForm {
  name: string
  email: string
  phone: string
}
```

## Подсказка

```typescript
const { setFocus, resetField, getFieldState, formState } = useForm<ProfileForm>({
  defaultValues: { name: 'John', email: 'john@example.com', phone: '' },
  delayError: 500,
})

const nameState = getFieldState('name', formState)
// { isDirty: boolean, isTouched: boolean, error: FieldError | undefined }
```
