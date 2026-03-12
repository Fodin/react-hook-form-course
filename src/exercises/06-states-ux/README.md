# Уровень 6: Состояния и UX

## 6.1 Dirty / Touched states

Отслеживание состояния полей:

```tsx
const { formState: { dirtyFields, touchedFields, isDirty } } = useForm()

// dirtyFields — какие поля были изменены
// touchedFields — какие поля были затронуты (blur)
// isDirty — была ли форма изменена целиком
```

## 6.2 Reset и default values

```tsx
// С дефолтными значениями
const { reset } = useForm({
  defaultValues: { name: '', email: '' }
})

// Сброс формы
reset()

// Сброс с новыми значениями
reset({ name: 'New', email: 'new@example.com' })
```

## 6.3 Focus management

Автоматический фокус на первом поле с ошибкой:

```tsx
useEffect(() => {
  const firstError = Object.keys(errors)[0]
  if (firstError) {
    document.getElementById(firstError)?.focus()
  }
}, [errors])
```

## 6.4 Accessibility (ARIA)

```tsx
<input
  {...register('email')}
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <span id="email-error" role="alert">{errors.email.message}</span>
)}
```

## 6.5 Performance оптимизация

```tsx
// Вместо watch() для всех полей
const allValues = watch()

// Используйте useWatch для отдельных полей
const name = useWatch({ name: 'name' })

// Или memo для предотвращения ре-рендеров
const MemoizedForm = memo(({ control }) => {
  const value = useWatch({ control, name: 'field' })
  return <div>{value}</div>
})
```

---

## 📝 Задания

Смотрите файл `task.md` для подробных заданий.
