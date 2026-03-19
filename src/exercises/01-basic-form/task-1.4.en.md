# Exercise 1.4: formState — Errors and Validity

## Goal

Learn to display form state.

## Requirements

1. Create a form with `email` and `password` fields
2. Display:
   - Form validity indicator (green/red)
   - Error counter: "Errors: 0"
   - Submit status: "Submitting..." during submit
   - Dirty status: "Form is dirty" if fields were changed
3. Use `formState` to get the state

## Hint

```typescript
const {
  formState: { errors, isValid, isSubmitting, isDirty },
} = useForm()
```
