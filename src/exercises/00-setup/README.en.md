# Level 0: Setup — Configuration and First Form

## Introduction to React Hook Form

Welcome to the **React Hook Form** course! This is a modern library for form management in React that uses hooks to provide a simple and efficient API.

### Why React Hook Form?

Let's compare with alternatives:

| Library             | Size   | Performance | API              |
| ------------------- | ------ | ----------- | ---------------- |
| **React Hook Form** | ~12 KB | ⭐⭐⭐⭐⭐  | Hooks            |
| Formik              | ~16 KB | ⭐⭐⭐      | Components/Hooks |
| Redux Form          | ~23 KB | ⭐⭐        | Redux            |

**React Hook Form Advantages:**

1. **🚀 Performance** — minimal rerenders thanks to uncontrolled components
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
// ❌ Controlled component (many rerenders)
const [value, setValue] = useState('')
<input value={value} onChange={(e) => setValue(e.target.value)} />

// ✅ Uncontrolled component (minimal rerenders)
const { register } = useForm()
<input {...register('fieldName')} />
```

In the controlled approach, each change triggers a rerender. In the uncontrolled approach, React Hook Form works directly with the DOM.

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
    register, // Registers fields in the form
    handleSubmit, // Handles form submission
    watch, // Subscribes to field values
    formState, // Form state (errors, validity, etc.)
    setValue, // Sets field value
    getValues, // Gets field values
    reset, // Resets the form
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

;<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  <input {...register('password')} />
  <button type="submit">Submit</button>
</form>
```

**Important:** `handleSubmit` automatically prevents default form submission and collects data.

**What does this mean?**

- **Prevents default submission** — internally calls `event.preventDefault()`, so the page doesn't reload
- **Collects data** — automatically extracts values from all registered fields and passes them to your `onSubmit` function
- **Triggers validation** — validates all rules before calling `onSubmit`; if there are errors, `onSubmit` won't be called

Without React Hook Form, you'd have to write this manually:

```tsx
// ❌ Manual (without React Hook Form)
const handleSubmit = (e: FormEvent) => {
  e.preventDefault() // Prevent reload
  const formData = new FormData(e.currentTarget) // Collect data
  const data = Object.fromEntries(formData) // Transform
  // Manual validation...
  onSubmit(data)
}

// ✅ With React Hook Form (all automatic)
<form onSubmit={handleSubmit(onSubmit)}>
```

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
<form onSubmit={handleSubmit(onSubmit)}>{/* fields */}</form>
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
          <input id="email" type="email" {...register('email')} placeholder="Enter email" />
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

**Why this is wrong:**

- With `onClick`, the form won't submit when pressing Enter in input fields
- Standard browser behavior doesn't work (keyboard navigation, accessibility)
- `handleSubmit` receives a click event instead of a form event
- Breaks HTML semantics — button without explicit `type` defaults to `type="submit"`, but it's better to be explicit

### ❌ Mistake 2: Not Using Destructuring

```tsx
// ❌ Wrong
const form = useForm()
form.register('email')

// ✅ Correct
const { register } = useForm()
register('email')
```

**Why this is wrong:**

- Code becomes verbose: `form.register`, `form.handleSubmit`, `form.formState`...
- Harder to read, especially when using many methods
- In JSX you have to write `{...form.register('email')}` instead of `{...register('email')}`
- Destructuring immediately is the accepted practice in React Hook Form

### ❌ Mistake 3: Forgot to Pass Type to `useForm`

```tsx
// ❌ Wrong (no typing)
const { register } = useForm()

// ✅ Correct
const { register } = useForm<FormData>()
```

**Why this is wrong:**

- TypeScript doesn't know what fields exist in the form — you can write `register('nonExistentField')`
- No autocomplete when typing field names
- In `onSubmit`, data will have type `any` instead of type-safe `FormData`
- Easy to miss field renames during refactoring

---

## 📝 Tasks

Go to [`task.md`](./task.md) to complete practical exercises.

---

## 📚 Additional Resources

- [Official React Hook Form Documentation](https://react-hook-form.com/)
- [useForm API](https://react-hook-form.com/docs/useform)
- [register API](https://react-hook-form.com/docs/useform/register)
- [Examples on React Hook Form](https://react-hook-form.com/get-started#Quickstart)

---

## What's Next?

In the next level you'll learn:

- Different field types (text, number, checkbox, select)
- `watch`, `setValue`, `getValues` methods
- Form state via `formState`
