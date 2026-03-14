# Task 0.1: First Form

## Goal
Create a simple form with two fields: email and password.

## Requirements
1. Create a `LoginForm` interface with fields:
   - `email: string`
   - `password: string`

2. Use the `useForm<LoginForm>` hook to manage the form

3. Register two fields via `register`:
   - `email` field (type `email`)
   - `password` field (type `password`)

4. Add a submit button with text "Login"

5. Log form data to console on submission

## Expected Result

```tsx
// When entering email: "test@example.com", password: "123456"
// Console should show:
// { email: "test@example.com", password: "123456" }
```

---

## ✅ Checklist

- [ ] Interface `LoginForm` is defined
- [ ] `useForm<LoginForm>` is initialized
- [ ] Fields are registered via `register`
- [ ] Submit button works
- [ ] Data is logged to console

---

## 📚 Additional Resources

- [Official React Hook Form Documentation](https://react-hook-form.com/)
- [useForm Hook](https://react-hook-form.com/docs/useform)
