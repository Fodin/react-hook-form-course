# Уровень 5: Динамические формы

## 5.1 useFieldArray

Хук для работы с динамическими массивами полей:

```tsx
import { useForm, useFieldArray } from 'react-hook-form'

function MyForm() {
  const { control, register } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emails',
  })

  return (
    <div>
      {fields.map((field, index) => (
        <input key={field.id} {...register(`emails.${index}.value`)} />
      ))}
      <button type="button" onClick={() => append({ value: '' })}>
        Добавить
      </button>
      <button type="button" onClick={() => remove(0)}>
        Удалить
      </button>
    </div>
  )
}
```

### Методы useFieldArray

| Метод | Описание |
|-------|----------|
| `append` | Добавить элемент в конец |
| `prepend` | Добавить элемент в начало |
| `insert` | Вставить элемент по индексу |
| `remove` | Удалить элемент по индексу |
| `swap` | Поменять элементы местами |
| `move` | Переместить элемент |

## 5.2 Условные поля

Отображение полей в зависимости от значений других полей:

```tsx
const contactMethod = watch('contactMethod')

return (
  <>
    <select {...register('contactMethod')}>
      <option value="email">Email</option>
      <option value="phone">Телефон</option>
    </select>
    
    {contactMethod === 'email' && (
      <input {...register('email')} />
    )}
    {contactMethod === 'phone' && (
      <input {...register('phone')} />
    )}
  </>
)
```

## 5.3 Зависимые поля

Поля, значения которых зависят от других полей:

```tsx
const country = watch('country')
const cities = country === 'ru' ? ['Москва', 'СПб'] : ['NYC', 'LA']

// При смене страны сбрасываем город
<select {...register('country')} onChange={() => setValue('city', '')}>
```

## 5.4 Wizard (multi-step формы)

Формы с пошаговой навигацией:

```tsx
const [step, setStep] = useState(1)

const onNext = async () => {
  const isValid = await trigger(['email', 'password'])
  if (isValid) setStep(s => s + 1)
}

return (
  <>
    {step === 1 && <Step1 />}
    {step === 2 && <Step2 />}
    <button onClick={onNext}>Далее</button>
  </>
)
```

---

## 📝 Задания

Смотрите файл `task.md` для подробных заданий.
