# Level 0: Setup — Configuration and First Form

## Introduction to React Hook Form

Welcome to the **React Hook Form** course! This is a modern library for form management in React that uses hooks to provide a simple and efficient API.

### Why React Hook Form?

Let's compare with alternatives:

| Library | Size | Performance | API |
|---------|------|-------------|-----|
| **React Hook Form** | ~12 KB | ⭐⭐⭐⭐⭐ | Hooks |
| Formik | ~16 KB | ⭐⭐⭐ | Components/Hooks |
| Redux Form | ~23 KB | ⭐⭐ | Redux |

**React Hook Form Advantages:**

1. **🚀 Performance** — minimal re-renders thanks to uncontrolled components
2. **🎣 Simple API** — just a few hooks to work with any forms
3. **📦 Small size** — only ~12 KB in production
4. **🔧 TypeScript** — excellent type support out of the box
5. **✅ Validation** — built-in + schema support (Zod, Yup, Joi)
6. **🌐 Community** — over 35,000 stars on GitHub

---

## Core Concepts

### 1. Uncontrolled vs Controlled Components

**React Hook Form uses uncontrolled components** — this is the key to performance!

```tsx
// ❌ Controlled component (many re-renders)
const [value, setValue] = useState('')
<input value={value} onChange={(e) => setValue(e.target.value)} />

// ✅ Uncontrolled component (minimal re-renders)
const { register } = useForm()
<input {...register('fieldName')} />
```

In the controlled approach, each change triggers a re-render. In the uncontrolled approach, React Hook Form works directly with the DOM.

### 2. The `useForm` Hook

This is the main hook you'll use in every form:

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}

function MyForm() {
  const {
    register,           // Registers fields in the form
    handleSubmit,       // Handles form submission
    watch,              // Subscribes to field values
    formState,          // Form state (errors, validity, etc.)
    setValue,           // Sets field value
    getValues,          // Gets field values
    reset,              // Resets the form
  } = useForm<FormData>()

  return <form>...</form>
}
```

### 3. Field Registration via `register`

```tsx
// Basic registration
<input {...register('email')} />

// With validation options
<input
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email format'
    }
  })}
/>
```

### 4. Form Submission Handling via `handleSubmit`

```tsx
const onSubmit = (data: FormData) => {
  console.log(data) // { email: 'test@example.com', password: '123' }
}

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  <input {...register('password')} />
  <button type="submit">Submit</button>
</form>
```

**Important:** `handleSubmit` automatically prevents default form submission and collects data.

---

## Step-by-Step Guide: First Form

### Step 1: Define Data Interface

Define what data your form will contain:

```typescript
interface LoginForm {
  email: string
  password: string
}
```

### Step 2: Initialize `useForm`

```tsx
const { register, handleSubmit } = useForm<LoginForm>()
```

### Step 3: Register Fields

```tsx
<input {...register('email')} />
<input {...register('password')} />
```

### Step 4: Create Submission Handler

```tsx
const onSubmit = (data: LoginForm) => {
  console.log('Form data:', data)
}
```

### Step 5: Connect `handleSubmit` to Form

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  {/* fields */}
</form>
```

---

## Complete Code Example

```tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginForm {
  email: string
  password: string
}

export function FirstForm() {
  const { register, handleSubmit } = useForm<LoginForm>()
  const [submittedData, setSubmittedData] = useState<LoginForm | null>(null)

  const onSubmit = (data: LoginForm) => {
    console.log('Form submitted:', data)
    setSubmittedData(data)
  }

  return (
    <div>
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Enter password"
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Forgot `type="submit"`

```tsx
// ❌ Wrong
<button onClick={handleSubmit(onSubmit)}>Submit</button>

// ✅ Correct
<button type="submit">Submit</button>
```

### ❌ Mistake 2: Not Using Destructuring

```tsx
// ❌ Wrong
const form = useForm()
form.register('email')

// ✅ Correct
const { register } = useForm()
register('email')
```

### ❌ Mistake 3: Forgot to Pass Type to `useForm`

```tsx
// ❌ Wrong (no typing)
const { register } = useForm()

// ✅ Correct
const { register } = useForm<FormData>()
```

---

## 📝 Tasks

Go to [`task.md`](./task.md) to complete practical exercises.

---

## 📚 Additional Resources

- [Official React Hook Form Documentation](https://react-hook-form.com/)
- [useForm API](https://react-hook-form.com/docs/useform)
- [register API](https://react-hook-form.com/docs/useform/register)
- [CodeSandbox Examples](https://codesandbox.io/s/react-hook-form-get-started-f659w)

---

## What's Next?

In the next level you'll learn:
- Different field types (text, number, checkbox, select)
- `watch`, `setValue`, `getValues` methods
- Form state via `formState`
