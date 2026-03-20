# Уровень 5: Динамические формы — useFieldArray, Wizard, Conditional

## Введение

Динамические формы — это формы, которые меняются в зависимости от действий пользователя. Вы
научитесь добавлять/удалять поля, создавать многошаговые формы и отображать условные поля.

---

## Часть 1: useFieldArray

### Что такое useFieldArray?

**useFieldArray** — это хук для работы с динамическими массивами полей. Позволяет добавлять,
удалять, перемещать поля в форме.

### Базовое использование

```tsx
import { useForm, useFieldArray } from 'react-hook-form'

function DynamicForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      emails: [{ value: '' }], // Начальное значение
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
          <input {...register(`emails.${index}.value`)} placeholder="Email" />
          <button type="button" onClick={() => remove(index)}>
            ✕
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ value: '' })}>
        + Добавить
      </button>

      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Методы useFieldArray

```tsx
const {
  fields, // Массив полей { id, ...value }
  append, // Добавить в конец
  prepend, // Добавить в начало
  insert, // Вставить по индексу
  remove, // Удалить по индексу
  swap, // Поменять местами
  move, // Переместить
  replace, // Заменить весь массив
  update, // Обновить конкретное поле
} = useFieldArray({ control, name: 'items' })
```

### Примеры использования методов

```tsx
// Добавить один элемент
append({ value: '' })

// Добавить несколько
append([{ value: 'a' }, { value: 'b' }])

// Вставить по индексу
insert(1, { value: 'new' })

// Удалить элемент
remove(2)

// Удалить несколько
remove([1, 3, 5])

// Поменять местами
swap(0, 1)

// Переместить
move(3, 1)

// Заменить весь массив
replace([{ value: 'new1' }, { value: 'new2' }])

// Обновить конкретное поле
update(0, { value: 'updated' })
```

---

### Валидация динамических полей

```tsx
import { z } from 'zod'

const schema = z.object({
  emails: z
    .array(
      z.object({
        value: z.string().email('Неверный email'),
      })
    )
    .min(1, 'Минимум один email'),
})

// Использование
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

// Отображение ошибок
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

## Часть 2: Условные поля

### Базовое условное отображение

```tsx
function ConditionalForm() {
  const { register, handleSubmit, watch } = useForm()

  const contactMethod = watch('contactMethod')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('contactMethod')}>
        <option value="email">Email</option>
        <option value="phone">Телефон</option>
        <option value="telegram">Telegram</option>
      </select>

      {contactMethod === 'email' && <input {...register('email')} placeholder="Email" />}

      {contactMethod === 'phone' && <input {...register('phone')} placeholder="Телефон" />}

      {contactMethod === 'telegram' && <input {...register('telegram')} placeholder="@username" />}

      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Валидация условных полей

**Проблема:** Скрытые поля всё ещё валидируются.

**Решение 1:** Использовать `shouldUnregister: true`

```tsx
const { register } = useForm({ shouldUnregister: true })

<input {...register('email', { required: true })} />
```

**Решение 2:** Кастомная валидация

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
    { message: 'Заполните контакт', path: ['email'] }
  )
```

---

## Часть 3: Зависимые поля

### Базовые зависимые поля

```tsx
const citiesByCountry = {
  ru: ['Москва', 'Санкт-Петербург', 'Казань'],
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
        <option value="">Выберите страну</option>
        <option value="ru">Россия</option>
        <option value="us">USA</option>
        <option value="de">Germany</option>
      </select>

      <select {...register('city')} disabled={!country}>
        <option value="">Выберите город</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Сброс зависимого поля при изменении родителя

```tsx
<select
  {...register('country')}
  onChange={(e) => {
    setValue('country', e.target.value)
    setValue('city', '') // Сбросить город
  }}
>
```

---

## Часть 4: Wizard (Multi-step формы)

### Базовый wizard

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
          <h2>Шаг 1: Аккаунт</h2>
          <input {...register('email', { required: true })} placeholder="Email" />
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Пароль"
          />
          <button type="button" onClick={onNext}>
            Далее →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Шаг 2: Профиль</h2>
          <input {...register('firstName', { required: true })} placeholder="Имя" />
          <input {...register('lastName', { required: true })} placeholder="Фамилия" />
          <div>
            <button type="button" onClick={onPrev}>
              ← Назад
            </button>
            <button type="button" onClick={onNext}>
              Далее →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Шаг 3: Подтверждение</h2>
          <textarea {...register('comments')} placeholder="Комментарий" />
          <div>
            <button type="button" onClick={onPrev}>
              ← Назад
            </button>
            <button type="submit">Отправить</button>
          </div>
        </>
      )}
    </form>
  )
}
```

