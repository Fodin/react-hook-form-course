# Уровень 4: Сложные поля — Controller, Radio, Select, Checkbox, File

## Введение

Не все поля можно легко зарегистрировать через `register`. Для неконтролируемых компонентов (UI-библиотеки, кастомные инпуты) используется `Controller`. В этом уровне вы научитесь работать со всеми типами сложных полей.

---

## Часть 1: Controller

### Что такое Controller?

**Controller** — это компонент для интеграции контролируемых компонентов с React Hook Form.

**Когда использовать Controller:**
- ✅ Сторонние UI-компоненты (Material-UI, Ant Design, Chakra UI)
- ✅ Кастомные компоненты инпутов
- ✅ Компоненты, которые не принимают `ref`

### Базовое использование

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
            { value: 'electronics', label: 'Электроника' },
            { value: 'clothing', label: 'Одежда' },
          ]}
        />
      )}
    />
  )
}
```

### render vs children

```tsx
// Вариант 1: render prop
<Controller
  name="category"
  control={control}
  render={({ field, fieldState }) => (
    <Select {...field} />
  )}
/>

// Вариант 2: children (то же самое)
<Controller
  name="category"
  control={control}
>
  {({ field, fieldState }) => (
    <Select {...field} />
  )}
</Controller>
```

### Все параметры field

```tsx
<Controller
  name="category"
  control={control}
  render={({
    field,           // { onChange, onBlur, value, name, ref }
    fieldState,      // { invalid, isTouched, isDirty, error }
    formState,       // { errors, isSubmitting, isValid }
  }) => (
    <Select
      {...field}
      onChange={(selected) => field.onChange(selected?.value)}
    />
  )}
/>
```

---

### Пример: Кастомный TextField

```tsx
// Кастомный компонент
function TextField({ label, error, ...props }: any) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        style={{ borderColor: error ? '#dc3545' : '#ddd' }}
        {...props}
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

// Использование с Controller
<Controller
  name="email"
  control={control}
  render={({ field, fieldState: { error } }) => (
    <TextField
      {...field}
      label="Email"
      error={error?.message}
    />
  )}
/>
```

---

## Часть 2: Radio и Select

### Radio кнопки

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
          Мужской
        </label>
        <label>
          <input type="radio" value="female" {...register('gender')} />
          Женский
        </label>
        <label>
          <input type="radio" value="other" {...register('gender')} />
          Другой
        </label>
      </div>
      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Select (выпадающий список)

```tsx
function SelectForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Country:', data.country) // 'us' | 'ru' | 'de'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('country')}>
        <option value="">Выберите страну</option>
        <option value="us">USA</option>
        <option value="ru">Россия</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
      </select>
      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Select с валидацией

```tsx
<select
  {...register('country', {
    required: 'Выберите страну',
  })}
>
  <option value="">Выберите страну</option>
  <option value="us">USA</option>
  <option value="ru">Россия</option>
</select>
{errors.country && (
  <span className="error">{errors.country.message}</span>
)}
```

---

## Часть 3: Checkbox

### Одиночный checkbox (boolean)

```tsx
function SingleCheckbox() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Agree:', data.agree) // true | false
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input type="checkbox" {...register('agree')} />
        Я согласен с правилами
      </label>
      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Множественный выбор (массив)

```tsx
function MultiCheckbox() {
  const { register, watch, setValue, handleSubmit } = useForm()
  
  const skills = watch('skills') || []

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setValue('skills', [...skills, skill])
    } else {
      setValue('skills', skills.filter(s => s !== skill))
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
            onChange={(e) => handleSkillChange('react', e.target.checked)}
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            value="vue"
            checked={skills.includes('vue')}
            onChange={(e) => handleSkillChange('vue', e.target.checked)}
          />
          Vue
        </label>
        <label>
          <input
            type="checkbox"
            value="angular"
            checked={skills.includes('angular')}
            onChange={(e) => handleSkillChange('angular', e.target.checked)}
          />
          Angular
        </label>
      </div>
      <button type="submit">Отправить</button>
    </form>
  )
}
```

### С валидацией (минимум один выбран)

```tsx
const { register, watch, setValue, formState: { errors } } = useForm()
const skills = watch('skills') || []

// Валидация
{errors.skills && (
  <span className="error">{errors.skills.message}</span>
)}

// При отправке через zodResolver:
const schema = z.object({
  skills: z.array(z.string()).min(1, 'Выберите хотя бы один навык'),
})
```

---

## Часть 4: File Upload

### Базовая загрузка файла

```tsx
function FileUpload() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    const file = data.avatar[0]
    console.log('File:', file)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        accept="image/*"
        {...register('avatar')}
      />
      <button type="submit">Загрузить</button>
    </form>
  )
}
```

### С валидацией размера и типа

```tsx
const schema = z.object({
  avatar: z.instanceof(FileList)
    .refine((files) => files.length > 0, 'Выберите файл')
    .refine(
      (files) => files[0]?.size < 2000000,
      'Максимум 2MB'
    )
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type),
      'Только JPG, PNG, GIF'
    ),
})
```

### С предпросмотром

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
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            setPreview(URL.createObjectURL(file))
          }
        }}
      />
      
      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />
      )}
      
      <button type="submit">Загрузить</button>
    </form>
  )
}
```

---

## Часть 5: Дата и время

### Date input

```tsx
function DateForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log('Birth date:', data.birthDate) // '1990-01-01'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Дата рождения</label>
      <input
        type="date"
        {...register('birthDate')}
      />
      <button type="submit">Отправить</button>
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
      <label>Запись на встречу</label>
      <input
        type="datetime-local"
        {...register('appointment')}
      />
      <button type="submit">Записаться</button>
    </form>
  )
}
```

### С валидацией

```tsx
const schema = z.object({
  birthDate: z.string().min(1, 'Выберите дату'),
  appointment: z.string()
    .min(1, 'Выберите время')
    .refine(
      (date) => new Date(date) > new Date(),
      'Время должно быть в будущем'
    ),
})
```

---

## Полный пример: Форма создания товара

```tsx
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Обязательно'),
  category: z.string().min(1, 'Выберите категорию'),
  price: z.number().positive(),
  inStock: z.boolean(),
  tags: z.array(z.string()).min(1, 'Выберите хотя бы один тег'),
  image: z.instanceof(FileList)
    .refine((files) => files.length > 0, 'Выберите изображение'),
})

type ProductForm = z.infer<typeof schema>

const categories = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'clothing', label: 'Одежда' },
  { value: 'books', label: 'Книги' },
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
      setValue('tags', selectedTags.filter(t => t !== tag))
    }
  }

  const onSubmit = (data: ProductForm) => {
    console.log('Product:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Название</label>
        <input {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <label>Категория</label>
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <select {...field}>
              <option value="">Выберите категорию</option>
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
        <label>Цена</label>
        <input
          type="number"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && <span className="error">{errors.price.message}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('inStock')} />
          В наличии
        </label>
      </div>

      <div>
        <label>Теги</label>
        {tags.map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={(e) => handleTagChange(tag, e.target.checked)}
            />
            {tag}
          </label>
        ))}
        {errors.tags && <span className="error">{errors.tags.message}</span>}
      </div>

      <div>
        <label>Изображение</label>
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setPreview(URL.createObjectURL(file))
            }
          }}
        />
        {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />}
        {errors.image && <span className="error">{errors.image.message}</span>}
      </div>

      <button type="submit">Создать товар</button>
    </form>
  )
}
```

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [Controller документация](https://react-hook-form.com/docs/useform/controller)
- [useWatch документация](https://react-hook-form.com/docs/usewatch)
