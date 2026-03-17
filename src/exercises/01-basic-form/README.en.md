# Level 1: Basics — useForm, register, handleSubmit, formState

## Introduction

In this level, you will deeply learn the main tools of React Hook Form. After completion, you will be able to create full-featured forms with various field types and manage their state.

---

## 1. `useForm` Hook — Complete Guide

### What does `useForm` return?

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  firstName: string
  lastName: string
  email: string
  age: number
  bio: string
  website: string
}

function MyForm() {
  const {
    register,           // For field registration
    handleSubmit,       // For submit handling
    watch,              // For tracking values
    formState,          // Form state object
    setValue,           // For setting field value
    getValues,          // For getting values
    reset,              // For form reset
    trigger,            // For manual validation
    setError,           // For setting error
    clearErrors,        // For clearing errors
  } = useForm<FormData>()

  return <form>...</form>
}
```

### `useForm` Parameters

```tsx
useForm<FormData>({
  mode: 'onChange',        // When to trigger validation
  reValidateMode: 'onChange', // When to revalidate
  defaultValues: {         // Default values
    firstName: '',
    lastName: '',
  },
  shouldFocusError: true,  // Focus on first error field
  criteriaMode: 'firstError', // Show first or all errors
})
```

**Validation modes:**

| mode | Description |
|------|----------|
| `'onSubmit'` | Validation only on submit (default) |
| `'onChange'` | Validation on every change |
| `'onBlur'` | Validation on blur |
| `'all'` | Validation on change and blur |

---

## 2. Field Registration via `register`

### Basic Registration

```tsx
<input {...register('fieldName')} />
```

### Registration with Options

```tsx
<input
  {...register('age', {
    required: 'Age is required',
    min: { value: 18, message: 'Minimum 18 years' },
    max: { value: 100, message: 'Maximum 100 years' },
    valueAsNumber: true,  // Convert to number
  })}
/>
```

### Event Handlers

```tsx
<input
  {...register('email', {
    onChange: (e) => {
      console.log('Change:', e.target.value)
    },
    onBlur: (e) => {
      console.log('Blur:', e.target.value)
    },
    setValueAs: (value) => value.trim(),  // Processing before setting
  })}
/>
```

---

## 3. Various Field Types

### Text Fields

```tsx
// Plain text
<input {...register('firstName')} />

// Email
<input type="email" {...register('email')} />

// Password
<input type="password" {...register('password')} />

// URL
<input type="url" {...register('website')} />

// Phone
<input type="tel" {...register('phone')} />
```

### Numeric Fields

```tsx
// Number with valueAsNumber
<input
  type="number"
  {...register('age', { valueAsNumber: true })}
/>

// Range
<input
  type="range"
  min="0"
  max="100"
  {...register('rating', { valueAsNumber: true })}
/>
```

### Textarea

```tsx
<textarea
  {...register('bio')}
  rows={4}
  cols={50}
/>
```

### Select

```tsx
<select {...register('country')}>
  <option value="">Select a country</option>
  <option value="ru">Russia</option>
  <option value="us">USA</option>
  <option value="de">Germany</option>
</select>
```

### Radio

```tsx
<div>
  <label>
    <input type="radio" value="male" {...register('gender')} />
    Male
  </label>
  <label>
    <input type="radio" value="female" {...register('gender')} />
    Female
  </label>
</div>
```

### Checkbox

```tsx
// Single (boolean)
<input type="checkbox" {...register('agree')} />

// Multiple selection (array)
const { watch, setValue } = useForm()
const skills = watch('skills') || []

<input
  type="checkbox"
  value="react"
  checked={skills.includes('react')}
  onChange={(e) => {
    if (e.target.checked) {
      setValue('skills', [...skills, 'react'])
    } else {
      setValue('skills', skills.filter(s => s !== 'react'))
    }
  }}
