import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ============================================
// Задание 4.1: Controller — Решение
// ============================================

const categorySchema = z.object({
  name: z.string().min(1, 'Обязательно'),
  category: z.string().min(1, 'Выберите категорию'),
})

type CategoryForm = z.infer<typeof categorySchema>

const categories = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'clothing', label: 'Одежда' },
  { value: 'books', label: 'Книги' },
  { value: 'home', label: 'Дом' },
]

function CustomSelect({ value, onChange, options, placeholder }: any) {
  return (
    <div style={{ position: 'relative' }}>
      <select 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value || null)}
        style={{ width: '100%', padding: '0.5rem' }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export function Task4_1_Solution() {
  const { 
    register, 
    control,
    handleSubmit, 
    formState: { errors } 
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  })

  const onSubmit = (data: CategoryForm) => {
    console.log('Category:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 4.1: Controller</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Название товара *</label>
          <input type="text" {...register('name')} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Категория *</label>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomSelect
                {...field}
                options={categories}
                placeholder="Выберите категорию"
              />
            )}
          />
          {errors.category && <span className="error">{errors.category.message}</span>}
        </div>
        
        <button type="submit">Сохранить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 4.2: Radio и Select — Решение
// ============================================

const profileSchema = z.object({
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Выберите пол' }),
  country: z.string().min(1, 'Выберите страну'),
})

type ProfileForm = z.infer<typeof profileSchema>

export function Task4_2_Solution() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 4.2: Radio и Select</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Пол *</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" value="male" {...register('gender')} />
              Мужской
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" value="female" {...register('gender')} />
              Женский
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" value="other" {...register('gender')} />
              Другой
            </label>
          </div>
          {errors.gender && <span className="error">{errors.gender.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Страна *</label>
          <select {...register('country')}>
            <option value="">Выберите страну</option>
            <option value="us">USA</option>
            <option value="ru">Russia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="uk">UK</option>
          </select>
          {errors.country && <span className="error">{errors.country.message}</span>}
        </div>
        
        <button type="submit">Сохранить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 4.3: Checkbox — Решение
// ============================================

const skillsSchema = z.object({
  agree: z.boolean().refine(v => v === true, 'Необходимо согласие'),
  skills: z.array(z.string()).min(1, 'Выберите хотя бы один навык'),
})

type SkillsForm = z.infer<typeof skillsSchema>

const allSkills = ['React', 'Vue', 'Angular', 'Svelte']

export function Task4_3_Solution() {
  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    formState: { errors } 
  } = useForm<SkillsForm>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: [],
    },
  })

  const selectedSkills = watch('skills', [])

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setValue('skills', [...selectedSkills, skill])
    } else {
      setValue('skills', selectedSkills.filter(s => s !== skill))
    }
  }

  const onSubmit = (data: SkillsForm) => {
    console.log('Skills:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 4.3: Checkbox</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="checkbox" 
              {...register('agree')} 
            />
            Я согласен с правилами обработки данных *
          </label>
          {errors.agree && <span className="error">{errors.agree.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Навыки *</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {allSkills.map((skill) => (
              <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={(e) => handleSkillChange(skill, e.target.checked)}
                />
                {skill}
              </label>
            ))}
          </div>
          {errors.skills && <span className="error">{errors.skills.message}</span>}
        </div>
        
        <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
          Выбрано: {selectedSkills.join(', ') || 'ничего'}
        </div>
        
        <button type="submit" style={{ marginTop: '1rem' }}>Сохранить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 4.4: File Upload — Решение
// ============================================

const fileSchema = z.object({
  avatar: z.instanceof(FileList)
    .refine((files) => files.length > 0, 'Выберите файл')
    .refine((files) => files[0]?.size < 2000000, 'Максимум 2MB')
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type),
      'Только JPG, PNG, GIF'
    ),
})

type FileForm = z.infer<typeof fileSchema>

export function Task4_4_Solution() {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<FileForm>({
    resolver: zodResolver(fileSchema),
  })

  const avatarFile = watch('avatar')
  const [preview, setPreview] = useState<string | null>(null)

  const onSubmit = (data: FileForm) => {
    console.log('File:', data.avatar[0])
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 4.4: File Upload</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Аватар *</label>
          <input 
            type="file" 
            accept="image/jpeg,image/png,image/gif"
            {...register('avatar')}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setPreview(URL.createObjectURL(file))
              }
            }}
          />
          {errors.avatar && <span className="error">{errors.avatar.message}</span>}
        </div>
        
        {preview && (
          <div style={{ marginTop: '1rem' }}>
            <img 
              src={preview} 
              alt="Preview" 
              style={{ maxWidth: '200px', borderRadius: '8px' }} 
            />
          </div>
        )}
        
        <button type="submit" style={{ marginTop: '1rem' }}>Загрузить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 4.5: Дата и время — Решение
// ============================================

const dateSchema = z.object({
  birthDate: z.string().min(1, 'Выберите дату'),
  appointment: z.string().min(1, 'Выберите время'),
})

type DateForm = z.infer<typeof dateSchema>

export function Task4_5_Solution() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<DateForm>({
    resolver: zodResolver(dateSchema),
  })

  const onSubmit = (data: DateForm) => {
    console.log('Dates:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 4.5: Дата и время</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="birthDate">Дата рождения *</label>
          <input 
            id="birthDate"
            type="date" 
            {...register('birthDate')} 
          />
          {errors.birthDate && <span className="error">{errors.birthDate.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="appointment">Запись на встречу *</label>
          <input 
            id="appointment"
            type="datetime-local" 
            {...register('appointment')} 
          />
          {errors.appointment && <span className="error">{errors.appointment.message}</span>}
        </div>
        
        <button type="submit">Записаться</button>
      </form>
    </div>
  )
}
