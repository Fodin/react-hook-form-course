# Level 6: States and UX — Dirty, Touched, Reset, Focus, A11y

## Introduction

Good form UX is not just about validation. It's about understanding form state, managing focus,
accessibility, and optimizing performance. In this level, you will learn all aspects of creating
user-friendly forms.

---

## Part 1: Dirty / Touched States

### What are Dirty and Touched?

| State     | Description       | When it Changes        |
| --------- | ----------------- | ---------------------- |
| `dirty`   | Field was changed | When value changes     |
| `touched` | Field was touched | On blur                |
| `isDirty` | Form was changed  | When any field changes |

### Getting State

```tsx
function MyForm() {
  const {
    register,
    formState: {
      dirtyFields, // Which fields are dirty
      touchedFields, // Which fields are touched
      isDirty, // Form is dirty
      isSubmitted, // Form was submitted
    },
  } = useForm()

  return (
    <form>
      <input {...register('name')} />

      <div>Dirty: {dirtyFields.name ? '✅' : '❌'}</div>
      <div>Touched: {touchedFields.name ? '✅' : '❌'}</div>
      <div>Form is dirty: {isDirty ? 'Yes' : 'No'}</div>
    </form>
  )
}
```

### Practical Application

```tsx
// Show error only after field was touched
;<input {...register('email', { required: 'Required' })} />
{
  touchedFields.email && errors.email && <span className="error">{errors.email.message}</span>
}

// Or show only if field is dirty and invalid
{
  dirtyFields.email && errors.email && <span className="error">{errors.email.message}</span>
}
```

### Visual Indication

```tsx
<input
  {...register('name')}
  style={{
    borderColor: dirtyFields.name ? (errors.name ? '#dc3545' : '#28a745') : '#ddd',
  }}
/>
```

---

## Part 2: Reset and Default Values

### Setting Default Values

```tsx
// On initialization
const { register } = useForm({
  defaultValues: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  },
})

// Async loading
const { reset } = useForm()

useEffect(() => {
  fetch('/api/user/1')
    .then(res => res.json())
    .then(data => reset(data))
}, [reset])
```

### Reset Method

```tsx
const { reset } = useForm()

// Reset to default values
reset()

// Reset with new values
reset({
  firstName: 'Jane',
  lastName: 'Smith',
})

// With options
reset(values, {
  keepErrors: false, // Keep errors
  keepDirty: false, // Keep dirty state
  keepValues: false, // Keep values
  keepDefaultValues: false,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
})
```

### Tracking Changes

```tsx
const { watch, reset, formState: { isDirty } } = useForm()

const values = watch()

useEffect(() => {
  if (isDirty) {
    console.log('Form is dirty:', values)
  }
}, [values])

// Reset button active only if form is dirty
<button
  type="button"
  onClick={() => reset()}
  disabled={!isDirty}
>
  Reset
</button>
```

---

## Part 3: Focus Management

### Why Focus Management?

On validation error, the user should immediately understand where the problem is. Automatic focus on
the first error field improves UX.

### Manual Focus Setting

```tsx
import { useEffect } from 'react'

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      const element = document.getElementById(firstError)
      element?.focus()
    }
  }, [errors])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input id="email" {...register('email')} />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <input id="password" {...register('password')} />
      {errors.password && <span className="error">{errors.password.message}</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

### shouldFocusError (Built into RHF)

```tsx
// Enabled by default
const { register } = useForm({
  shouldFocusError: true,
})

