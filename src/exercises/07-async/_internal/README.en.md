# Level 7: Asynchronous — Async Validation, API, Debounce

## Introduction

Real forms often require server interaction: checking username availability, loading data for editing, submitting forms with error handling. In this level, you will learn all aspects of async form handling.

---

## Part 1: Async Validation

### Basic Async Validation

```tsx
import { useForm } from 'react-hook-form'

const validateUsername = async (value: string) => {
  // Simulate server request
  await new Promise(resolve => setTimeout(resolve, 500))

  // Check availability
  const takenUsernames = ['admin', 'user', 'test']
  if (takenUsernames.includes(value.toLowerCase())) {
    return 'Username is taken'
  }

  return true
}

function RegistrationForm() {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', {
          required: 'Required',
          validate: validateUsername,
        })}
      />
      <button type="submit">Register</button>
    </form>
  )
}
```

### Async Validation with onBlur

```tsx
function AsyncValidationForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)

  const validateUsername = async (value: string) => {
    if (!value || value.length < 3) return true

    setChecking(true)

    try {
      const response = await fetch(`/api/check-username?username=${value}`)
      const { available } = await response.json()

      setAvailable(available)

      if (!available) {
        setError('username', {
          type: 'manual',
          message: 'Username is taken',
        })
        return false
      }

      clearErrors('username')
      return true
    } catch (error) {
      return 'Validation error'
    } finally {
      setChecking(false)
    }
  }

  return (
    <form>
      <input
        {...register('username')}
        onBlur={(e) => validateUsername(e.target.value)}
      />

      {checking && <span>⏳ Checking...</span>}
      {available === true && <span>✅ Available</span>}
      {available === false && <span>❌ Taken</span>}

      {errors.username && (
        <span className="error">{errors.username.message}</span>
      )}
    </form>
  )
}
```

### Using Zod

```tsx
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3, 'Minimum 3 characters'),
})

// Async validation via refine
const schemaWithAsync = schema.refine(
  async (data) => {
    const response = await fetch(`/api/check-username?username=${data.username}`)
    const { available } = await response.json()
    return available
  },
  {
    message: 'Username is taken',
    path: ['username'],
  }
)

// Usage
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schemaWithAsync),
  mode: 'onChange',
})
```

---

## Part 2: Data Loading (Edit Mode)

### Basic Data Loading

```tsx
function EditForm() {
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user data
    fetch('/api/user/1')
      .then(res => res.json())
      .then(data => {
        reset(data)  // Fill form
        setLoading(false)
      })
  }, [reset])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input {...register('email')} />

      <button type="submit" disabled={!isDirty}>
        Save {isDirty && '*'}
      </button>
    </form>
  )
}
```

### With Error Handling

```tsx
function EditFormWithErrorHandling() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('/api/user/1')
        if (!response.ok) throw new Error('Failed to load data')

        const data = await response.json()
        reset(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [reset])

  if (loading) return <div>⏳ Loading...</div>
  if (error) return <div style={{ color: 'red' }}>❌ {error}</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  )
}
```

### With Zod Validation

```tsx
const userSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  bio: z.string().optional(),
})

type UserForm = z.infer<typeof userSchema>

function EditUserForm() {
  const [loading, setLoading] = useState(true)

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  })

  useEffect(() => {
    fetch('/api/user/1')
      .then(res => res.json())
      .then(data => {
        reset(data)
        setLoading(false)
      })
  }, [reset])

  if (loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input type="email" {...register('email')} />
      <textarea {...register('bio')} />

      <button type="submit" disabled={!isDirty}>
        Save Changes
      </button>
    </form>
  )
}
```

---

## Part 3: Submit with Loading/Error

### Basic Submit Handling

