# Exercise 6.1: Dirty / Touched States

## Goal

Learn to track field state.

## Requirements

Create a form with `name` and `email` fields:

1. Display Dirty status for each field (✅/❌)
2. Display Touched status for each field (✅/❌)
3. Display overall form isDirty status

## Hint

```typescript
const {
  formState: { dirtyFields, touchedFields, isDirty },
} = useForm()
```
