# Level 5: Dynamic Forms — useFieldArray, Wizard, Conditional

## Introduction

Dynamic forms are forms that change based on user actions. You will learn to add/remove fields,
create multi-step forms, and display conditional fields.

---

## Part 1: useFieldArray

### What is useFieldArray?

**useFieldArray** is a hook for working with dynamic field arrays. It allows you to add, remove, and
move fields in a form.

### Basic Usage

```tsx
import { useForm, useFieldArray } from 'react-hook-form'

function DynamicForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      emails: [{ value: '' }], // Initial value
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emails',
  })

  const onSubmit = (data: any) => {
    console.log('Emails:', data.emails)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`emails.${index}.value`)} placeholder="Email"/>
          <button type="button" onClick={() => remove(index)}>
            ✕
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ value: '' })}>
        + Add
      </button>

      <button type="submit">Submit</button>
    </form>
  )
}
```

### useFieldArray Methods

```tsx
const {
  fields, // Array of fields { id, ...value }
  append, // Add to end
  prepend, // Add to beginning
  insert, // Insert at index
  remove, // Remove at index
  swap, // Swap positions
  move, // Move
  replace, // Replace entire array
  update, // Update specific field
} = useFieldArray({ control, name: 'items' })
```

### Examples of Method Usage

```tsx
// Add one element
append({ value: '' })

// Add multiple
append([{ value: 'a' }, { value: 'b' }])

// Insert at index
insert(1, { value: 'new' })

// Remove element
remove(2)

// Remove multiple
remove([1, 3, 5])

// Swap positions
swap(0, 1)

// Move
move(3, 1)

// Replace entire array
replace([{ value: 'new1' }, { value: 'new2' }])

// Update specific field
update(0, { value: 'updated' })
```

---

### Dynamic Fields Validation

```tsx
import { z } from 'zod'

const schema = z.object({
  emails: z
    .array(
      z.object({
        value: z.string().email('Invalid email'),
      })
    )
    .min(1, 'At least one email'),
})

// Usage
const {
  control,
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
  defaultValues: { emails: [{ value: '' }] },
})

const { fields, append, remove } = useFieldArray({ control, name: 'emails' })

// Display errors
{
  fields.map((field, index) => (
    <div key={field.id}>
      <input {...register(`emails.${index}.value` as const)} />
      {errors.emails?.[index]?.value && (
        <span className="error">{errors.emails[index]?.value?.message}</span>
      )}
      <button type="button" onClick={() => remove(index)}>
        ✕
      </button>
    </div>
  ))
}
```

---

## Part 2: Conditional Fields

### Basic Conditional Display

```tsx
function ConditionalForm() {
  const { register, handleSubmit, watch } = useForm()

  const contactMethod = watch('contactMethod')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('contactMethod')}>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="telegram">Telegram</option>
      </select>

      {contactMethod === 'email' && <input {...register('email')} placeholder="Email"/>}

      {contactMethod === 'phone' && <input {...register('phone')} placeholder="Phone"/>}

      {contactMethod === 'telegram' && <input {...register('telegram')} placeholder="@username"/>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

### Conditional Fields Validation

**Problem:** Hidden fields are still validated.

**Solution 1:** Use `shouldUnregister: true`

```tsx
const { register } = useForm({ shouldUnregister: true })

< input
{...
  register('email', { required: true })
}
/>
```

**Solution 2:** Custom validation

```tsx
const schema = z
  .object({
    contactMethod: z.enum(['email', 'phone', 'telegram']),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    telegram: z.string().optional(),
  })
  .refine(
    data => {
      if (data.contactMethod === 'email') return !!data.email
      if (data.contactMethod === 'phone') return !!data.phone
      return !!data.telegram
    },
    { message: 'Fill in contact info', path: ['email'] }
  )
```

---

## Part 3: Dependent Fields

### Basic Dependent Fields

```tsx
const citiesByCountry = {
  ru: ['Moscow', 'Saint Petersburg', 'Kazan'],
  us: ['New York', 'Los Angeles', 'Chicago'],
  de: ['Berlin', 'Munich', 'Hamburg'],
}

