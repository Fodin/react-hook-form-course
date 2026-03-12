import { Controller, useForm } from 'react-hook-form'

// ============================================
// Задание 4.1: Controller
// ============================================

export function Task4_1_Template() {
  // TODO: Используйте Controller для кастомного селекта
  
  const { control } = useForm()
  
  return (
    <div className="exercise-container">
      <h2>Задание 4.1: Controller для кастомных компонентов</h2>
      
      {/* TODO: Реализуйте форму с Controller */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Задание:</h3>
        <p>Создайте форму с кастомным компонентом Select используя Controller</p>
      </div>
    </div>
  )
}

// ============================================
// Задание 4.2: Radio и Select
// ============================================

export function Task4_2_Template() {
  // TODO: Реализуйте radio и select поля
  
  return (
    <div className="exercise-container">
      <h2>Задание 4.2: Radio и Select</h2>
      
      {/* Поля: gender (radio), country (select) */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Поля:</h3>
        <ul>
          <li>gender: radio (male, female, other)</li>
          <li>country: select (USA, Russia, Germany, France)</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 4.3: Checkbox
// ============================================

export function Task4_3_Template() {
  // TODO: Реализуйте одиночный и множественный checkbox
  
  return (
    <div className="exercise-container">
      <h2>Задание 4.3: Checkbox</h2>
      
      {/* agree (одиночный), skills (множественный) */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Поля:</h3>
        <ul>
          <li>agree: одиночный checkbox "Согласен с правилами"</li>
          <li>skills: множественный выбор (React, Vue, Angular, Svelte)</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 4.4: File Upload
// ============================================

export function Task4_4_Template() {
  // TODO: Реализуйте загрузку файла с валидацией
  
  return (
    <div className="exercise-container">
      <h2>Задание 4.4: File Upload</h2>
      
      {/* avatar: файл с валидацией размера и типа */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Тип: только изображения (jpeg, png, gif)</li>
          <li>Размер: максимум 2MB</li>
          <li>Предпросмотр изображения</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 4.5: Дата и время
// ============================================

export function Task4_5_Template() {
  // TODO: Реализуйте поля даты и времени
  
  return (
    <div className="exercise-container">
      <h2>Задание 4.5: Дата и время</h2>
      
      {/* birthDate, appointment (datetime) */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Поля:</h3>
        <ul>
          <li>birthDate: date (дата рождения)</li>
          <li>appointment: datetime-local (запись на встречу)</li>
        </ul>
      </div>
    </div>
  )
}
