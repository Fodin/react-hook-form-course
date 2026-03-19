# Level 8: Advanced Techniques — Controller, Custom Hooks, Context, Persistence

## Introduction

In this level, you will learn advanced React Hook Form techniques: integration with UI libraries,
creating custom hooks, splitting forms via Context, and saving data to localStorage.

---

## Part 1: Integration with UI Libraries

### Controller for Third-party Components

**Controller** is a bridge between React Hook Form's uncontrolled components and UI library
controlled components.

```tsx
import { Controller, useForm } from 'react-hook-form'
import { TextField, Select, MenuItem } from '@mui/material'

function MyForm() {
  const { control } = useForm()

  return (
    <form>
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField {...field} label="First Name" error={!!error} helperText={error?.message}/>
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select {...field}>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
          </Select>
        )}
      />
    </form>
  )
}
```

### Custom TextField Component

```tsx
// Create reusable component
function FormTextField({ label, error, ...props }: any) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        style={{
          borderColor: error ? '#dc3545' : '#ddd',
          width: '100%',
          padding: '0.5rem',
          borderRadius: '4px',
        }}
        {...props}
      />
      {error && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{error}</span>}
    </div>
  )
}

// Usage with Controller
;<Controller
  name="email"
  control={control}
  render={({ field, fieldState: { error } }) => (
    <FormTextField {...field} label="Email" error={error?.message}/>
  )}
/>
```

### Button Component with Loading

```tsx
function FormButton({ children, loading, ...props }: any) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        opacity: loading || props.disabled ? 0.7 : 1,
        cursor: loading || props.disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        paddingRight: loading ? '2rem' : undefined,
      }}
    >
      {children}
      {loading && (
        <span style={{
          position: 'absolute',
          right: '0.75rem',
        }}>
          ⏳
        </span>
      )}
    </button>
  )
}

// Usage
const { formState: { isSubmitting } } = useForm()

< FormButton
type = "submit"
loading = { isSubmitting } >
  Submit
  < /FormButton>
```

---

## Part 2: Custom Hooks

### useFormPersist — localStorage Persistence

```tsx
import { useState, useEffect } from 'react'

function useFormPersist<T extends Record<string, any>>(name: string, defaultValues?: T) {
  // Load from localStorage
  const [stored, setStored] = useState<T>(() => {
    const saved = localStorage.getItem(`form-${name}`)
    return saved ? JSON.parse(saved) : defaultValues
  })

  // Save to localStorage
  const save = (values: T) => {
    localStorage.setItem(`form-${name}`, JSON.stringify(values))
    setStored(values)
  }

  // Clear
  const clear = () => {
    localStorage.removeItem(`form-${name}`)
    setStored(defaultValues || ({} as T))
  }

  return { stored, save, clear }
}

// Usage
function ArticleForm() {
  const { stored, save, clear } = useFormPersist('article', {
    title: '',
    content: '',
  })

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: stored,
  })

  const values = watch()

  // Auto-save on change
  useEffect(() => {
    save(values)
  }, [values])

  const onSubmit = (data: any) => {
    console.log('Submitted:', data)
    clear() // Clear after submit
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Title"/>
      <textarea {...register('content')} placeholder="Content"/>

      <button type="submit">Publish</button>
      <button type="button" onClick={clear}>
        Clear Draft
      </button>
    </form>
  )
}
```

### useDebounce — Debounce for Values

```tsx
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
  const query = watch('search')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      console.log('Searching for:', debouncedQuery)
      // API call
    }
  }, [debouncedQuery])

  return <input {...register('search')} placeholder="Search..."/>
}
```

### useFieldValidation — Custom Validation

```tsx
function useFieldValidation<T>(value: T, validations: Array<(v: T) => string | true>) {
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    for (const validate of validations) {
      const result = validate(value)
      if (result !== true) {
        setError(result)
        setIsValid(false)
        return
      }
    }
    setError(null)
    setIsValid(true)
  }, [value, validations])

  return { error, isValid }
}

// Usage
function PasswordField() {
  const { watch } = useForm()
  const password = watch('password')

  const { error, isValid } = useFieldValidation(password, [
    v => v.length >= 8 || 'Minimum 8 characters',
    v => /[A-Z]/.test(v) || 'Must have uppercase letter',
    v => /\d/.test(v) || 'Must have a digit',
  ])

  return (
    <div>
      <input {...register('password')} type="password"/>
      {!isValid && error && <span className="error">{error}</span>}
    </div>
  )
}
```

