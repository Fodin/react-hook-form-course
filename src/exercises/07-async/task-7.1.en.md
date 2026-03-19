# Exercise 7.1: Async Validation

## Goal

Learn to perform async field validation.

## Requirements

Create a registration form:

1. Username field with server check (simulation)
2. Email field with format validation
3. On username blur — check availability
4. Display status: "Checking..." / "✅ Available" / "❌ Taken"

## Hint

API simulation for availability check:

```typescript
const checkUsername = async (username: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 500))
  return !['admin', 'user', 'test'].includes(username.toLowerCase())
}
```

## Checklist

- [ ] Username field sends an async request on blur
- [ ] "Checking..." is displayed during validation
- [ ] "✅ Available" or "❌ Taken" is displayed after check
- [ ] Email field is validated by format
- [ ] Form cannot be submitted if username is taken

## How to verify

1. Enter "admin" in the username field and blur — "❌ Taken" should appear
2. Enter a unique name — "✅ Available" should appear
3. Enter an invalid email — a validation error should appear
4. Try submitting the form with a taken username — submission should not go through
