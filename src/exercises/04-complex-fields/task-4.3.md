# Задание 4.3: Checkbox

## Цель

Научиться работать с одиночными и множественными checkbox.

## Требования

1. `agree`: одиночный checkbox "Согласен с правилами" (обязательное)
2. `skills`: множественный выбор (React, Vue, Angular, Svelte)
3. Минимум один навык должен быть выбран

## Интерфейс данных

```typescript
interface SkillsForm {
  agree: boolean
  skills: string[]
}
```
