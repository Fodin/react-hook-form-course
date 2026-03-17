# Задание 4.2: Radio и Select

## Цель
Научиться работать с radio и select полями.

## Требования
1. `gender`: radio кнопки (male, female, other)
2. `country`: select (USA, Russia, Germany, France)
3. Оба поля обязательные
4. Отображайте выбранное значение

## Интерфейс данных

```typescript
interface ProfileForm {
  gender: 'male' | 'female' | 'other'
  country: 'USA' | 'Russia' | 'Germany' | 'France'
}
```
