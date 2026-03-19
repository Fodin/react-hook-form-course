# Задание 4.1: Controller для кастомных компонентов

## Цель

Научиться интегрировать кастомные компоненты с react-hook-form через Controller.

## Требования

1. Создайте кастомный компонент Select
2. Используйте `Controller` для интеграции с react-hook-form
3. Поле `country` должно быть обязательным
4. Отображайте ошибку валидации

## Интерфейс данных

```typescript
interface CountryForm {
  country: string
}
```

## Подсказка

```typescript
<Controller
  name="country"
  control={control}
  render={({ field }) => <Select {...field} />}
/>
```
