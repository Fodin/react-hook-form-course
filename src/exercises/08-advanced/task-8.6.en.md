# Exercise 8.6: useFormState and Testing

## Goal

Learn to isolate re-renders with `useFormState` and test forms.

## Requirements

### Part 1: useFormState

1. Create a form with `email` and `password` fields
2. Extract the submit button into a separate `SubmitButton` component
3. `SubmitButton` uses `useFormState({ control })` to get `isSubmitting` and `isValid`
4. Add a render counter to the main form and to `SubmitButton` — demonstrate that `SubmitButton` only re-renders when `isValid`/`isSubmitting` changes

### Part 2: Testing (optional)

5. Write a test for the form using `@testing-library/react`:
   - Form renders with empty fields
   - Submitting an empty form shows validation errors
   - Filling in and submitting calls onSubmit with correct data

## Data interface

```typescript
interface LoginForm {
  email: string
  password: string
}
```

## Checklist

- [ ] Form contains email and password fields
- [ ] `SubmitButton` is extracted into a separate component
- [ ] Render counter shows that `SubmitButton` does not re-render on text input
- [ ] `SubmitButton` only re-renders when `isValid` or `isSubmitting` changes
- [ ] (Optional) Tests pass

## How to verify

1. Type in the email field — the main form render counter should increase, but `SubmitButton` counter should not
2. Fill both fields with valid data — `SubmitButton` should re-render when `isValid` changes
3. Submit the form — `SubmitButton` should re-render when `isSubmitting` changes
