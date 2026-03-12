# Уровень 8: Продвинутые техники

## 8.1 Интеграция с UI-библиотеками

Использование Controller для сторонних компонентов:

```tsx
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

<Controller
  name="email"
  control={control}
  render={({ field, fieldState: { error } }) => (
    <TextField
      {...field}
      error={!!error}
      helperText={error?.message}
    />
  )}
/>
```

## 8.2 Кастомные хуки

Создание хуков для переиспользования логики:

```tsx
function useFormPersist<T>(name: string) {
  const [stored, setStored] = useState<T>(() => {
    const saved = localStorage.getItem(`form-${name}`)
    return saved ? JSON.parse(saved) : undefined
  })

  const save = (values: T) => {
    localStorage.setItem(`form-${name}`, JSON.stringify(values))
  }

  return { stored, save }
}
```

## 8.3 FormContext

Разделение формы на подкомпоненты:

```tsx
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

function App() {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <PersonalStep />
        <ContactStep />
      </form>
    </FormProvider>
  )
}

function PersonalStep() {
  const { register } = useFormContext()
  return <input {...register('name')} />
}
```

## 8.4 localStorage persistence

Сохранение данных формы:

```tsx
const { register, reset } = useForm({
  defaultValues: () => {
    const saved = localStorage.getItem('form-data')
    return saved ? JSON.parse(saved) : {}
  }
})

useEffect(() => {
  const subscription = watch((value) => {
    localStorage.setItem('form-data', JSON.stringify(value))
  })
  return () => subscription.unsubscribe()
}, [watch])
```

---

## 📝 Задания

Смотрите файл `task.md` для подробных заданий.