```tsx
function SubmitForm() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    setError(null)

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      reset()
      alert('Successfully submitted!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          ❌ {error}
        </div>
      )}

      <input {...register('name')} disabled={submitting} />
      <input {...register('email')} disabled={submitting} />

      <button type="submit" disabled={submitting}>
        {submitting ? '⏳ Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

### With Success Notification

```tsx
function SubmitWithNotification() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    setError(null)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) {
            reject(new Error('Network error'))
          } else {
            resolve(data)
          }
        }, 1500)
      })

      setSuccess(true)
      reset()

      // Hide notification after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && (
        <div style={{
          padding: '1rem',
          background: '#d1e7dd',
          color: '#0f5132',
          marginBottom: '1rem',
          borderRadius: '4px',
        }}>
          ✅ Submitted successfully!
        </div>
      )}

      {error && (
        <div style={{
          padding: '1rem',
          background: '#f8d7da',
          color: '#842029',
          marginBottom: '1rem',
          borderRadius: '4px',
        }}>
          ❌ {error}
        </div>
      )}

      <input {...register('name')} disabled={submitting} />
      <input {...register('email')} disabled={submitting} />

      <button type="submit" disabled={submitting}>
        {submitting ? '⏳ Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

---

## Part 4: Debounce for Auto-save

### Basic Debounce

```tsx
function AutoSaveForm() {
  const { watch } = useForm()
  const values = watch()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-save
      console.log('Auto-saved:', values)
      localStorage.setItem('draft', JSON.stringify(values))
      setSaved(true)

      // Hide indicator after 2 seconds
      setTimeout(() => setSaved(false), 2000)
    }, 1000)  // Debounce 1 second

    return () => clearTimeout(timer)
  }, [values])

  return (
    <form>
      <textarea {...register('content')} />

      {saved && (
        <div style={{ color: 'green' }}>✓ Saved</div>
      )}
    </form>
  )
}
```

### With Custom useDebounce Hook

```tsx
// Custom hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Usage
function SearchForm() {
  const { watch } = useForm()
  const searchQuery = watch('query')
  const debouncedQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    if (debouncedQuery) {
      // Search only after debounce
      console.log('Searching for:', debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <form>
      <input {...register('query')} placeholder="Search..." />
    </form>
  )
}
```

### Auto-save with Status Indicator

```tsx
function DraftForm() {
  const { watch } = useForm()
  const values = watch()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    const timer = setTimeout(async () => {
      setStatus('saving')

      try {
        await fetch('/api/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        setStatus('saved')

        setTimeout(() => setStatus('idle'), 2000)
      } catch (error) {
        setStatus('error')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [values])

  return (
    <form>
      <textarea {...register('content')} />

      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
        {status === 'saving' && '⏳ Saving...'}
        {status === 'saved' && '✓ Saved'}
        {status === 'error' && '❌ Save error'}
      </div>
    </form>
  )
}
```

---

## Complete Example: Registration Form with Async Validation

```tsx
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  username: z.string().min(3, 'Minimum 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})

type FormData = z.infer<typeof schema>

// Simulate API
const checkUsername = async (username: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 500))
  return !['admin', 'user', 'test'].includes(username.toLowerCase())
}

export function AsyncRegistrationForm() {
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const validateUsername = useCallback(async (value: string) => {
    if (!value || value.length < 3) return true

    setChecking(true)
    const isAvailable = await checkUsername(value)
    setAvailable(isAvailable)
    setChecking(false)

    if (!isAvailable) {
      setError('username', {
        type: 'manual',
        message: 'Username is taken',
      })
      return false
    }

    clearErrors('username')
    return true
  }, [setError, clearErrors])

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError(null)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) {
            reject(new Error('Network error'))
          } else {
            resolve(data)
          }
        }, 1500)
      })

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Submit error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && (
        <div style={{ padding: '1rem', background: '#d1e7dd', marginBottom: '1rem' }}>
          ✅ Registration successful!
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', background: '#f8d7da', marginBottom: '1rem' }}>
          ❌ {error}
        </div>
      )}

      <div>
        <label>Username</label>
        <input
          {...register('username')}
          onBlur={(e) => validateUsername(e.target.value)}
        />
        {checking && <span>⏳ Checking...</span>}
        {available === true && <span>✅ Available</span>}
        {available === false && <span>❌ Taken</span>}
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>

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

      <button type="submit" disabled={submitting}>
        {submitting ? '⏳ Registering...' : 'Register'}
      </button>
    </form>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: No Loading Handling

```tsx
// ❌ Wrong - button active during submit
<button type="submit">Submit</button>

// ✅ Correct - show state
const { formState: { isSubmitting } } = useForm()
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? '⏳ Submitting...' : 'Submit'}
</button>
```

**Why this is a mistake:** The user may submit the form multiple times if loading state is not visible.

---

### ❌ Mistake 2: Debounce Without Cleanup

```tsx
// ❌ Wrong - memory leak
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Search:', values)
  }, 500)
  // no cleanup
})

// ✅ Correct - cleanup timer
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Search:', values)
  }, 500)
  return () => clearTimeout(timer) // cleanup
}, [values])
```

**Why this is a mistake:** Without timer cleanup, memory leaks occur and request races may happen.

---

### ❌ Mistake 3: No API Error Handling

```tsx
// ❌ Wrong - error ignored
const onSubmit = async (data) => {
  await fetch('/api/submit', { body: JSON.stringify(data) })
}

// ✅ Correct - try/catch
const onSubmit = async (data) => {
  try {
    await fetch('/api/submit', { body: JSON.stringify(data) })
  } catch (err) {
    setError('root', { message: 'Network error' })
  }
}
```

**Why this is a mistake:** The network may fail, and the user should see a clear error message.

---

### ❌ Mistake 4: Async Validation Without Indicator

```tsx
// ❌ Wrong - user waits without feedback
validate: async (value) => {
  const response = await fetch(`/api/check?username=${value}`)
  return response.json()
}

// ✅ Correct - show status
const [checking, setChecking] = useState(false)
validate: async (value) => {
  setChecking(true)
  const response = await fetch(`/api/check?username=${value}`)
  setChecking(false)
  return response.json()
}
{checking && <span>⏳ Checking...</span>}
```

**Why this is a mistake:** The user doesn't understand what's happening during validation.

---

### ❌ Mistake 5: reset After Loading Without Error Handling

```tsx
// ❌ Wrong - load error ignored
useEffect(() => {
  fetch('/api/user/1').then(res => res.json()).then(reset)
}, [reset])

// ✅ Correct - error handling
useEffect(() => {
  fetch('/api/user/1')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load')
      return res.json()
    })
    .then(reset)
    .catch(err => setError(err.message))
}, [reset])
```

**Why this is a mistake:** If loading fails, the form will stay in loading state without data.

---

## 📝 Exercises

Go to the [`task.md`](./task.md) file for practical exercises.

---

## 📚 Additional Resources

- [Validation in RHF](https://react-hook-form.com/docs/useform/register#rules)
- [setError Documentation](https://react-hook-form.com/docs/useform/seterror)