// Disable
const { register } = useForm({
  shouldFocusError: false,
})
```

### Custom Hook for Focus

```tsx
function useFocusOnError(errors: any) {
  useEffect(() => {
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      const element = document.getElementById(firstError)
      element?.focus()
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [errors])
}

// Usage
function MyForm() {
  const {
    formState: { errors },
  } = useForm()
  useFocusOnError(errors)
  // ...
}
```

---

## Part 4: Accessibility (A11y)

### ARIA Attributes for Forms

```tsx
function AccessibleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Registration form" noValidate>
      {/* General error message */}
      {isSubmitted && Object.keys(errors).length > 0 && (
        <div role="alert" aria-live="assertive" style={{ color: '#dc3545' }}>
          Please fix the errors in the form
        </div>
      )}

      {/* Field with aria-invalid */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register('email', { required: 'Required' })}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />

      {/* Error message with role="alert" */}
      {errors.email && (
        <span id="email-error" className="error" role="alert" aria-live="polite">
          {errors.email.message}
        </span>
      )}

      <button type="submit">Submit</button>
    </form>
  )
}
```

### Main ARIA Attributes

| Attribute          | Description               | Example                          |
| ------------------ | ------------------------- | -------------------------------- |
| `aria-label`       | Text label                | `aria-label="Login form"`        |
| `aria-invalid`     | Field is invalid          | `aria-invalid={!!errors.email}`  |
| `aria-describedby` | Link to description       | `aria-describedby="email-error"` |
| `aria-live`        | Real-time updates         | `aria-live="polite"`             |
| `role="alert"`     | Important message         | `role="alert"`                   |
| `noValidate`       | Disable native validation | `<form noValidate>`              |

### Keyboard Navigation

```tsx
// Submit on Enter
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('name')} />
  <button type="submit">Submit</button>
</form>

// Focus on next field after Enter
<input
  {...register('name')}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.getElementById('email')?.focus()
    }
  }}
/>
```

---

## Part 5: Performance Optimization

### Problem with watch()

```tsx
// ❌ Bad: watch() causes re-render on any change
const values = watch()
console.log('Render', values)

// ✅ Good: useWatch for individual fields
const name = useWatch({ name: 'name' })
```

### useWatch Instead of watch

```tsx
import { useWatch } from 'react-hook-form'

function OptimizedForm() {
  const { control, register } = useForm()

  // Subscribe to single field only
  const name = useWatch({
    control,
    name: 'name',
    defaultValue: '',
  })

  return (
    <div>
      <input {...register('name')} />
      <div>You entered: {name}</div>
    </div>
  )
}
```

### Component Memoization

```tsx
import { memo } from 'react'
import { useWatch } from 'react-hook-form'

const PriceDisplay = memo(({ control }: { control: any }) => {
  const price = useWatch({ control, name: 'price' })
  console.log('PriceDisplay render')
  return <div>Price: {price}</div>
})

function MyForm() {
  const { control, register } = useForm()

  return (
    <form>
      <input {...register('price', { valueAsNumber: true })} />
      <PriceDisplay control={control} />
    </form>
  )
}
```

### shouldUnregister

```tsx
// Default is false (fields registered forever)
const { register } = useForm({ shouldUnregister: false })

// true — fields unregister on unmount
const { register } = useForm({ shouldUnregister: true })

// For conditional fields, true is better
{
  showEmail && <input {...register('email')} />
}
```

### Performance Comparison

```tsx
// ❌ Slow: watch all fields
const allValues = watch()

// ✅ Fast: useWatch for specific fields
const email = useWatch({ name: 'email' })
const password = useWatch({ name: 'password' })

