# Exercise 3.1: Basic Validation with Zod

## Goal
Learn to use Zod schemas with React Hook Form.

## Requirements
Create a registration form with Zod schema:
1. `email` — email, required
2. `password` — minimum 8 characters, required
3. `confirmPassword` — must match password
4. `age` — number from 18 to 120

Use `zodResolver` for integration with react-hook-form.

## Hint

```typescript
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  // your schema
})

type FormData = z.infer<typeof schema>
```
