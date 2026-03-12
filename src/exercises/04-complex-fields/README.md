# Уровень 4: Сложные поля

## 4.1 Controller

`Controller` используется для интеграции неконтролируемых компонентов (UI-библиотеки, кастомные инпуты):

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
          options={[{ value: 'a', label: 'A' }]}
        />
      )}
    />
  )
}
```

## 4.2 Radio и Select

```tsx
// Radio
<input type="radio" value="male" {...register('gender')} />
<input type="radio" value="female" {...register('gender')} />

// Select
<select {...register('country')}>
  <option value="us">USA</option>
  <option value="ru">Russia</option>
</select>
```

## 4.3 Checkbox

```tsx
// Одиночный
<input type="checkbox" {...register('agree')} />

// Множественный выбор
const checkboxes = watch('categories', [])
<input 
  type="checkbox" 
  value="react"
  checked={checkboxes.includes('react')}
  onChange={(e) => {
    if (e.target.checked) {
      setValue('categories', [...checkboxes, 'react'])
    } else {
      setValue('categories', checkboxes.filter(c => c !== 'react'))
    }
  }}
/>
```

## 4.4 File Upload

```tsx
const { register } = useForm()

<input 
  type="file" 
  {...register('avatar', {
    validate: {
      size: (files) => files[0]?.size < 1000000 || 'Максимум 1MB',
      type: (files) => ['image/jpeg', 'image/png'].includes(files[0]?.type) || 'Только JPG/PNG',
    },
  })} 
/>
```

---

## 📝 Задания

- 4.1: Controller для React Select
- 4.2: Radio и Select поля
- 4.3: Checkbox (одиночный и множественный)
- 4.4: File upload с валидацией
- 4.5: Дата и время
