# Уровень 1: Основы

## 1.1 useForm

Главный хук для работы с формами:

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  firstName: string
  lastName: string
  age: number
}

function MyForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    setValue,
    getValues,
    reset,
  } = useForm<FormData>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* поля формы */}
    </form>
  }
}
```

### Возвращаемые значения useForm

| Метод/Объект | Описание |
|-------------|----------|
| `register` | Регистрирует поле в форме |
| `handleSubmit` | Обработчик отправки формы |
| `watch` | Подписка на изменения значений полей |
| `formState` | Объект с состоянием формы |
| `setValue` | Устанавливает значение поля |
| `getValues` | Получает текущие значения формы |
| `reset` | Сбрасывает форму к начальным значениям |

## 1.2 register

Регистрация полей с опциями:

```tsx
// Базовая регистрация
<input {...register('firstName')} />

// С опциями
<input 
  {...register('age', {
    valueAsNumber: true,
    min: 18,
    max: 100,
  })} 
/>

// С обработчиками
<input 
  {...register('email', {
    onChange: (e) => console.log(e.target.value),
    onBlur: (e) => console.log('Field blurred'),
  })} 
/>
```

## 1.3 formState

Объект состояния формы:

```tsx
const { formState: { errors, isValid, isSubmitting, isDirty, touchedFields } } = useForm()

// errors - объект с ошибками валидации
// isValid - true если форма валидна
// isSubmitting - true во время отправки
// isDirty - true если поля были изменены
// touchedFields - поля, которые были затронуты (blur)
```

## 1.4 watch, setValue, getValues

### watch

Отслеживание значений:

```tsx
// Отслеживание одного поля
const firstName = watch('firstName')

// Отслеживание нескольких полей
const [firstName, lastName] = watch(['firstName', 'lastName'])

// Отслеживание всех полей
const allValues = watch()

// С дефолтным значением
const value = watch('fieldName', 'default value')
```

### setValue

Установка значения:

```tsx
setValue('firstName', 'John')

// С опциями
setValue('firstName', 'John', {
  shouldValidate: true,  // Запустить валидацию
  shouldDirty: true,     // Пометить как dirty
})
```

### getValues

Получение значений:

```tsx
const allValues = getValues()
const firstName = getValues('firstName')
```

---

## 📝 Задания

Смотрите файл `task.md` для подробных заданий.
