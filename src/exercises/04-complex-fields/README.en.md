# Level 4: Complex Fields — Controller, Radio, Select, Checkbox, File

## Introduction

Not all fields can be easily registered via `register`. For uncontrolled components (UI libraries, custom inputs), `Controller` is used. In this level, you will learn to work with all types of complex fields.

---

## Part 1: Controller

### What is Controller?

**Controller** is a component for integrating controlled components with React Hook Form.

**When to use Controller:**

- ✅ Third-party UI components (Material-UI, Ant Design, Chakra UI)
- ✅ Custom input components
- ✅ Components that don't accept `ref`

### Basic Usage

```tsx
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

function MyForm() {
  const { control } = useForm()

  return (
    <Controller
      name="category"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          options={[
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
          ]}
        />
      )}
    />
  )
}
```

### render vs children

```tsx
// Option 1: render prop
<Controller
  name="category"
  control={control}
  render={({ field, fieldState }) => (
    <Select {...field} />
  )}
/>

// Option 2: children (same thing)
<Controller
  name="category"
  control={control}
>
  {({ field, fieldState }) => (
    <Select {...field} />
  )}
</Controller>
```

### All field Parameters

```tsx
<Controller
  name="category"
  control={control}
  render={({
    field, // { onChange, onBlur, value, name, ref }
    fieldState, // { invalid, isTouched, isDirty, error }
    formState, // { errors, isSubmitting, isValid }
  }) => <Select {...field} onChange={selected => field.onChange(selected?.value)} />}
/>
```

---

### Example: Custom TextField

```tsx
// Custom component
function TextField({ label, error, ...props }: any) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input style={{ borderColor: error ? '#dc3545' : '#ddd' }} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

// Usage with Controller
;<Controller
  name="email"
  control={control}
  render={({ field, fieldState: { error } }) => (
    <TextField {...field} label="Email" error={error?.message} />
  )}
/>
```

---

## Part 2: Radio and Select

### Radio Buttons

```tsx
import { useForm } from 'react-hook-form'

function RadioForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Gender:', data.gender) // 'male' | 'female' | 'other'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <input type="radio" value="male" {...register('gender')} />
          Male
        </label>
        <label>
          <input type="radio" value="female" {...register('gender')} />
          Female
        </label>
        <label>
          <input type="radio" value="other" {...register('gender')} />
          Other
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Select (Dropdown)

```tsx
function SelectForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Country:', data.country) // 'us' | 'ru' | 'de'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('country')}>
        <option value="">Select a country</option>
        <option value="us">USA</option>
        <option value="ru">Russia</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Select with Validation

```tsx
;<select
  {...register('country', {
    required: 'Select a country',
  })}
>
  <option value="">Select a country</option>
  <option value="us">USA</option>
  <option value="ru">Russia</option>
</select>
{
  errors.country && <span className="error">{errors.country.message}</span>
}
```

---

## Part 3: Checkbox

### Single Checkbox (boolean)

