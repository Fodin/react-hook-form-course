# Exercise 3.2: Validation with Yup

## Goal

Learn to use Yup schemas.

## Requirements

Rewrite the form from exercise 3.1 using Yup instead of Zod.

Compare the experience of using both libraries.

## Hint

```typescript
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  // your schema
})
```
