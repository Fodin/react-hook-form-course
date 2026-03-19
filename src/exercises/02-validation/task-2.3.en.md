# Exercise 2.3: Custom Validation with validate

## Goal

Learn to create custom validation rules.

## Requirements

Create a registration form with a password that must match the rules:

1. Minimum 8 characters
2. At least one uppercase letter
3. At least one digit
4. At least one special character (!@#$%^&\*)

Use the `validate` object with multiple functions to check each rule separately.

## Hint

Regular expressions for character checks:

```typescript
const hasUpperCase = /[A-Z]/
const hasDigit = /\d/
const hasSpecial = /[!@#$%^&*]/
```

## Checklist

- [ ] Password field is present
- [ ] Each rule is validated by a separate function
- [ ] Errors are shown for each violated rule
- [ ] Password `Passw0rd!` passes all checks

## How to verify

1. Enter `short` — error (fewer than 8 characters)
2. Enter `longenough` — error (no uppercase)
3. Enter `Longenough` — error (no digit)
4. Enter `Longeno1` — error (no special character)
5. Enter `Passw0rd!` — all checks pass
