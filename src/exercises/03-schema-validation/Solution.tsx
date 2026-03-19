import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { yupResolver } from '@hookform/resolvers/yup'
import { z } from 'zod'

// ============================================
// Задание 3.1: Базовая валидация с Zod — Решение
// ============================================

const registrationSchema = z
  .object({
    email: z.string().email('Неверный формат email'),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirmPassword: z.string(),
    age: z.number().min(18, 'Минимум 18 лет').max(120, 'Максимум 120 лет'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type RegistrationForm = z.infer<typeof registrationSchema>

export function Task3_1_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = (data: RegistrationForm) => {
    console.log('Registered:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 3.1: Базовая валидация с Zod</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль *</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтверждение пароля *</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">Возраст *</label>
          <input id="age" type="number" {...register('age', { valueAsNumber: true })} />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 3.2: Валидация с Yup — Решение
// ============================================

const registrationYupSchema = yup.object({
  email: yup.string().email('Неверный формат email').required('Обязательно'),
  password: yup.string().min(8, 'Минимум 8 символов').required('Обязательно'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательно'),
  age: yup.number().min(18, 'Минимум 18 лет').max(120, 'Максимум 120 лет').required('Обязательно'),
})

type RegistrationYupForm = yup.InferType<typeof registrationYupSchema>

export function Task3_2_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationYupForm>({
    resolver: yupResolver(registrationYupSchema),
  })

  const onSubmit = (data: RegistrationYupForm) => {
    console.log('Registered:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 3.2: Валидация с Yup</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль *</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтверждение пароля *</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">Возраст *</label>
          <input id="age" type="number" {...register('age', { valueAsNumber: true })} />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>

      <div
        style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}
      >
        <h3>📊 Сравнение Zod vs Yup:</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <strong>Zod:</strong> TypeScript-first, функциональный API, быстрее
          </li>
          <li>
            <strong>Yup:</strong> Цепочечный API, больше сообщество, проверен временем
          </li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 3.3: Сложные схемы — Решение
// ============================================

const contactSchema = z.object({
  type: z.enum(['email', 'phone', 'telegram']),
  value: z.string().min(1, 'Обязательно'),
})

const profileSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, 'Обязательно'),
    lastName: z.string().min(1, 'Обязательно'),
    age: z.number().min(18, 'Минимум 18 лет'),
  }),
  contacts: z.array(contactSchema).min(1, 'Минимум один контакт'),
  skills: z.array(z.string()).min(1, 'Минимум один навык'),
  role: z.enum(['developer', 'designer', 'manager']),
  bio: z.string().max(500, 'Максимум 500 символов').optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export function Task3_3_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      contacts: [{ type: 'email', value: '' }],
      skills: [''],
    },
  })

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 3.3: Сложные схемы</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
        <fieldset
          style={{
            marginBottom: '1.5rem',
            border: '1px solid #333',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <legend style={{ padding: '0 0.5rem', color: '#646cff' }}>Личная информация</legend>

          <div className="form-group">
            <label>Имя *</label>
            <input type="text" {...register('personalInfo.firstName')} />
            {errors.personalInfo?.firstName && (
              <span className="error">{errors.personalInfo.firstName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Фамилия *</label>
            <input type="text" {...register('personalInfo.lastName')} />
            {errors.personalInfo?.lastName && (
              <span className="error">{errors.personalInfo.lastName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Возраст *</label>
            <input type="number" {...register('personalInfo.age', { valueAsNumber: true })} />
            {errors.personalInfo?.age && (
              <span className="error">{errors.personalInfo.age.message}</span>
            )}
          </div>
        </fieldset>

        <fieldset
          style={{
            marginBottom: '1.5rem',
            border: '1px solid #333',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <legend style={{ padding: '0 0.5rem', color: '#646cff' }}>Контакты</legend>

          <div className="form-group">
            <label>Тип контакта *</label>
            <select {...register('contacts.0.type')}>
              <option value="email">Email</option>
              <option value="phone">Телефон</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>

          <div className="form-group">
            <label>Значение *</label>
            <input type="text" {...register('contacts.0.value')} />
            {errors.contacts?.[0]?.value && (
              <span className="error">{errors.contacts[0].value.message}</span>
            )}
          </div>
        </fieldset>

        <fieldset
          style={{
            marginBottom: '1.5rem',
            border: '1px solid #333',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <legend style={{ padding: '0 0.5rem', color: '#646cff' }}>Навыки</legend>

          <div className="form-group">
            <label>Навык *</label>
            <input
              type="text"
              {...register('skills.0')}
              placeholder="Например: React, TypeScript"
            />
            {errors.skills?.[0] && <span className="error">{errors.skills[0]?.message}</span>}
          </div>
        </fieldset>

        <div className="form-group">
          <label>Роль *</label>
          <select {...register('role')}>
            <option value="developer">Разработчик</option>
            <option value="designer">Дизайнер</option>
            <option value="manager">Менеджер</option>
          </select>
          {errors.role && <span className="error">{errors.role.message}</span>}
        </div>

        <div className="form-group">
          <label>О себе</label>
          <textarea
            {...register('bio')}
            rows={4}
            style={{ width: '100%' }}
            placeholder="Расскажите о себе..."
          />
          {errors.bio && <span className="error">{errors.bio.message}</span>}
        </div>

        <button type="submit">Сохранить профиль</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 3.4: refine и кастомные сообщения — Решение
// ============================================

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Обязательно'),
    newPassword: z
      .string()
      .min(8, 'Минимум 8 символов')
      .regex(/[A-Z]/, 'Должна быть заглавная буква')
      .regex(/\d/, 'Должна быть цифра'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
  .refine(data => data.newPassword !== data.currentPassword, {
    message: 'Новый пароль должен отличаться от текущего',
    path: ['newPassword'],
  })

type PasswordChangeForm = z.infer<typeof passwordChangeSchema>

export function Task3_4_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeForm>({
    resolver: zodResolver(passwordChangeSchema),
  })

  const onSubmit = (data: PasswordChangeForm) => {
    console.log('Change password:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 3.4: refine и кастомные сообщения</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="currentPassword">Текущий пароль *</label>
          <input id="currentPassword" type="password" {...register('currentPassword')} />
          {errors.currentPassword && (
            <span className="error">{errors.currentPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Новый пароль *</label>
          <input id="newPassword" type="password" {...register('newPassword')} />
          {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтверждение пароля *</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit">Сменить пароль</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 3.5: Сравнение — Решение (комментарии)
// ============================================

// ============================================
// Задание 3.6: superRefine и discriminatedUnion — Решение
// ============================================

const paymentSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('card'),
    cardNumber: z
      .string()
      .min(1, 'Обязательно')
      .regex(/^\d{16}$/, 'Номер карты: 16 цифр'),
    expiry: z
      .string()
      .min(1, 'Обязательно')
      .regex(/^\d{2}\/\d{2}$/, 'Формат: MM/YY'),
    cvv: z
      .string()
      .min(1, 'Обязательно')
      .regex(/^\d{3}$/, 'CVV: 3 цифры'),
  }),
  z.object({
    method: z.literal('bank'),
    accountNumber: z.string().min(1, 'Обязательно').min(20, 'Минимум 20 символов'),
    bankName: z.string().min(1, 'Обязательно'),
  }),
  z.object({
    method: z.literal('crypto'),
    walletAddress: z.string().min(1, 'Обязательно').min(26, 'Минимум 26 символов'),
    network: z.enum(['ethereum', 'bitcoin', 'solana'], {
      errorMap: () => ({ message: 'Выберите сеть' }),
    }),
  }),
])

const orderSchema = z
  .object({
    amount: z.number().min(1, 'Минимум 1'),
    payment: paymentSchema,
  })
  .superRefine((data, ctx) => {
    if (data.payment.method === 'crypto' && data.amount < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Минимальная сумма для крипто — 10',
        path: ['amount'],
      })
    }
    if (data.payment.method === 'card' && data.amount > 100000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Максимум для карты — 100 000',
        path: ['amount'],
      })
    }
  })

type OrderForm = z.infer<typeof orderSchema>

export function Task3_6_Solution() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      amount: 0,
      payment: { method: 'card', cardNumber: '', expiry: '', cvv: '' },
    },
  })

  const method = watch('payment.method')

  const onSubmit = (data: OrderForm) => {
    console.log('Order:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 3.6: superRefine и discriminatedUnion</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '450px' }}>
        <div className="form-group">
          <label>Сумма *</label>
          <input type="number" {...register('amount', { valueAsNumber: true })} />
          {errors.amount && <span className="error">{errors.amount.message}</span>}
        </div>

        <div className="form-group">
          <label>Способ оплаты *</label>
          <select {...register('payment.method')}>
            <option value="card">Карта</option>
            <option value="bank">Банковский перевод</option>
            <option value="crypto">Криптовалюта</option>
          </select>
        </div>

        {method === 'card' && (
          <>
            <div className="form-group">
              <label>Номер карты *</label>
              <input {...register('payment.cardNumber')} placeholder="1234567890123456" />
              {errors.payment && 'cardNumber' in errors.payment && (
                <span className="error">{(errors.payment as any).cardNumber?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Срок действия *</label>
              <input {...register('payment.expiry')} placeholder="MM/YY" />
              {errors.payment && 'expiry' in errors.payment && (
                <span className="error">{(errors.payment as any).expiry?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>CVV *</label>
              <input {...register('payment.cvv')} placeholder="123" />
              {errors.payment && 'cvv' in errors.payment && (
                <span className="error">{(errors.payment as any).cvv?.message}</span>
              )}
            </div>
          </>
        )}

        {method === 'bank' && (
          <>
            <div className="form-group">
              <label>Номер счёта *</label>
              <input {...register('payment.accountNumber')} />
              {errors.payment && 'accountNumber' in errors.payment && (
                <span className="error">{(errors.payment as any).accountNumber?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Название банка *</label>
              <input {...register('payment.bankName')} />
              {errors.payment && 'bankName' in errors.payment && (
                <span className="error">{(errors.payment as any).bankName?.message}</span>
              )}
            </div>
          </>
        )}

        {method === 'crypto' && (
          <>
            <div className="form-group">
              <label>Адрес кошелька *</label>
              <input {...register('payment.walletAddress')} />
              {errors.payment && 'walletAddress' in errors.payment && (
                <span className="error">{(errors.payment as any).walletAddress?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Сеть *</label>
              <select {...register('payment.network')}>
                <option value="">Выберите...</option>
                <option value="ethereum">Ethereum</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="solana">Solana</option>
              </select>
              {errors.payment && 'network' in errors.payment && (
                <span className="error">{(errors.payment as any).network?.message}</span>
              )}
            </div>
          </>
        )}

        <button type="submit">Оплатить</button>
      </form>
    </div>
  )
}

export function Task3_5_Solution() {
  return (
    <div className="exercise-container">
      <h2>✅ Задание 3.5: Сравнение Zod vs Yup</h2>

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          lineHeight: 1.8,
        }}
      >
        <h3>📊 Мой анализ:</h3>

        <h4 style={{ marginTop: '1.5rem', color: '#646cff' }}>1. Что понравилось в Zod:</h4>
        <ul>
          <li>TypeScript-first подход — отличная типизация из коробки</li>
          <li>Функциональный API — более предсказуемый и композируемый</li>
          <li>Лучшая производительность</li>
          <li>
            Метод <code>.refine()</code> для сложной валидации
          </li>
        </ul>

        <h4 style={{ marginTop: '1.5rem', color: '#646cff' }}>2. Что понравилось в Yup:</h4>
        <ul>
          <li>Цепочечный API — очень выразительный</li>
          <li>Большое сообщество и много примеров</li>
          <li>Проверен временем — используется давно</li>
          <li>
            <code>.oneOf()</code> и <code>.notOneOf()</code> для enum-подобной валидации
          </li>
        </ul>

        <h4 style={{ marginTop: '1.5rem', color: '#646cff' }}>3. Выбор для проекта:</h4>
        <p>
          <strong>Для нового TypeScript проекта:</strong> Zod — лучшая типизация и современный API.
        </p>
        <p>
          <strong>Для JavaScript проекта или с большой кодовой базой:</strong> Yup — стабильный
          выбор с большим сообществом.
        </p>
      </div>
    </div>
  )
}