### Wizard с сохранением данных между шагами

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

  // Все данные доступны на любом шаге
  const allData = watch()

  const onNext = async () => {
    const fields = step === 1 ? ['email', 'password'] : ['firstName', 'lastName']
    const isValid = await trigger(fields)
    if (isValid) setStep(step + 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Шаг {step} из 3</div>

      {/* Рендеринг шагов */}

      <pre>{JSON.stringify(allData, null, 2)}</pre>
    </form>
  )
}
```

---

## Полный пример: Форма заказа

```tsx
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  // Шаг 1: Контактная информация
  contactMethod: z.enum(['email', 'phone']),
  email: z.string().email().optional(),
  phone: z.string().optional(),

  // Шаг 2: Товары
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(1),
        price: z.number().positive(),
      })
    )
    .min(1, 'Добавьте хотя бы один товар'),

  // Шаг 3: Доставка
  address: z.object({
    city: z.string().min(1),
    street: z.string().min(1),
    zip: z.string().regex(/^\d{5}$/, 'Неверный индекс'),
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
      <div style={{ marginBottom: '1rem' }}>Шаг {step} из 4</div>

      {/* Шаг 1: Контакты */}
      {step === 1 && (
        <div>
          <h2>Контактная информация</h2>

          <div>
            <label>Способ связи</label>
            <select {...register('contactMethod')}>
              <option value="email">Email</option>
              <option value="phone">Телефон</option>
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
              <label>Телефон</label>
              <input type="tel" {...register('phone')} />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>
          )}

          <button type="button" onClick={onNext}>
            Далее →
          </button>
        </div>
      )}

      {/* Шаг 2: Товары */}
      {step === 2 && (
        <div>
          <h2>Товары</h2>

          {fields.map((field, index) => (
            <div key={field.id} style={{ marginBottom: '1rem' }}>
              <input {...register(`items.${index}.name` as const)} placeholder="Название" />
              <input
                type="number"
                {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                placeholder="Количество"
              />
              <input
                type="number"
                {...register(`items.${index}.price` as const, { valueAsNumber: true })}
                placeholder="Цена"
              />
              <button type="button" onClick={() => remove(index)}>
                ✕
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append({ name: '', quantity: 1, price: 0 })}>
            + Добавить товар
          </button>

          <div>
            <button type="button" onClick={() => setStep(1)}>
              ← Назад
            </button>
            <button type="button" onClick={onNext}>
              Далее →
            </button>
          </div>
        </div>
      )}

      {/* Шаг 3: Адрес */}
      {step === 3 && (
        <div>
          <h2>Адрес доставки</h2>

          <input {...register('address.city')} placeholder="Город" />
          {errors.address?.city && <span className="error">{errors.address.city.message}</span>}

          <input {...register('address.street')} placeholder="Улица" />
          {errors.address?.street && <span className="error">{errors.address.street.message}</span>}

          <input {...register('address.zip')} placeholder="Индекс" />
          {errors.address?.zip && <span className="error">{errors.address.zip.message}</span>}

          <div>
            <button type="button" onClick={() => setStep(2)}>
              ← Назад
            </button>
            <button type="button" onClick={onNext}>
              Далее →
            </button>
          </div>
        </div>
      )}

      {/* Шаг 4: Подтверждение */}
      {step === 4 && (
        <div>
          <h2>Подтверждение</h2>

          <textarea {...register('comments')} placeholder="Комментарий к заказу" />

          <div>
            <button type="button" onClick={() => setStep(3)}>
              ← Назад
            </button>
            <button type="submit">Оформить заказ</button>
          </div>
        </div>
      )}
    </form>
  )
}
```

---

## Частые ошибки новичков

### ❌ Ошибка 1: Ключ не field.id

```tsx
// ❌ Неправильно - индекс может измениться
{
  fields.map((field, index) => (
    <div key={index}>
      <input {...register(`emails.${index}.value`)} />
    </div>
  ))
}

// ✅ Правильно - используем field.id
{
  fields.map((field, index) => (
    <div key={field.id}>
      <input {...register(`emails.${index}.value`)} />
    </div>
  ))
}
```

**Почему это ошибка:** При удалении/добавлении элементов индекс меняется, что вызывает проблемы с
состоянием React.

---

### ❌ Ошибка 2: Нет append/remove

```tsx
// ❌ Неправильно - массив не изменяется
const { fields } = useFieldArray({ control, name: 'emails' })
{
  fields.map(field => <div key={field.id}>{field.value}</div>)
}

// ✅ Правильно - используем методы
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
  + Добавить
</button>
```

**Почему это ошибка:** Без `append`/`remove` массив полей остаётся статичным.

---

### ❌ Ошибка 3: Wizard без trigger

```tsx
// ❌ Неправильно - переход без валидации
const onNext = () => setStep(step + 1)

// ✅ Правильно - валидируем перед переходом
const onNext = async () => {
  const isValid = await trigger(['email', 'password'])
  if (isValid) setStep(step + 1)
}
```

**Почему это ошибка:** Без `trigger` пользователь может перейти на следующий шаг с невалидными
данными.

---

### ❌ Ошибка 4: Условные поля без shouldUnregister

```tsx
// ❌ Неправильно - скрытое поле остаётся в форме
{
  showEmail && <input {...register('email', { required: true })} />
}

// ✅ Правильно - unregister при скрытии
const { register } = useForm({ shouldUnregister: true })
{
  showEmail && <input {...register('email', { required: true })} />
}
```

**Почему это ошибка:** Скрытые поля могут вызывать ошибки валидации, если не unregister.

---

### ❌ Ошибка 5: Зависимые поля без сброса

```tsx
// ❌ Неправильно - город остаётся при смене страны
<select {...register('country')}>
  <option value="ru">Россия</option>
  <option value="us">USA</option>
</select>
<select {...register('city')}>
  <option value="moscow">Москва</option>
  <option value="ny">New York</option>
</select>

// ✅ Правильно - сбрасываем город
<select
  {...register('country')}
  onChange={(e) => {
    setValue('country', e.target.value)
    setValue('city', '') // сброс
  }}
>
```

**Почему это ошибка:** При смене родительского поля зависимое поле должно сбрасываться.

---

## 📚 Дополнительные ресурсы

- [useFieldArray документация](https://react-hook-form.com/docs/usefieldarray)
- [trigger документация](https://react-hook-form.com/docs/useform/trigger)