/>
```

---

## 4. `formState` — Form State

### Getting State

```tsx
const { formState: {
  errors,           // Validation errors object
  isDirty,          // Form is dirty
  dirtyFields,      // Which fields are dirty
  touchedFields,    // Which fields are touched
  isSubmitting,     // Submit in progress
  isValid,          // Form is valid
  isValidating,     // Validation in progress
  submitCount,      // Submit count
} } = useForm()
```

### Usage Example

```tsx
function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormData>({ mode: 'onChange' })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Required' })} />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

---

## 5. `watch` — Tracking Values

### Tracking Single Field

```tsx
const firstName = watch('firstName')
```

### Tracking Multiple Fields

```tsx
const [firstName, lastName] = watch(['firstName', 'lastName'])
```

### Tracking All Fields

```tsx
const allValues = watch()
console.log(allValues) // { firstName: 'John', lastName: 'Doe' }
```

### Default Value

```tsx
const value = watch('fieldName', 'default value')
```

### Example: Password Strength in Real Time

```tsx
function PasswordForm() {
  const { register, watch } = useForm()
  const password = watch('password', '')

  const getStrength = () => {
    if (password.length === 0) return { label: '—', color: '#888' }
    if (password.length < 6) return { label: 'Weak', color: '#f44336' }
    if (password.length < 10) return { label: 'Medium', color: '#ff9800' }
    return { label: 'Strong', color: '#4caf50' }
  }

  const strength = getStrength()

  return (
    <div>
      <input type="password" {...register('password')} />
      <div style={{ color: strength.color }}>
        Password strength: {strength.label}
      </div>
    </div>
  )
}
```

---

## 6. `setValue` and `getValues`

### `setValue` — Setting Value

```tsx
const { setValue } = useForm()

// Set value
setValue('firstName', 'John')

// With options
setValue('firstName', 'John', {
  shouldValidate: true,  // Trigger validation
  shouldDirty: true,     // Mark as dirty
  shouldTouch: true,     // Mark as touched
})
```

### `getValues` — Getting Values

```tsx
const { getValues } = useForm()

// Get all values
const allValues = getValues()

// Get specific field
const email = getValues('email')

// Get multiple fields
const [email, password] = getValues(['email', 'password'])
```

### Example: Form Control Buttons

```tsx
function ProductForm() {
  const { register, setValue, getValues, reset } = useForm()

  const fillTestData = () => {
    setValue('title', 'Test Product')
    setValue('description', 'Description')
    setValue('price', 999)
  }

  const doublePrice = () => {
    const currentPrice = getValues('price')
    setValue('price', currentPrice * 2)
  }

  return (
    <form>
      <input {...register('title')} />
      <input {...register('price', { valueAsNumber: true })} />

      <button type="button" onClick={fillTestData}>
        Fill with Test Data
      </button>
      <button type="button" onClick={doublePrice}>
        Double Price
      </button>
      <button type="button" onClick={() => reset()}>
        Clear
      </button>
    </form>
  )
}
```

---

## 7. `reset` — Form Reset

```tsx
const { reset } = useForm()

// Reset to initial values
reset()

// Reset with new values
reset({
  firstName: 'John',
  lastName: 'Doe',
})

// With options
reset(values, {
  keepErrors: false,
  keepDirty: false,
  keepValues: false,
})
```

---

## Complete Example: Registration Form

```tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  age: number
  bio: string
  website: string
}

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
    setValue,
    reset,
  } = useForm<RegistrationForm>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 18,
      bio: '',
      website: '',
    },
  })

  const [submittedData, setSubmittedData] = useState<RegistrationForm | null>(null)

  const onSubmit = (data: RegistrationForm) => {
    console.log('Registered:', data)
    setSubmittedData(data)
  }

  const fillTestData = () => {
    setValue('firstName', 'John')
    setValue('lastName', 'Doe')
    setValue('email', 'john@example.com')
    setValue('age', 25)
  }

  return (
    <div>
      <h2>Registration Form</h2>

      {/* State indicators */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f0f0' }}>
        <span>Dirty: {isDirty ? '✅' : '❌'}</span>
        <span style={{ marginLeft: '1rem' }}>Valid: {isValid ? '✅' : '❌'}</span>
        <span style={{ marginLeft: '1rem' }}>
          Submitting: {isSubmitting ? '⏳' : '✓'}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name *</label>
          <input {...register('firstName', { required: 'Required' })} />
          {errors.firstName && <span className="error">{errors.firstName.message}</span>}
        </div>

        <div>
          <label>Last Name *</label>
          <input {...register('lastName', { required: 'Required' })} />
          {errors.lastName && <span className="error">{errors.lastName.message}</span>}
        </div>

        <div>
          <label>Email *</label>
          <input type="email" {...register('email', { required: 'Required' })} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div>
          <label>Age *</label>
          <input
            type="number"
            {...register('age', {
              required: 'Required',
              valueAsNumber: true,
              min: { value: 18, message: 'Minimum 18' },
            })}
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        <div>
          <label>About</label>
          <textarea {...register('bio')} rows={4} />
        </div>

        <div>
          <label>Website</label>
          <input type="url" {...register('website')} placeholder="https://..." />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
          <button type="button" onClick={fillTestData} style={{ marginLeft: '0.5rem' }}>
            Fill
          </button>
          <button type="button" onClick={reset} style={{ marginLeft: '0.5rem' }}>
            Reset
          </button>
        </div>
      </form>

      {submittedData && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f5e9' }}>
          <h3>Data Submitted:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Incorrect valueAsNumber Usage

```tsx
// ❌ Wrong - age will be a string
<input type="number" {...register('age')} />

// ✅ Correct - convert to number
<input type="number" {...register('age', { valueAsNumber: true })} />
```

**Why this is a mistake:** Without `valueAsNumber: true`, numeric fields return strings, which can cause issues with validation and data submission.

---

### ❌ Mistake 2: Watch Without Default Value

```tsx
// ❌ Wrong - undefined before first render
const value = watch('field')
<p>{value.length}</p> // Error!

// ✅ Correct - with default value
const value = watch('field', '')
<p>{value.length}</p> // Works!
```

**Why this is a mistake:** `watch` returns `undefined` until the field is registered. You need to specify a default value.

---

### ❌ Mistake 3: setValue Without Field Initialization

```tsx
// ❌ Wrong - field is not registered
setValue('email', 'test@example.com')

// ✅ Correct - first register, then setValue
<input {...register('email')} />
setValue('email', 'test@example.com')
```

**Why this is a mistake:** `setValue` only works with registered fields. The field must be registered via `register`.

---

### ❌ Mistake 4: getValues Causes Extra Re-render

```tsx
// ❌ Wrong - getValues in component body
const values = getValues()
<p>{values.email}</p>

// ✅ Correct - getValues only in handlers
const onSubmit = () => {
  const values = getValues()
  console.log(values)
}
```

**Why this is a mistake:** `getValues()` in the component body causes a re-render. Use `watch` for reactive reading or `getValues` only in handlers.

---

### ❌ Mistake 5: formState Not Destructured Correctly

```tsx
// ❌ Wrong - formState doesn't track changes
const { formState } = useForm()
<p>{formState.errors.email}</p>

// ✅ Correct - destructure from formState
const { formState: { errors, isDirty, isValid } } = useForm()
<p>{errors.email?.message}</p>
```

**Why this is a mistake:** `formState` is a Proxy object. You need to destructure specific properties for proper change subscription.

---

## 📝 Exercises

Go to the [`task.md`](./task.md) file for practical exercises.

---

## 📚 Additional Resources

- [useForm Documentation](https://react-hook-form.com/docs/useform)
- [register Documentation](https://react-hook-form.com/docs/useform/register)
- [watch Documentation](https://react-hook-form.com/docs/useform/watch)
- [formState Documentation](https://react-hook-form.com/docs/useform/formstate)
- [setValue Documentation](https://react-hook-form.com/docs/useform/setvalue)
