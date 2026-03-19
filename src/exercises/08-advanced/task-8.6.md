# Задание 8.6: useFormState и тестирование

## Цель

Научиться изолировать ререндеры с `useFormState` и тестировать формы.

## Требования

### Часть 1: useFormState

1. Создайте форму с полями `email` и `password`
2. Вынесите кнопку submit в отдельный компонент `SubmitButton`
3. `SubmitButton` использует `useFormState({ control })` для получения `isSubmitting` и `isValid`
4. Добавьте счётчик ререндеров в основную форму и в `SubmitButton` — покажите что `SubmitButton` ререндерится только при изменении `isValid`/`isSubmitting`

### Часть 2: Тестирование (опционально)

5. Напишите тест для формы с помощью `@testing-library/react`:
   - Форма рендерится с пустыми полями
   - При submit пустой формы — показываются ошибки валидации
   - При заполнении и submit — вызывается onSubmit с правильными данными

## Интерфейс данных

```typescript
interface LoginForm {
  email: string
  password: string
}
```

## Подсказка

```typescript
import { useFormState } from 'react-hook-form'
import type { Control } from 'react-hook-form'

function SubmitButton({ control }: { control: Control<LoginForm> }) {
  const { isSubmitting, isValid } = useFormState({ control })
  const renderCount = useRef(0)
  renderCount.current++

  return (
    <div>
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Войти'}
      </button>
      <small>SubmitButton renders: {renderCount.current}</small>
    </div>
  )
}
```
