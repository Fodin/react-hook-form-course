# Exercise 3.6: superRefine and discriminatedUnion

## Goal

Learn to use advanced Zod features for complex validation.

## Requirements

Create a feedback form with conditional fields:

1. Field `contactMethod` — radio: `'email'` | `'phone'` | `'telegram'`
2. Depending on the selection, show:
   - email — field `email` (email validation)
   - phone — field `phone` (minimum 10 digits)
   - telegram — field `telegram` (starts with @)
3. Field `message` — textarea (required, minimum 20 characters)
4. Field `rating` — number (1-5, required)
5. Use `discriminatedUnion` for conditional fields
6. Use `superRefine` for an additional check: if rating < 3, then message must be at least 50 characters

## Data interface

```typescript
type ContactMethod = 'email' | 'phone' | 'telegram'

interface FeedbackForm {
  contactMethod: ContactMethod
  email?: string
  phone?: string
  telegram?: string
  message: string
  rating: number
}
```

## Checklist

- [ ] `discriminatedUnion` is used for conditional contact fields
- [ ] `superRefine` checks message length dependency on rating
- [ ] Selecting email shows only the email field
- [ ] Selecting phone shows only the phone field
- [ ] Selecting telegram shows only the telegram field
- [ ] When rating < 3, message requires at least 50 characters

## How to verify

1. Select email — email field appears, phone/telegram fields are hidden
2. Enter an invalid email — error
3. Switch to phone — email field disappears, phone field appears
4. Enter rating = 2 and a message of 25 characters — error (needs 50)
5. Enter rating = 4 and a message of 25 characters — ok
6. Fill everything correctly — form submits
