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

## Data Interface

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
