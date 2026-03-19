# Level 2: Validation — Built-in, Patterns, Custom

## Introduction

Validation is a critical part of any form. React Hook Form provides several ways to validate: from simple built-in rules to complex custom functions.

---

## 1. Built-in Validation Rules

### `required` — Required Field

```tsx
<input
  {...register('email', {
    required: 'Email is required',
  })}
/>

// With boolean value (no message)
<input
  {...register('email', {
    required: true,
  })}
/>
```

### `minLength` / `maxLength` — String Length

```tsx
<input
  {...register('username', {
    required: 'Required',
    minLength: {
      value: 3,
      message: 'Minimum 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Maximum 20 characters',
    },
  })}
/>
```

### `min` / `max` — Number Range

```tsx
<input
  type="number"
  {...register('age', {
    required: 'Age is required',
    valueAsNumber: true,
    min: {
      value: 18,
      message: 'Minimum 18 years',
    },
    max: {
      value: 100,
      message: 'Maximum 100 years',
    },
  })}
/>
```

### `pattern` — RegExp Pattern

```tsx
<input
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email format',
    },
  })}
/>
```

---

## 2. Useful RegExp Patterns

### Email

```tsx
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
```

### Russian Phone

```tsx
const phonePattern = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/
// Examples: +7 999 123-45-67, +7(999)123-45-67, +79991234567
```

### URL

```tsx
const urlPattern = /^https?:\/\/.+\..+$/
```

### HEX Color

```tsx
const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
// Examples: #FFF, #FFFFFF, #3498db
```

### Slug (URL-friendly string)

```tsx
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
// Examples: my-page, article-123, blog-post
```

### Password (complex)

```tsx
// Minimum 8 characters, uppercase, digit, special character
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
```

---

## 3. Custom Validation via `validate`

### Single Function

```tsx
<input
  {...register('password', {
    required: 'Password is required',
    validate: value => {
      if (value.length < 8) {
        return 'Minimum 8 characters'
      }
      if (!/[A-Z]/.test(value)) {
        return 'Must have uppercase letter'
      }
      if (!/\d/.test(value)) {
        return 'Must have a digit'
      }
      return true // Validation passed
    },
  })}
/>
```

### Object with Multiple Checks

```tsx
<input
  {...register('password', {
    required: 'Password is required',
    validate: {
      minLength: v => v.length >= 8 || 'Minimum 8 characters',
      uppercase: v => /[A-Z]/.test(v) || 'Must have uppercase letter',
      number: v => /\d/.test(v) || 'Must have a digit',
      special: v => /[!@#$%^&*]/.test(v) || 'Must have special character',
    },
  })}
/>
```

### Access to Other Form Fields

```tsx
function PasswordForm() {
  const { register, getValues } = useForm()

  return (
    <form>
      <input {...register('password')} />

      <input
        {...register('confirmPassword', {
          validate: value => {
            const password = getValues('password')
            return value === password || 'Passwords do not match'
          },
        })}
      />
    </form>
  )
}
```

---

## 4. Cross-field Validation

### Password Confirmation

```tsx
function RegistrationForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  return (
    <form>
      <input {...register('password', { required: 'Required' })} />

      <input
        {...register('confirmPassword', {
          required: 'Required',
          validate: {
            match: v => v === password || 'Passwords do not match',
          },
        })}
      />

      {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
    </form>
  )
}
```

### New Password Must Differ from Current

```tsx
function ChangePasswordForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  const currentPassword = watch('currentPassword')
  const newPassword = watch('newPassword')

  return (
    <form>
      <input {...register('currentPassword')} />

      <input
        {...register('newPassword', {
          validate: {
            different: v => v !== currentPassword || 'New password must be different',
          },
        })}
      />

      <input
        {...register('confirmPassword', {
          validate: {
            match: v => v === newPassword || 'Passwords do not match',
          },
        })}
      />
    </form>
  )
}
```

---

## 5. Validation Modes

### `mode` — When to Trigger Validation

```tsx
// Validation on submit (default)
useForm({ mode: 'onSubmit' })

// Validation on change
useForm({ mode: 'onChange' })

// Validation on blur
useForm({ mode: 'onBlur' })

// Validation on change and blur
useForm({ mode: 'all' })
```

### `reValidateMode` — When to Revalidate After First Submit

```tsx
useForm({
  mode: 'onChange',
  reValidateMode: 'onChange', // Default
})
```

### Recommendations for Mode Selection

