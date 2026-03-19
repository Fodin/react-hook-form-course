# Level 3: Schema Validation — Zod and Yup

## Introduction

Schema validation is a declarative way to describe validation rules for the entire form in one
place. This makes the code cleaner, more type-safe, and easier to maintain.

**Why schemas are better than built-in validation?**

| Built-in Validation            | Schema Validation           |
|--------------------------------|-----------------------------|
| Rules scattered across fields  | All rules in one place      |
| Complex cross-field validation | Easy cross-field validation |
| Less type safety               | Full type safety            |
| Hard to reuse                  | Easy to reuse               |

---

## Part 1: Zod

### What is Zod?

**Zod** is a TypeScript-first schema validation library with zero dependencies.

**Installation:**

```bash
npm install zod @hookform/resolvers
```

### Basic Example

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 1. Create a schema
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})

// 2. Infer type from schema
type FormData = z.infer<typeof schema>

// 3. Use with useForm
const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

---

### Basic Zod Types

#### Strings

```tsx
const schema = z.object({
  // Required string
  name: z.string(),

  // Email
  email: z.string().email('Invalid email'),

  // URL
  website: z.string().url('Invalid URL'),

  // UUID
  id: z.string().uuid('Invalid UUID'),

  // With length
  username: z.string().min(3).max(20),

  // With pattern
  phone: z.string().regex(/^\+7\d{10}$/, 'Invalid format'),

  // Optional
  bio: z.string().optional(),

  // With default value
  role: z.string().default('user'),
})
```

#### Numbers

```tsx
const schema = z.object({
  // Required number
  age: z.number(),

  // With range
  rating: z.number().min(1).max(10),

  // Positive
  price: z.number().positive('Price must be positive'),

  // Negative
  balance: z.number().negative(),

  // Integer
  count: z.number().int('Must be an integer'),

  // Optional
  discount: z.number().optional(),
})
```

#### Booleans

```tsx
const schema = z.object({
  agree: z.boolean().refine(v => v === true, 'Consent required'),
  newsletter: z.boolean().optional(),
})
```

#### Arrays

```tsx
const schema = z.object({
  // Array of strings
  tags: z.array(z.string()),

  // With minimum length
  skills: z.array(z.string()).min(1, 'Select at least one skill'),

  // Array of objects
  contacts: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    })
  ),
})
```

#### Enum

```tsx
const schema = z.object({
  // Zod enum
  role: z.enum(['admin', 'user', 'guest']),

  // TypeScript enum
  status: z.nativeEnum(Status),
})
```

#### Objects

```tsx
const schema = z.object({
  // Nested object
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
  }),

  // Optional object
  company: z
    .object({
      name: z.string(),
      position: z.string(),
    })
    .optional(),
})
```

---

### Custom Validation with `refine`

#### Single refine

```tsx
const schema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Which field to apply error to
  })
```

#### Multiple refine

```tsx
const schema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
  })
  .refine(data => data.newPassword !== data.currentPassword, {
    message: 'New password must be different',
    path: ['newPassword'],
  })
  .refine(data => data.newPassword.length >= 8, {
    message: 'Minimum 8 characters',
    path: ['newPassword'],
  })
```

#### Async refine

```tsx
const schema = z
  .object({
    username: z.string(),
  })
  .refine(
    async data => {
      const response = await fetch(`/api/check-username?username=${data.username}`)
      const { available } = await response.json()
      return available
    },
    {
      message: 'Username is taken',
      path: ['username'],
    }
  )
```

---

### Complete Registration Schema

```tsx
import { z } from 'zod'

const registrationSchema = z
  .object({
    // Personal information
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    age: z.number().min(18, 'Minimum 18 years').max(120, 'Maximum 120 years'),

    // Password
    password: z
      .string()
      .min(8, 'Minimum 8 characters')
      .regex(/[A-Z]/, 'Must have uppercase letter')
      .regex(/\d/, 'Must have a digit')
      .regex(/[!@#$%^&*]/, 'Must have special character'),

    confirmPassword: z.string(),

    // Address
    address: z.object({
      country: z.string().min(1, 'Required'),
      city: z.string().min(1, 'Required'),
      zip: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
    }),

    // Skills
    skills: z.array(z.string()).min(1, 'Select at least one'),

    // Role
    role: z.enum(['developer', 'designer', 'manager']),

    // Consent
    agree: z.boolean().refine(v => v === true, 'Consent required'),
  })

  // Cross-field validation
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegistrationForm = z.infer<typeof registrationSchema>
```

---

## Part 2: Yup

### What is Yup?

**Yup** is a time-tested schema validation library with a chainable API.

**Installation:**

```bash
npm install yup @hookform/resolvers
```

### Basic Example

```tsx
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// 1. Create a schema
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(8, 'Minimum 8 characters').required('Required'),
})

// 2. Infer type
type FormData = yup.InferType<typeof schema>

// 3. Use with useForm
const { register, handleSubmit } = useForm<FormData>({
  resolver: yupResolver(schema),
})
```

---

### Basic Yup Types

#### Strings

