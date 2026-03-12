import { useForm } from 'react-hook-form'

// ============================================
// Задание 6.1: Dirty / Touched
// ============================================

export function Task6_1_Template() {
  // TODO: Получите dirtyFields, touchedFields, isDirty из formState
  
  const { register } = useForm()

  return (
    <div className="exercise-container">
      <h2>Задание 6.1: Dirty / Touched States</h2>
      
      {/* TODO: Отображайте статусы для каждого поля */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Dirty статус для каждого поля (✅/❌)</li>
          <li>Touched статус для каждого поля (✅/❌)</li>
          <li>Общий isDirty статус формы</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 6.2: Reset и default values
// ============================================

export function Task6_2_Template() {
  // TODO: Инициализируйте useForm с defaultValues
  // TODO: Используйте reset для сброса и заполнения
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 6.2: Reset и Default Values</h2>
      
      {/* TODO: Форма с кнопками Заполнить и Сбросить */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Поля: username, email, role</li>
          <li>Кнопка "Заполнить" — тестовые данные</li>
          <li>Кнопка "Сбросить" — к начальным значениям</li>
          <li>Отображение последних отправленных данных</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 6.3: Focus management
// ============================================

export function Task6_3_Template() {
  // TODO: Используйте useEffect для фокуса на первом ошибочном поле
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 6.3: Focus Management</h2>
      
      {/* TODO: Форма с валидацией и авто-фокусом на ошибке */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Поля: email, password, confirm</li>
          <li>При ошибке фокус на первом ошибочном поле</li>
          <li>Сообщения об ошибках</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 6.4: Accessibility (ARIA)
// ============================================

export function Task6_4_Template() {
  // TODO: Добавьте aria-invalid, aria-describedby, role="alert"
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 6.4: Accessibility (ARIA)</h2>
      
      {/* TODO: Форма с ARIA-атрибутами */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>aria-invalid для полей с ошибками</li>
          <li>aria-describedby для связи с ошибками</li>
          <li>role="alert" для сообщений об ошибках</li>
          <li>noValidate для формы</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 6.5: Performance
// ============================================

export function Task6_5_Template() {
  // TODO: Используйте watch и считайте рендеры
  
  const { register, watch } = useForm()
  const values = watch()

  return (
    <div className="exercise-container">
      <h2>Задание 6.5: Performance Оптимизация</h2>
      
      {/* TODO: Форма со счётчиком рендеров */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Поле text с watch</li>
          <li>Счётчик рендеров формы</li>
          <li>Демонстрация ре-рендеров от watch</li>
        </ul>
      </div>
    </div>
  )
}
