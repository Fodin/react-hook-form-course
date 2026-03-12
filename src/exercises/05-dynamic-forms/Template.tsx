import { useForm, useFieldArray } from 'react-hook-form'

// ============================================
// Задание 5.1: useFieldArray
// ============================================

export function Task5_1_Template() {
  // TODO: Инициализируйте useForm с defaultValues: { emails: [{ value: '' }] }
  // TODO: Инициализируйте useFieldArray({ control, name: 'emails' })
  
  const { control, register, handleSubmit } = useForm()
  // const { fields, append, remove } = useFieldArray(...)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 5.1: useFieldArray</h2>
      
      {/* TODO: Реализуйте форму с динамическими полями email */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Минимум одно поле email</li>
          <li>Кнопка "+ Добавить" добавляет новое поле</li>
          <li>Кнопка "✕" удаляет конкретное поле</li>
          <li>Валидация email формата</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 5.2: Условные поля
// ============================================

export function Task5_2_Template() {
  // TODO: Используйте watch для получения contactMethod
  // TODO: Отображайте поле в зависимости от выбора
  
  const { register, handleSubmit } = useForm()
  // const contactMethod = watch('contactMethod')

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 5.2: Условные поля</h2>
      
      {/* TODO: Select для способа связи + условные поля */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Выбор: email / телефон / telegram</li>
          <li>Отображается только выбранное поле</li>
          <li>Валидация только видимого поля</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 5.3: Зависимые поля
// ============================================

export function Task5_3_Template() {
  // TODO: Используйте watch для получения country
  // TODO: При смене страны сбрасывайте город через setValue
  
  const { register, handleSubmit } = useForm()
  // const country = watch('country')
  // const cities = country ? citiesByCountry[country] : []

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 5.3: Зависимые поля</h2>
      
      {/* TODO: Select страны и зависимый select городов */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Выбор страны (Россия, USA, Германия)</li>
          <li>Города зависят от выбранной страны</li>
          <li>При смене страны город сбрасывается</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 5.4: Wizard (multi-step)
// ============================================

export function Task5_4_Template() {
  // TODO: Используйте useState для step
  // TODO: Используйте trigger для валидации перед переходом
  
  const { register, handleSubmit } = useForm()
  // const [step, setStep] = useState(1)
  // const onNext = async () => { const valid = await trigger(...); if (valid) setStep(s => s + 1) }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 5.4: Wizard (multi-step)</h2>
      
      {/* TODO: 3 шага формы с навигацией */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Шаги:</h3>
        <ol>
          <li>Имя и Email</li>
          <li>Адрес доставки</li>
          <li>Комментарий к заказу</li>
        </ol>
        <h3>Навигация:</h3>
        <ul>
          <li>Кнопка "Назад" (кроме шага 1)</li>
          <li>Кнопка "Далее" (проверяет валидацию)</li>
          <li>Кнопка "Отправить" (на шаге 3)</li>
        </ul>
      </div>
    </div>
  )
}
