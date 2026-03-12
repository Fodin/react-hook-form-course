# Уровень 7: Асинхронность

## 7.1 Async валидация

Валидация с обращением к серверу:

```tsx
const validateUsername = async (value: string) => {
  const response = await fetch(`/api/check-username?username=${value}`)
  const { available } = await response.json()
  return available || 'Имя занято'
}

<input {...register('username', { validate: validateUsername })} />
```

## 7.2 Загрузка данных (edit mode)

Загрузка данных для редактирования:

```tsx
const { reset } = useForm()

useEffect(() => {
  fetch('/api/user/1')
    .then(res => res.json())
    .then(data => reset(data))
}, [reset])
```

## 7.3 Submit с loading/error

Обработка состояния отправки:

```tsx
const [submitting, setSubmitting] = useState(false)
const [error, setError] = useState<string | null>(null)

const onSubmit = async (data) => {
  setSubmitting(true)
  try {
    await api.submit(data)
  } catch (e) {
    setError(e.message)
  } finally {
    setSubmitting(false)
  }
}
```

## 7.4 Debounce для автосохранения

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    saveToServer(watch())
  }, 1000)
  return () => clearTimeout(timer)
}, [watch()])
```

---

## 📝 Задания

Смотрите файл `task.md` для подробных заданий.
