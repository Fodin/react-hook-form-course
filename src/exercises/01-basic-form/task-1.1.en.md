# Exercise 1.1: Registration Form with Different Field Types

## Goal

Learn to register fields of different types.

## Requirements

Create a registration form with the following fields:

1. `firstName` — text (required)
2. `lastName` — text (required)
3. `email` — email (required)
4. `age` — number (required, from 18 to 100)
5. `bio` — textarea (optional)
6. `website` — URL (optional)

On submit, log the data to the console and display it on the page.

```typescript
interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  age: number
  bio?: string
  website?: string
}
```

## Checklist

- [ ] All 6 fields are created with correct types (`input`, `textarea`)
- [ ] Required fields have validation
- [ ] `age` field only accepts numbers from 18 to 100
- [ ] Data is logged to console on submit
- [ ] Data is displayed on the page after submission

## How to verify

1. Fill in all required fields with valid data
2. Click the submit button
3. Verify the data appears in the console and on the page
4. Try submitting with empty required fields — the form should not submit
