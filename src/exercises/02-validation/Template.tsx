import { useForm } from 'react-hook-form'

// ============================================
// Задание 2.1: Built-in валидация
// ============================================

export function Task2_1_Template() {
  // TODO: Добавьте правила валидации: required, minLength, maxLength, min, max
  
  return (
    <div className="exercise-container">
      <h2>Задание 2.1: Built-in валидация</h2>
      
      {/* Поля: username (3-20), email, age (18-120), password (6+) */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>username: 3-20 символов, обязательно</li>
          <li>email: email формат, обязательно</li>
          <li>age: 18-120, обязательно</li>
          <li>password: минимум 6 символов, обязательно</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 2.2: Pattern валидация
// ============================================

export function Task2_2_Template() {
  // TODO: Используйте pattern для валидации полей
  
  return (
    <div className="exercise-container">
      <h2>Задание 2.2: Pattern валидация</h2>
      
      {/* Поля: phone, website, hexColor, slug */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Паттерны:</h3>
        <ul>
          <li>phone: +7 XXX XXX-XX-XX</li>
          <li>website: https://...</li>
          <li>hexColor: #FFF или #FFFFFF</li>
          <li>slug: only-lowercase-dashes</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 2.3: Custom валидация
// ============================================

export function Task2_3_Template() {
  // TODO: Используйте validate объект для парольной валидации
  
  return (
    <div className="exercise-container">
      <h2>Задание 2.3: Custom валидация пароля</h2>
      
      {/* Пароль с правилами: 8+ символов, заглавная, цифра, спецсимвол */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования к паролю:</h3>
        <ul>
          <li>Минимум 8 символов</li>
          <li>Хотя бы одна заглавная буква</li>
          <li>Хотя бы одна цифра</li>
          <li>Хотя бы один специальный символ</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 2.4: Cross-field валидация
// ============================================

export function Task2_4_Template() {
  // TODO: Используйте watch для получения значения newPassword
  // TODO: Валидируйте confirmPassword против newPassword
  
  return (
    <div className="exercise-container">
      <h2>Задание 2.4: Cross-field валидация</h2>
      
      {/* Поля: currentPassword, newPassword, confirmPassword, email */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>confirmPassword должен совпадать с newPassword</li>
          <li>newPassword не должен совпадать с currentPassword</li>
        </ul>
      </div>
    </div>
  )
}