// ✅ Very fast: memo + useWatch
const MemoizedField = memo(({ control, name }) => {
  const value = useWatch({ control, name })
  return <div>{value}</div>
})
```

---

## Complete Example: Form with Great UX

```tsx
import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(3, 'Minimum 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})

type FormData = z.infer<typeof schema>

export function UXForm() {
  const [submitCount, setSubmitCount] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting, isSubmitted, touchedFields, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldFocusError: true,
  })

  // Auto-focus on first error
  useEffect(() => {
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
    }
  }, [errors])

  // Password strength indicator
  const password = watch('password', '')
  const getPasswordStrength = () => {
    if (password.length === 0) return { label: '', color: '#888' }
    if (password.length < 8) return { label: 'Weak', color: '#dc3545' }
    if (password.length < 12) return { label: 'Medium', color: '#ffc107' }
    return { label: 'Strong', color: '#28a745' }
  }
  const strength = getPasswordStrength()

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000))
    console.log('Submitted:', data)
    setSubmitCount(c => c + 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Registration form" noValidate>
      {/* Status bar */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f0f0' }}>
        <span>Dirty: {isDirty ? '✅' : '❌'}</span>
        <span style={{ marginLeft: '1rem' }}>Submitted: {submitCount} times</span>
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          style={{
            borderColor:
              touchedFields.name && errors.name ? '#dc3545' : dirtyFields.name ? '#28a745' : '#ddd',
          }}
        />
        {touchedFields.name && errors.name && (
          <span id="name-error" className="error" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {touchedFields.email && errors.email && (
          <span id="email-error" className="error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password Field with Indicator */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={!!errors.password}
        />
        <div style={{ color: strength.color, fontSize: '0.875rem' }}>
          Password strength: {strength.label}
        </div>
        {touchedFields.password && errors.password && (
          <span className="error" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: '1rem' }}>
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          style={{ opacity: isSubmitting || !isDirty ? 0.6 : 1 }}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          disabled={!isDirty}
          style={{ marginLeft: '0.5rem' }}
        >
          Reset
        </button>
      </div>

      {/* Success message */}
      {isSubmitted && Object.keys(errors).length === 0 && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#d1e7dd',
            color: '#0f5132',
            borderRadius: '4px',
          }}
        >
          ✅ Form successfully submitted!
        </div>
      )}
    </form>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Destructuring Not from formState

```tsx
// ❌ Wrong - destructuring directly from useForm
const { errors, isDirty, isValid } = useForm()

// ✅ Correct - from formState
const {
  formState: { errors, isDirty, isValid },
} = useForm()
```

**Why this is a mistake:** `formState` is a Proxy object that tracks subscriptions. Direct
destructuring breaks this system.

---

### ❌ Mistake 2: reset Without defaultValues

```tsx
// ❌ Wrong - reset with empty values
reset()

// ✅ Correct - with defaultValues
const { reset } = useForm({
  defaultValues: { name: '', email: '' },
})
reset({ name: 'John', email: 'john@example.com' })
```

**Why this is a mistake:** Without `defaultValues`, the form may incorrectly determine `isDirty`
state.

---

### ❌ Mistake 3: No Focus Management

```tsx
// ❌ Wrong - errors not visible to user
const onSubmit = data => {
  /* ... */
}

// ✅ Correct - focus on first error
useEffect(() => {
  const firstError = Object.keys(errors)[0]
  if (firstError) {
    document.getElementById(firstError)?.focus()
  }
}, [errors])
```

**Why this is a mistake:** The user may not see errors if focus is not set on the problematic field.

---

### ❌ Mistake 4: watch() Causes Extra Re-renders

```tsx
// ❌ Wrong - watch all fields
const values = watch()
console.log('Render', values)

// ✅ Correct - useWatch for individual fields
const name = useWatch({ name: 'name' })
```

**Why this is a mistake:** `watch()` subscribes to all form changes, causing the entire component to
re-render.

---

### ❌ Mistake 5: Ignoring touchedFields

```tsx
// ❌ Wrong - show error immediately
{
  errors.email && <span className="error">{errors.email.message}</span>
}

// ✅ Correct - after touch
{
  touchedFields.email && errors.email && <span className="error">{errors.email.message}</span>
}
```

**Why this is a mistake:** The user sees the error before finishing input, which worsens UX.

---

## 📚 Additional Resources

- [formState Documentation](https://react-hook-form.com/docs/useform/formstate)
- [reset Documentation](https://react-hook-form.com/docs/useform/reset)
- [useWatch Documentation](https://react-hook-form.com/docs/usewatch)
- [ARIA for Forms](https://www.w3.org/WAI/tutorials/forms/)
