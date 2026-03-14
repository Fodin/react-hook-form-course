# Задание 6.1: Dirty / Touched states

## Цель
Научиться отслеживать состояние полей.

## Требования
Создайте форму с полями `name` и `email`:
1. Отображайте статус Dirty для каждого поля (✅/❌)
2. Отображайте статус Touched для каждого поля (✅/❌)
3. Отображайте общий статус isDirty формы

## Подсказка

```typescript
const { formState: { dirtyFields, touchedFields, isDirty } } = useForm()
```