---

## Part 3: FormContext (FormProvider)

### Splitting Form into Subcomponents

```tsx
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

// Subcomponent with useFormContext
function PersonalStep() {
  const { register } = useFormContext()

  return (
    <>
      <input {...register('firstName')} placeholder="First Name"/>
      <input {...register('lastName')} placeholder="Last Name"/>
    </>
  )
}

function ContactStep() {
  const { register } = useFormContext()

  return (
    <>
      <input type="email" {...register('email')} placeholder="Email"/>
      <input type="tel" {...register('phone')} placeholder="Phone"/>
    </>
  )
}

// Parent component with FormProvider
function App() {
  const methods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit = (data: any) => {
    console.log('Submitted:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PersonalStep/>
        <ContactStep/>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}
```

### Wizard with FormProvider

```tsx
function WizardForm() {
  const [step, setStep] = useState(1)

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  })

  const { handleSubmit, trigger } = methods

  const onNext = async () => {
    const fields = step === 1 ? ['email', 'password'] : ['firstName', 'lastName']

    const isValid = await trigger(fields)
    if (isValid) setStep(step + 1)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <AccountStep/>}
        {step === 2 && <ProfileStep/>}

        <div>
          {step > 1 && (
            <button type="button" onClick={() => setStep(s => s - 1)}>
              ←
            </button>
          )}
          {step < 2 ? (
            <button type="button" onClick={onNext}>
              →
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
```

---

## Part 4: localStorage Persistence

### Basic Saving

```tsx
function PersistentForm() {
  const { register, reset, watch } = useForm({
    defaultValues: () => {
      const saved = localStorage.getItem('my-form')
      return saved ? JSON.parse(saved) : { name: '', email: '' }
    },
  })

  const values = watch()

  useEffect(() => {
    localStorage.setItem('my-form', JSON.stringify(values))
  }, [values])

  return (
    <form>
      <input {...register('name')} />
      <input type="email" {...register('email')} />
    </form>
  )
}
```

### With Change Subscription

```tsx
function FormWithSubscription() {
  const { register, reset, watch } = useForm({
    defaultValues: { subject: '', body: '' },
  })

  // Load on mount
  useEffect(() => {
    const saved = localStorage.getItem('email-draft')
    if (saved) {
      reset(JSON.parse(saved))
    }
  }, [reset])

  // Save on change
  useEffect(() => {
    const subscription = watch(value => {
      localStorage.setItem('email-draft', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (data: any) => {
    localStorage.removeItem('email-draft') // Clear after submit
    console.log('Sent:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('subject')} placeholder="Subject"/>
      <textarea {...register('body')} placeholder="Email body"/>
      <button type="submit">Send</button>
    </form>
  )
}
```

---

## Part 5: Final Project — Registration Form

### Complete Form with Validation and All Techniques