function DependentFields() {
  const { register, handleSubmit, watch, setValue } = useForm()

  const country = watch('country')
  const cities = country ? citiesByCountry[country] || [] : []

  return (
    <form>
      <select {...register('country')}>
        <option value="">Select a country</option>
        <option value="ru">Russia</option>
        <option value="us">USA</option>
        <option value="de">Germany</option>
      </select>

      <select {...register('city')} disabled={!country}>
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  )
}
```

### Reset Dependent Field on Parent Change

```tsx
<select
  {...register('country')}
  onChange={(e) => {
    setValue('country', e.target.value)
    setValue('city', '') // Reset city
  }}
>
```

---

## Part 4: Wizard (Multi-step Forms)

### Basic Wizard

```tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function WizardForm() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, trigger } = useForm()

  const onNext = async () => {
    const isValid = await trigger(['email', 'password'])
    if (isValid) setStep(step + 1)
  }

  const onPrev = () => setStep(step - 1)

  const onSubmit = (data: any) => {
    console.log('Submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <>
          <h2>Step 1: Account</h2>
          <input {...register('email', { required: true })} placeholder="Email"/>
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
          />
          <button type="button" onClick={onNext}>
            Next →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Step 2: Profile</h2>
          <input {...register('firstName', { required: true })} placeholder="First Name"/>
          <input {...register('lastName', { required: true })} placeholder="Last Name"/>
          <div>
            <button type="button" onClick={onPrev}>
              ← Back
            </button>
            <button type="button" onClick={onNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Step 3: Confirmation</h2>
          <textarea {...register('comments')} placeholder="Comment"/>
          <div>
            <button type="button" onClick={onPrev}>
              ← Back
            </button>
            <button type="submit">Submit</button>
          </div>
        </>
      )}
    </form>
  )
}
```

### Wizard with Data Persistence Between Steps

```tsx
function WizardWithPersistence() {
  const [step, setStep] = useState(1)

  const { register, handleSubmit, trigger, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      comments: '',
    },
  })

  // All data available on any step
  const allData = watch()

  const onNext = async () => {
    const fields = step === 1 ? ['email', 'password'] : ['firstName', 'lastName']
    const isValid = await trigger(fields)
    if (isValid) setStep(step + 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Step {step} of 3</div>

      {/* Step rendering */}

      <pre>{JSON.stringify(allData, null, 2)}</pre>
    </form>
  )
}
```

---

## Complete Example: Order Form

```tsx
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  // Step 1: Contact Information
  contactMethod: z.enum(['email', 'phone']),
  email: z.string().email().optional(),
  phone: z.string().optional(),

  // Step 2: Items
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(1),
        price: z.number().positive(),
      })
    )
    .min(1, 'Add at least one item'),

  // Step 3: Shipping
  address: z.object({
    city: z.string().min(1),
    street: z.string().min(1),
    zip: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
  }),

  comments: z.string().optional(),
})

type OrderForm = z.infer<typeof schema>