```tsx
function SingleCheckbox() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Agree:', data.agree) // true | false
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input type="checkbox" {...register('agree')} />I agree to the terms
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Multiple Selection (array)

```tsx
function MultiCheckbox() {
  const { register, watch, setValue, handleSubmit } = useForm()

  const skills = watch('skills') || []

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setValue('skills', [...skills, skill])
    } else {
      setValue(
        'skills',
        skills.filter(s => s !== skill)
      )
    }
  }

  const onSubmit = (data: any) => {
    console.log('Skills:', data.skills) // ['react', 'typescript']
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <input
            type="checkbox"
            value="react"
            checked={skills.includes('react')}
            onChange={e => handleSkillChange('react', e.target.checked)}
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            value="vue"
            checked={skills.includes('vue')}
            onChange={e => handleSkillChange('vue', e.target.checked)}
          />
          Vue
        </label>
        <label>
          <input
            type="checkbox"
            value="angular"
            checked={skills.includes('angular')}
            onChange={e => handleSkillChange('angular', e.target.checked)}
          />
          Angular
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
```

### With Validation (minimum one selected)

```tsx
const {
  register,
  watch,
  setValue,
  formState: { errors },
} = useForm()
const skills = watch('skills') || []

// Validation
{
  errors.skills && <span className="error">{errors.skills.message}</span>
}

// When submitting via zodResolver:
const schema = z.object({
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
})
```

---

## Part 4: File Upload

### Basic File Upload

```tsx
function FileUpload() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    const file = data.avatar[0]
    console.log('File:', file)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" accept="image/*" {...register('avatar')} />
      <button type="submit">Upload</button>
    </form>
  )
}
```

### With Size and Type Validation

```tsx
const schema = z.object({
  avatar: z
    .instanceof(FileList)
    .refine(files => files.length > 0, 'Select a file')
    .refine(files => files[0]?.size < 2000000, 'Maximum 2MB')
    .refine(
      files => ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type),
      'Only JPG, PNG, GIF'
    ),
})
```

### With Preview

```tsx
import { useState } from 'react'

function FileUploadWithPreview() {
  const { register, handleSubmit, watch } = useForm()
  const [preview, setPreview] = useState<string | null>(null)

  const avatarFile = watch('avatar')

  React.useEffect(() => {
    if (avatarFile?.[0]) {
      const url = URL.createObjectURL(avatarFile[0])
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [avatarFile])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        accept="image/*"
        {...register('avatar')}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) {
            setPreview(URL.createObjectURL(file))
          }
        }}
      />

      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />}

      <button type="submit">Upload</button>
    </form>
  )
}
```

---

## Part 5: Date and Time

### Date Input

```tsx
function DateForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Birth date:', data.birthDate) // '1990-01-01'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Birth Date</label>
      <input type="date" {...register('birthDate')} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### DateTime-local

```tsx
function DateTimeForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Appointment:', data.appointment) // '2024-01-15T10:00'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Appointment</label>
      <input type="datetime-local" {...register('appointment')} />
      <button type="submit">Schedule</button>
    </form>
  )
}
```

### With Validation

```tsx
const schema = z.object({
  birthDate: z.string().min(1, 'Select a date'),
  appointment: z
    .string()
    .min(1, 'Select a time')
    .refine(date => new Date(date) > new Date(), 'Time must be in the future'),
})
```

---

## Complete Example: Product Creation Form

```tsx
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Select a category'),
  price: z.number().positive(),
  inStock: z.boolean(),
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
  image: z.instanceof(FileList).refine(files => files.length > 0, 'Select an image'),
})

type ProductForm = z.infer<typeof schema>

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
]

const tags = ['new', 'sale', 'popular', 'limited']

export function ProductForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(schema),
  })

  const selectedTags = watch('tags') || []
  const image = watch('image')
  const [preview, setPreview] = useState<string | null>(null)

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setValue('tags', [...selectedTags, tag])
    } else {
      setValue(
        'tags',
        selectedTags.filter(t => t !== tag)
      )
    }
  }

  const onSubmit = (data: ProductForm) => {
    console.log('Product:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <label>Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <select {...field}>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          )}
        />
        {errors.category && <span className="error">{errors.category.message}</span>}
      </div>

      <div>
        <label>Price</label>
        <input type="number" {...register('price', { valueAsNumber: true })} />
        {errors.price && <span className="error">{errors.price.message}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('inStock')} />
          In Stock
        </label>
      </div>

      <div>
        <label>Tags</label>
        {tags.map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={e => handleTagChange(tag, e.target.checked)}
            />
            {tag}
          </label>
        ))}
        {errors.tags && <span className="error">{errors.tags.message}</span>}
      </div>

      <div>
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) {
              setPreview(URL.createObjectURL(file))
            }
          }}
        />
        {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />}
        {errors.image && <span className="error">{errors.image.message}</span>}
      </div>

      <button type="submit">Create Product</button>
    </form>
  )
}
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Controller Without control

```tsx
// ❌ Wrong - control not passed
<Controller
  name="category"
  render={({ field }) => <Select {...field} />}
/>

// ✅ Correct - pass control
const { control } = useForm()
<Controller
  name="category"
  control={control}
  render={({ field }) => <Select {...field} />}
/>
```

**Why this is a mistake:** `Controller` requires `control` to connect with React Hook Form.

---

### ❌ Mistake 2: Checkbox Without checked

```tsx
// ❌ Wrong - checkbox is uncontrolled
<input type="checkbox" {...register('agree')} />

// ✅ Correct - with checked for Controller
<Controller
  name="agree"
  control={control}
  render={({ field }) => (
    <input
      type="checkbox"
      checked={field.value}
      onChange={field.onChange}
    />
  )}
/>
```

**Why this is a mistake:** Checkbox requires explicit `checked` for proper controlled mode operation.

---

### ❌ Mistake 3: File Without preventDefault

```tsx
// ❌ Wrong - form submits on file selection
<input type="file" {...register('avatar')} />

// ✅ Correct - cancel default behavior
<form onSubmit={handleSubmit(onSubmit)}>
  <input
    type="file"
    {...register('avatar')}
    onChange={(e) => {
      const file = e.target.files?.[0]
      // file handling
    }}
  />
</form>
```

**Why this is a mistake:** When uploading files, it's important not to submit the form automatically, but handle the file separately.

---

### ❌ Mistake 4: Not Transforming Value in Controller

```tsx
// ❌ Wrong - entire object passed
<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      options={[{ value: 'el', label: 'Electronics' }]}
    />
  )}
/>

// ✅ Correct - transform value
<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      onChange={(selected) => field.onChange(selected?.value)}
      options={[{ value: 'el', label: 'Electronics' }]}
    />
  )}
/>
```

**Why this is a mistake:** Third-party components often return objects, not primitive values.

---

### ❌ Mistake 5: Radio Without value

```tsx
// ❌ Wrong - no value
<input type="radio" {...register('gender')} />

// ✅ Correct - with value
<input type="radio" value="male" {...register('gender')} />
<input type="radio" value="female" {...register('gender')} />
```

**Why this is a mistake:** Radio buttons require `value` to determine the selected value.

---

## 📝 Exercises

Go to the [`task.md`](./task.md) file for practical exercises.

---

## 📚 Additional Resources

- [Controller Documentation](https://react-hook-form.com/docs/useform/controller)
- [useWatch Documentation](https://react-hook-form.com/docs/usewatch)
