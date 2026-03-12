import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ============================================
// Задание 5.1: useFieldArray — Решение
// ============================================

const emailsSchema = z.object({
  emails: z.array(z.object({
    value: z.string().email('Неверный email'),
  })).min(1, 'Минимум один email'),
})

type EmailsForm = z.infer<typeof emailsSchema>

export function Task5_1_Solution() {
  const { control, register, handleSubmit, formState: { errors } } = useForm<EmailsForm>({
    resolver: zodResolver(emailsSchema),
    defaultValues: { emails: [{ value: '' }] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'emails' })

  const onSubmit = (data: EmailsForm) => {
    console.log('Emails:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 5.1: useFieldArray</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
            <input
              {...register(`emails.${index}.value` as const)}
              placeholder="Email"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 0.75rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
            {errors.emails?.[index]?.value && (
              <span className="error">{errors.emails[index]?.value?.message}</span>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => append({ value: '' })}
            style={{
              background: '#28a745',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            + Добавить
          </button>
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
  )
}

// ============================================
// Задание 5.2: Условные поля — Решение
// ============================================

type ContactMethod = 'email' | 'phone' | 'telegram'

const conditionalSchema = z.object({
  contactMethod: z.enum(['email', 'phone', 'telegram']),
  email: z.string().email('Неверный email').optional(),
  phone: z.string().min(10, 'Минимум 10 цифр').optional(),
  telegram: z.string().min(1, 'Обязательно').optional(),
}).refine((data) => {
  if (data.contactMethod === 'email') return !!data.email
  if (data.contactMethod === 'phone') return !!data.phone
  return !!data.telegram
}, { message: 'Заполните контакт', path: ['email'] })

type ConditionalForm = z.infer<typeof conditionalSchema>

export function Task5_2_Solution() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ConditionalForm>({
    resolver: zodResolver(conditionalSchema),
  })

  const method = watch('contactMethod')

  const onSubmit = (data: ConditionalForm) => {
    console.log('Contact:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 5.2: Условные поля</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Способ связи *</label>
          <select {...register('contactMethod')}>
            <option value="">Выберите способ</option>
            <option value="email">Email</option>
            <option value="phone">Телефон</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>

        {method === 'email' && (
          <div className="form-group">
            <label>Email *</label>
            <input type="email" {...register('email')} />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
        )}

        {method === 'phone' && (
          <div className="form-group">
            <label>Телефон *</label>
            <input type="tel" {...register('phone')} placeholder="+7 999 123 45 67" />
            {errors.phone && <span className="error">{errors.phone.message}</span>}
          </div>
        )}

        {method === 'telegram' && (
          <div className="form-group">
            <label>Telegram *</label>
            <input type="text" {...register('telegram')} placeholder="@username" />
            {errors.telegram && <span className="error">{errors.telegram.message}</span>}
          </div>
        )}

        <button type="submit">Отправить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 5.3: Зависимые поля — Решение
// ============================================

const citiesByCountry: Record<string, string[]> = {
  ru: ['Москва', 'Санкт-Петербург', 'Казань'],
  us: ['New York', 'Los Angeles', 'Chicago'],
  de: ['Berlin', 'Munich', 'Hamburg'],
}

const dependentSchema = z.object({
  country: z.string().min(1, 'Выберите страну'),
  city: z.string().min(1, 'Выберите город'),
})

type DependentForm = z.infer<typeof dependentSchema>

export function Task5_3_Solution() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DependentForm>({
    resolver: zodResolver(dependentSchema),
  })

  const country = watch('country')
  const cities = country ? citiesByCountry[country] || [] : []

  const onSubmit = (data: DependentForm) => {
    console.log('Address:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 5.3: Зависимые поля</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Страна *</label>
          <select
            {...register('country')}
            onChange={(e) => {
              setValue('country', e.target.value)
              setValue('city', '')
            }}
          >
            <option value="">Выберите страну</option>
            <option value="ru">Россия</option>
            <option value="us">USA</option>
            <option value="de">Germany</option>
          </select>
          {errors.country && <span className="error">{errors.country.message}</span>}
        </div>

        <div className="form-group">
          <label>Город *</label>
          <select {...register('city')} disabled={!country}>
            <option value="">Выберите город</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span className="error">{errors.city.message}</span>}
        </div>

        <button type="submit" disabled={!country}>Отправить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 5.4: Wizard (multi-step) — Решение
// ============================================

const wizardSchema = z.object({
  name: z.string().min(1, 'Обязательно'),
  email: z.string().email('Неверный email'),
  address: z.string().min(1, 'Обязательно'),
  comments: z.string().optional(),
})

type WizardForm = z.infer<typeof wizardSchema>

export function Task5_4_Solution() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<WizardForm>()

  const onNext = async () => {
    const fields = step === 1
      ? ['name' as const, 'email' as const]
      : ['address' as const]
    const isValid = await trigger(fields)
    if (isValid) setStep((s) => s + 1)
  }

  const onPrev = () => setStep((s) => s - 1)

  const onSubmit = (data: WizardForm) => {
    console.log('Order:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 5.4: Wizard (multi-step)</h2>

      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f0ff', borderRadius: '4px', display: 'inline-block' }}>
        Шаг {step} из 3
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        {step === 1 && (
          <>
            <div className="form-group">
              <label>Имя *</label>
              <input {...register('name')} />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" {...register('email')} />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="form-group">
            <label>Адрес доставки *</label>
            <input {...register('address')} placeholder="Город, улица, дом" />
            {errors.address && <span className="error">{errors.address.message}</span>}
          </div>
        )}

        {step === 3 && (
          <div className="form-group">
            <label>Комментарий к заказу</label>
            <textarea {...register('comments')} rows={4} placeholder="Пожелания к доставке..." />
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {step > 1 && (
            <button type="button" onClick={onPrev}>
              ← Назад
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={onNext}
              style={{ background: '#646cff', color: '#fff', border: 'none' }}
            >
              Далее →
            </button>
          ) : (
            <button type="submit">Оформить заказ</button>
          )}
        </div>
      </form>
    </div>
  )
}
