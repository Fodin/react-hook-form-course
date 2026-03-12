import { useForm } from 'react-hook-form'

// ============================================
// Задание 8.1: Интеграция с UI-библиотекой
// ============================================

export function Task8_1_Template() {
  // TODO: Создайте кастомные компоненты TextField и Button
  // TODO: Используйте Controller для интеграции
  
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 8.1: Интеграция с UI-библиотекой</h2>
      
      {/* TODO: Форма с кастомными компонентами */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>TextField с label и error</li>
          <li>Button с состоянием loading</li>
          <li>Controller для интеграции</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 8.2: Кастомные хуки
// ============================================

export function Task8_2_Template() {
  // TODO: Создайте хук useFormPersist
  // TODO: Используйте хук в форме
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 8.2: Кастомные Хуки</h2>
      
      {/* TODO: Форма с useFormPersist */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Хук useFormPersist(name, defaultValues)</li>
          <li>Возвращает stored, save, clear</li>
          <li>Сохранение в localStorage</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 8.3: FormContext
// ============================================

export function Task8_3_Template() {
  // TODO: Используйте FormProvider и useFormContext
  
  const { handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 8.3: FormContext</h2>
      
      {/* TODO: Форма с FormProvider и подкомпонентами */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>FormProvider для формы</li>
          <li>PersonalStep с firstName, lastName</li>
          <li>ContactStep с email, phone</li>
          <li>Навигация между шагами</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 8.4: localStorage Persistence
// ============================================

export function Task8_4_Template() {
  // TODO: Сохраняйте данные формы в localStorage
  // TODO: Восстанавливайте при загрузке
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 8.4: localStorage Persistence</h2>
      
      {/* TODO: Форма черновика с автосохранением */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Поля: subject, body</li>
          <li>Автосохранение при изменении</li>
          <li>Восстановление при загрузке</li>
          <li>Очистка после отправки</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 8.5: Финальный проект
// ============================================

export function Task8_5_Template() {
  // TODO: Создайте форму регистрации в 3 шага
  // TODO: Используйте все изученные техники
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 8.5: Финальный Проект</h2>
      
      {/* TODO: Многошаговая форма регистрации */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Шаги:</h3>
        <ol>
          <li>Аккаунт (email, password, confirm)</li>
          <li>Профиль (firstName, lastName, avatar)</li>
          <li>Настройки (newsletter, notifications)</li>
        </ol>
        <h3>Требования:</h3>
        <ul>
          <li>Валидация перед переходом</li>
          <li>Сохранение данных между шагами</li>
          <li>Предпросмотр данных в конце</li>
        </ul>
      </div>
    </div>
  )
}