| Mode       | When to Use                        |
| ---------- | ---------------------------------- |
| `onSubmit` | Simple forms, minimal noise        |
| `onChange` | Forms with instant feedback        |
| `onBlur`   | When you need to check after input |
| `all`      | Maximum strictness                 |

---

## 6. Displaying Errors

### Basic Display

```tsx
;<input {...register('email', { required: 'Required' })} />
{
  errors.email && <span className="error">{errors.email.message}</span>
}
```

### Styled Display

```tsx
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    {...register('email', { required: 'Required' })}
    style={{
      borderColor: errors.email ? '#dc3545' : '#ddd',
    }}
  />
  {errors.email && (
    <span
      style={{
        color: '#dc3545',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
        display: 'block',
      }}
    >
      {errors.email.message}
    </span>
  )}
</div>
```

### Multiple Errors for One Field

```tsx
;<input
  {...register('password', {
    validate: {
      minLength: v => v.length >= 8 || 'Minimum 8 characters',
      uppercase: v => /[A-Z]/.test(v) || 'Must have uppercase',
      number: v => /\d/.test(v) || 'Must have a digit',
    },
  })}
/>

{
  errors.password && (
    <div style={{ color: '#dc3545', fontSize: '0.875rem' }}>
      {Object.entries(errors.password).map(([key, value]) => (
        <div key={key}>{typeof value === 'string' ? value : value?.message}</div>
      ))}
    </div>
  )
}
```

---

## 7. Complete Example: Registration Form with Validation

```tsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Validation schema
const schema = z.object({
  username: z.string().min(3, 'Minimum 3 characters').max(20, 'Maximum 20 characters'),
  email: z.string().email('Invalid email format'),
  age: z.number().min(18, 'Minimum 18 years').max(120, 'Maximum 120 years'),
  password: z
    .string()
    .min(6, 'Minimum 6 characters')
    .regex(/[A-Z]/, 'Must have uppercase letter')
    .regex(/\d/, 'Must have a digit'),
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
    console.log('Registered:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input {...register('username')} />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label>Age</label>
        <input type="number" {...register('age', { valueAsNumber: true })} />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <span className="error">{errors.password.message}</span>}
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

### ❌ Mistake 1: required Without Message

```tsx
// ❌ Wrong - user won't understand what's wrong
<input {...register('email', { required: true })} />

// ✅ Correct - with clear message
<input {...register('email', { required: 'Email is required' })} />
```

**Why this is a mistake:** Boolean value `true` doesn't give the user information about what field needs to be filled.

---

### ❌ Mistake 2: Pattern Without Escaping

```tsx
// ❌ Wrong - special characters not escaped
pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/

// ✅ Correct - with flags for case insensitivity
pattern: {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Invalid email format'
}
```

**Why this is a mistake:** Without the `i` flag, the pattern will be case-sensitive. It's also important to wrap in an object with `message`.

---

### ❌ Mistake 3: validate Function Without Return

```tsx
// ❌ Wrong - no return true on success
validate: value => {
  if (value.length < 8) {
    return 'Minimum 8 characters'
  }
  // no return for success case
}

// ✅ Correct - explicitly return true
validate: value => {
  if (value.length < 8) {
    return 'Minimum 8 characters'
  }
  return true
}
```

**Why this is a mistake:** Validation function must return `true` on success or an error string on failure.

---

### ❌ Mistake 4: validate Without Access to Other Fields

```tsx
// ❌ Wrong - no access to password
validate: value => value === password // password is undefined

// ✅ Correct - use getValues
const { getValues } = useForm()
validate: value => {
  const password = getValues('password')
  return value === password || 'Passwords do not match'
}
```

**Why this is a mistake:** For cross-field validation, you need to use `getValues` or `watch`.

---

### ❌ Mistake 5: Ignoring valueAsNumber

```tsx
// ❌ Wrong - number comes as string
<input type="number" {...register('age')} />

// ✅ Correct - convert to number
<input type="number" {...register('age', { valueAsNumber: true })} />
```

**Why this is a mistake:** Without `valueAsNumber: true`, numeric fields return as strings, which can cause validation issues.

---

## 📝 Exercises

Go to the [`task.md`](./task.md) file for practical exercises.

---

## 📚 Additional Resources

- [Validation in React Hook Form](https://react-hook-form.com/docs/useform/register#rules)
- [RegExp Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Schema Validation (Level 3)](../03-schema-validation/README.md)
