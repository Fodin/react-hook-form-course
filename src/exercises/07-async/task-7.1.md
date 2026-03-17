# Задание 7.1: Async валидация

## Цель
Научиться выполнять асинхронную валидацию.

## Требования
Создайте форму регистрации:
1. Поле username с проверкой на сервере (имитация)
2. Поле email с валидацией формата
3. При потере фокуса на username — проверка доступности
4. Отображение статуса: "Проверка..." / "✅ Доступно" / "❌ Занято"

## Имитация API

```typescript
const checkUsername = async (username: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 500))
  return !['admin', 'user', 'test'].includes(username.toLowerCase())
}
```