export function OrderWizard() {
  const [step, setStep] = useState(1)

  const {
    control,
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [{ name: '', quantity: 1, price: 0 }],
      address: { city: '', street: '', zip: '' },
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const contactMethod = watch('contactMethod')

  const onNext = async () => {
    let fieldsToValidate: any[] = []

    if (step === 1) {
      fieldsToValidate = ['contactMethod']
      if (contactMethod === 'email') fieldsToValidate.push('email')
      else fieldsToValidate.push('phone')
    } else if (step === 2) {
      fieldsToValidate = ['items']
    } else if (step === 3) {
      fieldsToValidate = ['address.city', 'address.street', 'address.zip']
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) setStep(step + 1)
  }

  const onSubmit = (data: OrderForm) => {
    console.log('Order:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '1rem' }}>Step {step} of 4</div>

      {/* Step 1: Contact */}
      {step === 1 && (
        <div>
          <h2>Contact Information</h2>

          <div>
            <label>Contact Method</label>
            <select {...register('contactMethod')}>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          {contactMethod === 'email' ? (
            <div>
              <label>Email</label>
              <input type="email" {...register('email')} />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
          ) : (
            <div>
              <label>Phone</label>
              <input type="tel" {...register('phone')} />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>
          )}

          <button type="button" onClick={onNext}>
            Next →
          </button>
        </div>
      )}

      {/* Step 2: Items */}
      {step === 2 && (
        <div>
          <h2>Items</h2>

          {fields.map((field, index) => (
            <div key={field.id} style={{ marginBottom: '1rem' }}>
              <input {...register(`items.${index}.name` as const)} placeholder="Name"/>
              <input
                type="number"
                {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                placeholder="Quantity"
              />
              <input
                type="number"
                {...register(`items.${index}.price` as const, { valueAsNumber: true })}
                placeholder="Price"
              />
              <button type="button" onClick={() => remove(index)}>
                ✕
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append({ name: '', quantity: 1, price: 0 })}>
            + Add Item
          </button>

          <div>
            <button type="button" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button type="button" onClick={onNext}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Address */}
      {step === 3 && (
        <div>
          <h2>Shipping Address</h2>

          <input {...register('address.city')} placeholder="City"/>
          {errors.address?.city && <span className="error">{errors.address.city.message}</span>}

          <input {...register('address.street')} placeholder="Street"/>
          {errors.address?.street && <span className="error">{errors.address.street.message}</span>}

          <input {...register('address.zip')} placeholder="Zip Code"/>
          {errors.address?.zip && <span className="error">{errors.address.zip.message}</span>}

          <div>
            <button type="button" onClick={() => setStep(2)}>
              ← Back
            </button>
            <button type="button" onClick={onNext}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div>
          <h2>Confirmation</h2>

          <textarea {...register('comments')} placeholder="Order comment"/>

          <div>
            <button type="button" onClick={() => setStep(3)}>
              ← Back
            </button>
            <button type="submit">Place Order</button>
          </div>
        </div>
      )}
    </form>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Key Not Using field.id

```tsx
// ❌ Wrong - index can change
{
  fields.map((field, index) => (
    <div key={index}>
      <input {...register(`emails.${index}.value`)} />
    </div>
  ))
}

// ✅ Correct - use field.id
{
  fields.map((field, index) => (
    <div key={field.id}>
      <input {...register(`emails.${index}.value`)} />
    </div>
  ))
}
```

**Why this is a mistake:** When adding/removing elements, the index changes, causing React state
issues.

---

### ❌ Mistake 2: No append/remove

```tsx
// ❌ Wrong - array doesn't change
const { fields } = useFieldArray({ control, name: 'emails' })
{
  fields.map(field => <div key={field.id}>{field.value}</div>)
}

// ✅ Correct - use methods
const { fields, append, remove } = useFieldArray({ control, name: 'emails' })
{
  fields.map((field, index) => (
    <div key={field.id}>
      <input {...register(`emails.${index}.value`)} />
      <button type="button" onClick={() => remove(index)}>
        ✕
      </button>
    </div>
  ))
}
;<button type="button" onClick={() => append({ value: '' })}>
  + Add
</button>
```

**Why this is a mistake:** Without `append`/`remove`, the field array remains static.

---

### ❌ Mistake 3: Wizard Without trigger

```tsx
// ❌ Wrong - transition without validation
const onNext = () => setStep(step + 1)

// ✅ Correct - validate before transition
const onNext = async () => {
  const isValid = await trigger(['email', 'password'])
  if (isValid) setStep(step + 1)
}
```

**Why this is a mistake:** Without `trigger`, the user can move to the next step with invalid data.

---

### ❌ Mistake 4: Conditional Fields Without shouldUnregister

```tsx
// ❌ Wrong - hidden field stays in form
{
  showEmail && <input {...register('email', { required: true })} />
}

// ✅ Correct - unregister when hidden
const { register } = useForm({ shouldUnregister: true })
{
  showEmail && <input {...register('email', { required: true })} />
}
```

**Why this is a mistake:** Hidden fields can cause validation errors if not unregistered.

---

### ❌ Mistake 5: Dependent Fields Without Reset

```tsx
// ❌ Wrong - city stays when country changes
<select {...register('country')}>
  <option value="ru">Russia</option>
  <option value="us">USA</option>
</select>
<select {...register('city')}>
  <option value="moscow">Moscow</option>
  <option value="ny">New York</option>
</select>

// ✅ Correct - reset city
<select
  {...register('country')}
  onChange={(e) => {
    setValue('country', e.target.value)
    setValue('city', '') // reset
  }}
>
```

**Why this is a mistake:** When changing the parent field, the dependent field should be reset.

---

## 📚 Additional Resources

- [useFieldArray Documentation](https://react-hook-form.com/docs/usefieldarray)
- [trigger Documentation](https://react-hook-form.com/docs/useform/trigger)