```tsx
const schema = yup.object({
  // Required string
  name: yup.string().required('Required'),

  // Email
  email: yup.string().email('Invalid email').required('Required'),

  // URL
  website: yup.string().url('Invalid URL'),

  // With length
  username: yup.string().min(3).max(20),

  // With pattern
  phone: yup.string().matches(/^\+7\d{10}$/, 'Invalid format'),

  // Optional
  bio: yup.string(),

  // With default value
  role: yup.string().default('user'),

  // One of values
  status: yup.string().oneOf(['active', 'inactive']),
})
```

#### Numbers

```tsx
const schema = yup.object({
  // Required number
  age: yup.number().required('Required'),

  // With range
  rating: yup.number().min(1).max(10),

  // Positive
  price: yup.number().positive('Price must be positive'),

  // Integer
  count: yup.number().integer('Must be an integer'),

  // Optional
  discount: yup.number(),
})
```

#### Booleans

```tsx
const schema = yup.object({
  agree: yup.boolean().oneOf([true], 'Consent required'),
  newsletter: yup.boolean(),
})
```

#### Arrays

```tsx
const schema = yup.object({
  // Array of strings
  tags: yup.array().of(yup.string()),

  // With minimum length
  skills: yup.array().of(yup.string()).min(1, 'Select at least one'),

  // Array of objects
  contacts: yup.array().of(
    yup.object({
      type: yup.string(),
      value: yup.string(),
    })
  ),
})
```

#### Objects

```tsx
const schema = yup.object({
  // Nested object
  address: yup.object({
    city: yup.string().required('Required'),
    street: yup.string().required('Required'),
    zip: yup.string().matches(/^\d{5}$/, 'Invalid zip code'),
  }),

  // Optional object
  company: yup.object({
    name: yup.string(),
    position: yup.string(),
  }),
})
```

---

### Custom Validation with `test`

```tsx
const schema = yup.object({
  password: yup.string(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),

  // Custom test
  username: yup.string().test('is-available', 'Username is taken', async value => {
    const response = await fetch(`/api/check-username?username=${value}`)
    const { available } = await response.json()
    return available
  }),
})
```

---

## Part 3: Zod vs Yup Comparison

| Criterion            | Zod                                   | Yup                                      |
|----------------------|---------------------------------------|------------------------------------------|
| **Size**             | ~12 KB                                | ~14 KB                                   |
| **TypeScript**       | First-class, excellent type inference | Good, but sometimes requires annotations |
| **API**              | Functional, composable                | Chainable, expressive                    |
| **Performance**      | Faster                                | Slower                                   |
| **Async Validation** | Via `refine`                          | Via `test`                               |
| **Community**        | Large, growing                        | Very large, mature                       |
| **Documentation**    | Excellent                             | Good                                     |

### When to Choose Zod?

- ✅ New TypeScript project
- ✅ Type safety is important
- ✅ Need better performance
- ✅ Prefer functional API

### When to Choose Yup?

- ✅ JavaScript project
- ✅ Already using Yup in the project
- ✅ Love chainable API
- ✅ Need many ready examples

---

## Part 4: Integration with React Hook Form

### Complete Example with Zod

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    console.log('Submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Forgot to Import Resolver

```tsx
// ❌ Wrong - forgot resolver
import { z } from 'zod'
const { register } = useForm({ resolver: zodResolver(schema) }) // zodResolver not imported

// ✅ Correct - import resolver
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const { register } = useForm({ resolver: zodResolver(schema) })
```

**Why this is a mistake:** Without `zodResolver` or `yupResolver`, the schema won't be integrated
with React Hook Form.

---

### ❌ Mistake 2: .refine() Without path

```tsx
// ❌ Wrong - error not bound to field
.refine((data) => data.password === data.confirm, {
  message: 'Passwords do not match'
})

// ✅ Correct - specify path
.refine((data) => data.password === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm']
})
```

**Why this is a mistake:** Without `path`, the error won't appear in `errors.confirmPassword`, but
in `errors.root`.

---

### ❌ Mistake 3: Incorrect Type Inference

```tsx
// ❌ Wrong - type not inferred from schema
type FormData = {
  email: string
  password: string
}
const schema = z.object({ email: z.string(), password: z.string() })

// ✅ Correct - use z.infer
const schema = z.object({
  email: z.string(),
  password: z.string(),
})
type FormData = z.infer<typeof schema>
```

**Why this is a mistake:** Manual type description can get out of sync with the schema. `z.infer`
guarantees accuracy.

---

### ❌ Mistake 4: .optional() Instead of .nullable()

```tsx
// ❌ Wrong - undefined is not the same as null
bio: z.string().optional() // can be undefined

// ✅ Correct - if you need null
bio: z.string().nullable() // can be null
```

**Why this is a mistake:** `optional()` makes the field `string | undefined`, while `nullable()`
makes it `string | null`. These are different types.

---

### ❌ Mistake 5: Minimum 1 Element in Array Without Message

```tsx
// ❌ Wrong - unclear error
skills: z.array(z.string()).min(1)

// ✅ Correct - with message
skills: z.array(z.string()).min(1, 'Select at least one skill')
```

**Why this is a mistake:** The user should understand what's wrong with the form.

---

## 📚 Additional Resources

- [Zod Documentation](https://zod.dev/)
- [Yup Documentation](https://github.com/jquense/yup)
- [@hookform/resolvers](https://react-hook-form.com/docs/useform/resolver)
- [Zod GitHub](https://github.com/colinhacks/zod)