```tsx
import { useState, useEffect } from 'react'
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Validation schema
const schema = z
  .object({
    // Step 1: Account
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Minimum 8 characters'),
    confirm: z.string(),

    // Step 2: Profile
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    avatar: z.instanceof(FileList).optional(),

    // Step 3: Settings
    newsletter: z.boolean().optional(),
    notifications: z.boolean().optional(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  })

type FormData = z.infer<typeof schema>

// Step 1 component
function AccountStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <>
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
        <label>Confirm</label>
        <input type="password" {...register('confirm')} />
        {errors.confirm && <span className="error">{errors.confirm.message}</span>}
      </div>
    </>
  )
}

// Step 2 component
function ProfileStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()
  const [preview, setPreview] = useState<string | null>(null)
  const avatar = useWatch({ name: 'avatar' })

  useEffect(() => {
    if (avatar?.[0]) {
      const url = URL.createObjectURL(avatar[0])
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [avatar])

  return (
    <>
      <div>
        <label>First Name</label>
        <input {...register('firstName')} />
        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register('lastName')} />
        {errors.lastName && <span className="error">{errors.lastName.message}</span>}
      </div>

      <div>
        <label>Avatar</label>
        <input
          type="file"
          accept="image/*"
          {...register('avatar')}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) setPreview(URL.createObjectURL(file))
          }}
        />
        {preview && <img src={preview} alt="Preview" style={{ maxWidth: '150px' }}/>}
      </div>
    </>
  )
}

// Step 3 component
function SettingsStep() {
  const { register, watch, setValue } = useFormContext<FormData>()

  return (
    <>
      <label>
        <input type="checkbox" {...register('newsletter')} />
        Subscribe to newsletter
      </label>

      <label>
        <input
          type="checkbox"
          checked={watch('notifications')}
          onChange={e => setValue('notifications', e.target.checked)}
        />
        Notifications
      </label>
    </>
  )
}

// Main form
export function RegistrationWizard() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState<FormData | null>(null)

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      newsletter: false,
      notifications: false,
    },
  })

  const { handleSubmit, trigger } = methods

  const onNext = async () => {
    const fields =
      step === 1 ? ['email', 'password', 'confirm'] : step === 2 ? ['firstName', 'lastName'] : []

    const valid = await trigger(fields)
    if (valid) setStep(step + 1)
  }

  const onSubmit = (data: FormData) => {
    setSubmitted(data)
    console.log('Registered:', data)
  }

  if (submitted) {
    return (
      <div>
        <h2>🎉 Registration Complete!</h2>
        <pre>{JSON.stringify(submitted, null, 2)}</pre>
        <button
          onClick={() => {
            setSubmitted(null)
            setStep(1)
          }}
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Step {step} of 3</div>

        {step === 1 && <AccountStep/>}
        {step === 2 && <ProfileStep/>}
        {step === 3 && <SettingsStep/>}

        <div>
          {step > 1 && (
            <button type="button" onClick={() => setStep(s => s - 1)}>
              ←
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={onNext}>
              →
            </button>
          ) : (
            <button type="submit">Complete</button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Controller Without field.onChange

```tsx
// ❌ Wrong - value doesn't update
<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select {...field} />
  )}
/>

// ✅ Correct - explicitly specify onChange
<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      onChange={(selected) => field.onChange(selected?.value)}
    />
  )}
/>
```

**Why this is a mistake:** Third-party components may return objects instead of primitive values.

---

### ❌ Mistake 2: FormProvider Without Context

```tsx
// ❌ Wrong - useFormContext doesn't work
function Child() {
  const { register } = useFormContext() // error!
}

function Parent() {
  const { register } = useForm()
  return <Child/>
}

// ✅ Correct - wrap in FormProvider
function Parent() {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <Child/>
    </FormProvider>
  )
}
```

**Why this is a mistake:** `useFormContext` only works inside `FormProvider`.

---

### ❌ Mistake 3: localStorage Without JSON.parse

```tsx
// ❌ Wrong - string instead of object
const saved = localStorage.getItem('form')
defaultValues: saved

// ✅ Correct - parse JSON
const saved = localStorage.getItem('form')
defaultValues: saved ? JSON.parse(saved) : { name: '' }
```

**Why this is a mistake:** `localStorage` only stores strings, objects need to be serialized.

---

### ❌ Mistake 4: Auto-save Without Debounce

```tsx
// ❌ Wrong - save on every change
useEffect(() => {
  localStorage.setItem('draft', JSON.stringify(values))
}, [values])

// ✅ Correct - with debounce
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(values))
  }, 1000)
  return () => clearTimeout(timer)
}, [values])
```

**Why this is a mistake:** Frequent localStorage writes can cause performance issues.

---

### ❌ Mistake 5: Custom Hook Without Dependencies

```tsx
// ❌ Wrong - no dependencies
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    // no cleanup and dependencies
  })
  return debounced
}

// ✅ Correct - with dependencies
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
```

**Why this is a mistake:** Without dependencies, the effect may execute incorrectly or cause leaks.

---

## 📚 Additional Resources

- [Controller Documentation](https://react-hook-form.com/docs/useform/controller)
- [FormProvider Documentation](https://react-hook-form.com/docs/formprovider)
- [useFormContext Documentation](https://react-hook-form.com/docs/useformcontext)
