import { useState, useEffect } from 'react'
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ============================================
// Задание 8.1: Интеграция с UI-библиотекой — Решение
// ============================================

// Кастомный TextField компонент
function TextField({ label, error, ...props }: any) {
  return (
    <div className="form-group">
      {label && <label htmlFor={props.id}>{label}</label>}
      <input
        style={{
          borderColor: error ? '#dc3545' : '#ddd',
          width: '100%',
        }}
        {...props}
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

// Кастомный Button компонент
function Button({ children, loading, ...props }: any) {
  return (
    <button
      {...props}
      disabled={loading}
      style={{
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? '⏳' : children}
    </button>
  )
}

const uiSchema = z.object({
  name: z.string().min(1, 'Обязательно'),
  email: z.string().email('Неверный email'),
})

type UIForm = z.infer<typeof uiSchema>

export function Task8_1_Solution() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UIForm>({
    resolver: zodResolver(uiSchema),
  })

  const onSubmit = async (data: UIForm) => {
    await new Promise(r => setTimeout(r, 1000))
    console.log('Submitted:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 8.1: Интеграция с UI-библиотекой</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="name" label="Name" error={errors.name?.message} />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              type="email"
              label="Email"
              error={errors.email?.message}
            />
          )}
        />

        <Button type="submit" loading={isSubmitting}>
          Отправить
        </Button>
      </form>
    </div>
  )
}

// ============================================
// Задание 8.2: Кастомные хуки — Решение
// ============================================

function useFormPersist<T extends Record<string, any>>(name: string, defaultValues?: T) {
  const [stored, setStored] = useState<T>(() => {
    const saved = localStorage.getItem(`form-${name}`)
    return saved ? JSON.parse(saved) : defaultValues
  })

  const save = (values: T) => {
    localStorage.setItem(`form-${name}`, JSON.stringify(values))
    setStored(values)
  }

  const clear = () => {
    localStorage.removeItem(`form-${name}`)
    setStored(defaultValues || ({} as T))
  }

  return { stored, save, clear }
}

const persistSchema = z.object({
  title: z.string().min(1, 'Обязательно'),
  content: z.string().min(1, 'Обязательно'),
})

type PersistForm = z.infer<typeof persistSchema>

export function Task8_2_Solution() {
  const { stored, save, clear } = useFormPersist<PersistForm>('article', {
    title: '',
    content: '',
  })

  const { register, handleSubmit, reset, watch } = useForm<PersistForm>({
    resolver: zodResolver(persistSchema),
    defaultValues: stored,
  })

  const values = watch()

  useEffect(() => {
    save(values)
  }, [values])

  const onSubmit = (data: PersistForm) => {
    console.log('Submitted:', data)
    clear()
    reset({ title: '', content: '' })
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 8.2: Кастомные Хуки (useFormPersist)</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label>Title</label>
          <input {...register('title')} />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea {...register('content')} rows={5} style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">Сохранить</button>
          <button
            type="button"
            onClick={clear}
            style={{ background: '#dc3545', color: '#fff', border: 'none' }}
          >
            Очистить localStorage
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          💡 Данные сохраняются в localStorage при каждом изменении. Перезагрузите страницу!
        </p>
      </form>
    </div>
  )
}

// ============================================
// Задание 8.3: FormContext — Решение
// ============================================

function PersonalStep() {
  const { register } = useFormContext()
  return (
    <>
      <div className="form-group">
        <label>First Name</label>
        <input {...register('firstName')} />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input {...register('lastName')} />
      </div>
    </>
  )
}

function ContactStep() {
  const { register } = useFormContext()
  return (
    <>
      <div className="form-group">
        <label>Email</label>
        <input type="email" {...register('email')} />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="tel" {...register('phone')} />
      </div>
    </>
  )
}

export function Task8_3_Solution() {
  const [step, setStep] = useState(1)
  const methods = useForm({
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  })

  const onSubmit = (data: any) => {
    console.log('Submitted:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 8.3: FormContext (разделение форм)</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: step === 1 ? '#646cff' : '#ffffff',
                color: step === 1 ? '#fff' : '#213547',
                border: step === 1 ? '2px solid #646cff' : '1px solid #ddd',
              }}
            >
              Личные
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              style={{
                background: step === 2 ? '#646cff' : '#ffffff',
                color: step === 2 ? '#fff' : '#213547',
                border: step === 2 ? '2px solid #646cff' : '1px solid #ddd',
              }}
            >
              Контакты
            </button>
          </div>

          {step === 1 ? <PersonalStep /> : <ContactStep />}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {step > 1 && (
              <button type="button" onClick={() => setStep(s => s - 1)}>
                ← Назад
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                style={{ background: '#646cff', color: '#fff', border: 'none' }}
              >
                Далее →
              </button>
            ) : (
              <button type="submit">Отправить</button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

// ============================================
// Задание 8.4: localStorage Persistence — Решение
// ============================================

const draftSchema = z.object({
  subject: z.string().min(1, 'Обязательно'),
  body: z.string().min(1, 'Обязательно'),
})

type DraftForm = z.infer<typeof draftSchema>

export function Task8_4_Solution() {
  const { register, handleSubmit, reset, watch } = useForm<DraftForm>({
    resolver: zodResolver(draftSchema),
    defaultValues: () => {
      const saved = localStorage.getItem('email-draft')
      return saved ? JSON.parse(saved) : { subject: '', body: '' }
    },
  })

  const values = watch()

  useEffect(() => {
    localStorage.setItem('email-draft', JSON.stringify(values))
  }, [values])

  const onSubmit = (data: DraftForm) => {
    console.log('Sent:', data)
    localStorage.removeItem('email-draft')
    reset({ subject: '', body: '' })
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 8.4: localStorage Persistence</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label>Subject</label>
          <input {...register('subject')} />
        </div>

        <div className="form-group">
          <label>Body</label>
          <textarea {...register('body')} rows={8} style={{ width: '100%' }} />
        </div>

        <button type="submit">Отправить</button>

        <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          💡 Черновик автоматически сохраняется. Перезагрузите страницу!
        </p>
      </form>
    </div>
  )
}

// ============================================
// Задание 8.5: Финальный проект — Решение
// ============================================

const finalSchema = z
  .object({
    // Step 1: Account
    email: z.string().email('Неверный email'),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirm: z.string(),
    // Step 2: Profile
    firstName: z.string().min(1, 'Обязательно'),
    lastName: z.string().min(1, 'Обязательно'),
    avatar: z.instanceof(FileList).optional(),
    // Step 3: Settings
    newsletter: z.boolean().optional(),
    notifications: z.boolean().optional(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  })

type FinalForm = z.infer<typeof finalSchema>

export function Task8_5_Solution() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState<FinalForm | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FinalForm>({
    resolver: zodResolver(finalSchema),
    mode: 'onChange',
  })

  const onNext = async () => {
    const fields =
      step === 1
        ? (['email', 'password', 'confirm'] as const)
        : step === 2
          ? (['firstName', 'lastName'] as const)
          : []
    const valid = await trigger(fields)
    if (valid) setStep(s => s + 1)
  }

  const onPrev = () => setStep(s => s - 1)

  const onSubmit = (data: FinalForm) => {
    setSubmitted(data)
    console.log('Registered:', data)
  }

  const avatar = watch('avatar')

  useEffect(() => {
    if (avatar?.[0]) {
      const url = URL.createObjectURL(avatar[0])
      setAvatarPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [avatar])

  if (submitted) {
    return (
      <div className="exercise-container">
        <h2>🎉 Регистрация завершена!</h2>
        <div
          style={{
            padding: '1.5rem',
            background: '#d1e7dd',
            borderRadius: '8px',
            marginTop: '1rem',
          }}
        >
          <h3>Данные формы:</h3>
          <pre style={{ marginTop: '1rem', overflow: 'auto' }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
        <button
          onClick={() => {
            setSubmitted(null)
            setStep(1)
          }}
          style={{ marginTop: '1rem' }}
        >
          Начать заново
        </button>
      </div>
    )
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 8.5: Финальный Проект — Регистрация</h2>

      <div
        style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          background: '#f0f0ff',
          borderRadius: '4px',
          display: 'inline-block',
        }}
      >
        Шаг {step} из 3
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '450px' }}>
        {step === 1 && (
          <>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" {...register('email')} />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input type="password" {...register('password')} />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input type="password" {...register('confirm')} />
              {errors.confirm && <span className="error">{errors.confirm.message}</span>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-group">
              <label>First Name *</label>
              <input {...register('firstName')} />
              {errors.firstName && <span className="error">{errors.firstName.message}</span>}
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input {...register('lastName')} />
              {errors.lastName && <span className="error">{errors.lastName.message}</span>}
            </div>

            <div className="form-group">
              <label>Avatar</label>
              <input
                type="file"
                accept="image/*"
                {...register('avatar')}
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setAvatarPreview(URL.createObjectURL(file))
                  }
                }}
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  style={{ maxWidth: '150px', marginTop: '0.5rem', borderRadius: '8px' }}
                />
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" {...register('newsletter')} />
                Подписаться на рассылку
              </label>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={watch('notifications')}
                  onChange={e => setValue('notifications', e.target.checked)}
                />
                Уведомления
              </label>
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
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
            <button type="submit">Завершить регистрацию</button>
          )}
        </div>
      </form>
    </div>
  )
}
